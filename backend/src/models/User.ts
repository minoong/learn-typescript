import mongoose, { Document } from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UserModel extends Document {
  setPassword(password: string): void;
  username: string | any;
  hashedPassword: string | any;
}

const UserSchema = new Schema<UserModel>({
  username: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);

  console.log(`hashedPassword => [${hash}]`);

  this.hashedPassword = hash;

  console.log(`this.hashedPassword => [${this.hashedPassword}]`);
};

UserSchema.methods.checkPassword = async function (password) {
  console.log(`checkPassword [${password}], [${this.hashedPassword}]`);

  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET || '',
    {
      expiresIn: '7d',
    },
  );

  return token;
};

const User = mongoose.model<UserModel>('User', UserSchema);
export default User;
