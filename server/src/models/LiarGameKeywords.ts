import { Schema, model } from 'mongoose';
import type { LiarGameKeywords } from '@src/types';

const LiarGameKeywordsSchema = new Schema<LiarGameKeywords>({
  keywords: String,
});
export default model<LiarGameKeywords>('LiarGameKeywords', LiarGameKeywordsSchema);
