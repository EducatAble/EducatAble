import { model, Schema, Document } from 'mongoose';
import { User } from './user';

export interface NewQ extends Document {
  newQ: string,
  user: User,
  answerBy: User
}

const newquestionSchema = new Schema({
  //question
  newQ: { type: String, required: true },
  //user that submitted question
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  //admin that answered question
  answeredBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

const NewQuestion = model<NewQ>('NewQuestion', newquestionSchema);

export default NewQuestion;
