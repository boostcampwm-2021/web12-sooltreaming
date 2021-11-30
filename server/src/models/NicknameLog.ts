import { Schema, model } from 'mongoose';
import type { NicknameLog } from '@src/types';

const nicknameLogSchema = new Schema<NicknameLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<NicknameLog>('NicknameLog', nicknameLogSchema);
