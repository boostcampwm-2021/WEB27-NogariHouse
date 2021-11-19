/* eslint-disable no-unused-vars */
import { Schema, Document, model } from 'mongoose';

export interface IRefreshTokenTypesModel extends Document{
  userDocumentId: String,
  token: String,
}

const refreshTokenSchema = new Schema({
  userDocumentId: String,
  token: String,
});

export default model<IRefreshTokenTypesModel>('RefreshToken', refreshTokenSchema);
