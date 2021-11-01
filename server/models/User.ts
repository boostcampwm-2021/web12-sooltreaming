import { Schema, model } from 'mongoose';

interface User {
  githubId: string;
  naverId: string;
  nickname: string;
  imgUrl: string;
}

const userSchema = new Schema<User>(
  {
    githubId: String,
    naverId: String,
    nickname: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<User>('User', userSchema);
