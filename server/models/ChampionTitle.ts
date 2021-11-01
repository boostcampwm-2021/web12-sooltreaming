import { Schema, model } from 'mongoose';

interface ChampionTitle {
  title: string;
}

const ChampionTitleSchema = new Schema<ChampionTitle>({
  title: String,
});

export default model<ChampionTitle>('ChampionTitle', ChampionTitleSchema);
