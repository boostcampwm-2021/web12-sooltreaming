import { Schema, model, SchemaDefinitionProperty } from 'mongoose';

interface Statistic {
  userId: SchemaDefinitionProperty<string>;
  chatCount: number;
  hookCount: number;
  pollCount: number;
  closeupCount: number;
  dieCount: number;
  speakCount: number;
  starterCount: number;
  totalSeconds: number;
}

const statisticSchema = new Schema<Statistic>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    speakCount: {
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
  },
  { timestamps: true },
);

export default model<Statistic>('Statistic', statisticSchema);
