'use strict';

/**
 * easy-safe service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::easy-safe.easy-safe');
