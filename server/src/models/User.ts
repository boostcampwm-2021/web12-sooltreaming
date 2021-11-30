import { Schema, model } from 'mongoose';
import type { UserType } from '@src/types';

const userSchema = new Schema<UserType>(
  {
    // User
    githubId: {
      type: String,
      index: true,
    },
    naverId: {
      type: String,
      index: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },

    // Statistic
    chatCount: {
      type: Number,
      default: 0,
    },
    hookCount: {
      type: Number,
      default: 0,
    },
    pollCount: {
      type: Number,
      default: 0,
    },
    closeupCount: {
      type: Number,
      default: 0,
    },
    dieCount: {
      type: Number,
      default: 0,
    },
    cheersCount: {
      type: Number,
      default: 0,
    },
    starterCount: {
      type: Number,
      default: 0,
    },
    totalSeconds: {
      type: Number,
      default: 0,
    },

    // Title
    title: {
      type: [String],
      default: [],
    },

    // Friend
    sendFriend: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    receiveFriend: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    friend: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  { timestamps: true },
);

export default model<UserType>('User', userSchema);
