import { Schema, model } from 'mongoose';
import type { LiarGameKeywords } from '@src/types';

const LiarGameKeywordsSchema = new Schema<LiarGameKeywords>({
  keyword: String,
});
export default model<LiarGameKeywords>('LiarGameKeywords', LiarGameKeywordsSchema);
