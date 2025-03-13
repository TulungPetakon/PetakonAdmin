/**
 * activity controller
 */

import { factories } from '@strapi/strapi';
import { updateViewCount } from '../../../helpers/view-counter.helper';

const entity = 'api::activity.activity';
export default factories.createCoreController(entity, ({ strapi }) => ({
  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (!response?.data) return response;

    const { documentId } = response.data;
    const data = updateViewCount({ data: response.data, documentId, entity, strapi });
    response.data = data;
    return response;
  },
}));
