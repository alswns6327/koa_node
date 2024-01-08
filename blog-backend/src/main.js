require('dotenv').config();
import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

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

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
