import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
});

// Session Schema
export interface ISession extends Document {
  _id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
}

const sessionSchema = new Schema<ISession>({
  expiresAt: { type: Date, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  userId: { type: String, required: true, ref: 'User' }
});

// Account Schema
export interface IAccount extends Document {
  _id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<IAccount>({
  accountId: { type: String, required: true },
  providerId: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  accessToken: { type: String },
  refreshToken: { type: String },
  idToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  refreshTokenExpiresAt: { type: Date },
  scope: { type: String },
  password: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

// Verification Schema
export interface IVerification extends Document {
  _id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const verificationSchema = new Schema<IVerification>({
  identifier: { type: String, required: true },
  value: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Session = mongoose.models.Session || mongoose.model<ISession>('Session', sessionSchema);
export const Account = mongoose.models.Account || mongoose.model<IAccount>('Account', accountSchema);
export const Verification = mongoose.models.Verification || mongoose.model<IVerification>('Verification', verificationSchema);

export const models = {
  User,
  Session,
  Account,
  Verification
};
