import { Schema, model, SchemaDefinitionProperty } from 'mongoose';

interface Friend {
  senderId: SchemaDefinitionProperty<string>;
  receiverId: SchemaDefinitionProperty<string>;
  status: string;
}

const friendSchema = new Schema<Friend>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

export default model<Friend>('Friend', friendSchema);
