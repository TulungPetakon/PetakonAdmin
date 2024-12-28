import { errors } from '@strapi/utils';

export default {
  beforeCreate: async (event) => {
    const { data, where, select, populate } = event.params;
    const existed = await strapi.db.query('api::district.district').findOne({
      where: {
        slug: data.slug,
      },
    });

    if (existed && data.documentId !== existed.documentId) {
      throw new errors.ApplicationError('Create Failed, must be unique');
    }
  },

  beforeUpdate: async (event) => {
    const { data, where, select, populate } = event.params;
    const existed = await strapi.db.query('api::district.district').findOne({
      where: {
        slug: data.slug,
      },
    });

    if (existed && where.id !== existed.id) throw new errors.ApplicationError('Update Failed, must be unique');
  },
};

