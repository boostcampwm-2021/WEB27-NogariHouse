/* eslint-disable no-unused-vars */
import { Schema, Document, model } from 'mongoose';

export interface IRefreshTokenTypesModel extends Document{
  userId: String,
  token: String,
}

const refreshTokenSchema = new Schema({
  userId: String,
  token: String,
});

export default model<IRefreshTokenTypesModel>('RefreshToken', refreshTokenSchema);
