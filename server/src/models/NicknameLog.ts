import { Schema, model, SchemaDefinitionProperty } from 'mongoose';

interface NicknameLog {
  userId: SchemaDefinitionProperty<string>;
  nickname: string;
}

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
