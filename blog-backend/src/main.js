require('dotenv').config();
import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

const { PORT, MONGO_URI } = process.env;

import api from './api';
import Post from './models/post';
import jwtMiddleware from './lib/jwtMiddleware';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log(e);
  });

const app = new koa();

const router = new Router();

router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(
  __dirname,
  '../../../react1/blog-frontend/build',
);
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  // Not Found이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html을 반환
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
