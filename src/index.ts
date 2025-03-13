import type { Core } from '@strapi/strapi';
import { updateViewCount, type ViewCounterProps } from './helpers/view-counter.helper';

const viewCounter = async ({ strapi, documentId, entity }: ViewCounterProps) => {
  const data = await strapi.documents(entity).findOne({ documentId });
  if (!data) return null;
  const updated = updateViewCount({ data, documentId, entity, strapi });
  return updated;
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    const disabledActions = ['create', 'update', 'delete'];
    const ext = strapi.plugin('graphql').service('extension');
    ext.shadowCRUD('api::activity.activity').disableActions(disabledActions);
    ext.shadowCRUD('api::tag.tag').disableActions(disabledActions);
    ext.shadowCRUD('api::product.product').disableActions(disabledActions);
    ext.shadowCRUD('api::district.district').disableActions(disabledActions);
    ext.shadowCRUD('api::article.article').disableActions(disabledActions);

    ext.use(({ strapi }: { strapi: Core.Strapi }) => ({
      resolvers: {
        Query: {
          activity: {
            resolve: async (obj, options, ctx) => {
              const { documentId }: { documentId: string } = options || {};
              const data = await viewCounter({ entity: 'api::activity.activity', documentId, strapi });
              return data;
            },
          },
          article: {
            resolve: async (obj, options, ctx) => {
              const { documentId }: { documentId: string } = options || {};
              const data = await viewCounter({ entity: 'api::article.article', documentId, strapi });
              return data;
            },
          },
          product: {
            resolve: async (obj, options, ctx) => {
              const { documentId }: { documentId: string } = options || {};
              const data = await viewCounter({ entity: 'api::product.product', documentId, strapi });
              return data;
            },
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};

