import { Model, model, Schema, Document, Types } from 'mongoose';

export interface User extends Document {
    firebaseUid: string;
    email: string;
    username: string; 
    favouriteTeam: string;
    friends: Types.ObjectId[];
}

const UserSchema: Schema = new Schema<User>({
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true },
    favouriteTeam: { type: String },
    friends: [{ type: Types.ObjectId, ref: 'User' }]
    
});

export const UserModel: Model<User> = model<User>('users', UserSchema);
