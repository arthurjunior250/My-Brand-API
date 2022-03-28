import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    profilePicture: { 
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['standard-user', 'admin'],
        default: 'standard-user'

    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
export default User;