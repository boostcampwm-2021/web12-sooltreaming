import { Schema, model } from 'mongoose';

interface LiarGameKeywords {
  keywords: string;
}

const LiarGameKeywordsSchema = new Schema<LiarGameKeywords>({
  keywords: String,
});
export default model<LiarGameKeywords>('LiarGameKeywords', LiarGameKeywordsSchema);
