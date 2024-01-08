import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedData: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const Post = mongoose.model('Post', PostSchema);
// const Post = mongoose.model('Post', PostSchema, 'custom_book_collection'); 3번째 인자로 값을 주면 3번째 인자로 컬렉션 이름을 생성함
export default Post;
