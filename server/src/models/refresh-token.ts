/* eslint-disable no-unused-vars */
import { Schema, Document, model } from 'mongoose';

export interface IRefreshTokenTypesModel extends Document{
  userId: String,
  token: String,
  expires: Date,
  created: Date,
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
  isExpired?: boolean,
  isActive?: boolean,
}

const schema = new Schema({
  userId: String,
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

schema.virtual('isExpired').get(function (this:IRefreshTokenTypesModel): boolean {
  return Date.now() >= this.expires.getTime();
});

schema.virtual('isActive').get(function (this:IRefreshTokenTypesModel) {
  return !this.revoked && !this.isExpired;
});

export default model<IRefreshTokenTypesModel>('RefreshToken', schema);
