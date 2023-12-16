const koa = require('koa');
const Router = require('koa-router');

const app = new koa();

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Home';
});

router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  ctx.body = name ? `${name}의 소개` : 'About';
});

router.get('/post', (ctx) => {
  const { id } = ctx.query;
  const querystring = ctx.querystring;

  console.log(querystring);
  ctx.body = id ? `post #${id}` : '포스트 아이디가 없습니다.';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
