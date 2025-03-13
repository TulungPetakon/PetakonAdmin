import { Core } from '@strapi/strapi';

export interface ViewCounterProps {
  strapi: Core.Strapi;
  entity: any;
  documentId: string;
}

export const updateViewCount = ({ data, entity, documentId, strapi }: ViewCounterProps & { data: any }) => {
  const view_count = (data.view_count || 0) + 1;
  strapi.documents(entity).update({
    documentId,
    status: 'published',
    data: { view_count },
  });
  return { ...data, view_count };
};

