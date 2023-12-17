let postId = 1; // id의 초기값

const posts = [
  {
    id: 1,
    title: 'title',
    body: 'body',
  },
];

/* post write
POST /api/posts
{title, body}
*/
export const write = (ctx) => {
  // REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
  const { title, body } = ctx.request.body;
  postId++;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.status = 201;
  ctx.body = post;
};

/* Post Search
GET /api/posts
*/
export const list = (ctx) => {
  ctx.body = posts;
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = (ctx) => {
  const { id } = ctx.params;
  // id 갑으로 글 조회
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = post;
};

/* delete post
DELETE /api/posts/:id
*/
export const remove = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  console.log(id);
  console.log(index);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204; // No Content 클라이언트에게 전송할 body가 없다.
};

/* update all columns of post
PUT /api/posts/:id
{title, body}
*/
export const replace = (ctx) => {
  // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통쨰로 교체할 때 사용
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  (posts[index] = {
    id,
    ...ctx.request.body,
  }),
    (ctx.body = posts[index]);
};

/* update column of post
PATCH /api/posts/:id
{title?, body?}
*/
export const update = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
