const Koa = require("koa");
const serverlessHttp = require("serverless-http");

const { Nuxt } = require('nuxt')
const nuxtConfig = require("./nuxt.config.ts");

const app = new Koa();      
const nuxt = new Nuxt({
  dev: false,
  ...nuxtConfig
});

app.use(ctx => {
  ctx.status = 200;
  ctx.respond = false; // Bypass Koa's built-in response handling
  nuxt.render(ctx.req, ctx.res);
});
      
const handler = serverlessHttp(app);
module.exports.handler = async (event, context) => {
  await nuxt.ready();
  return await handler(event, context);
};