'use strict';

/**
 * easy-safe-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::easy-safe-user.easy-safe-user', ({ strapi }) => ({
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en' };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now();

    return { data, meta };
  },

  async create(ctx) {
    // some custom logic here

    await strapi.plugins['email'].services.email.send({
      to: 'baris.florent@gmail.com',
      from: 'no-reply-easysafe@email.com',
      subject: 'Comment posted that contains a bad words',
      text: `
          The comment  contain a bad words.

          Comment:
          ${ctx}
        `,
    });

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now();
    console.log("send mail");

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::restaurant.restaurant').findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
