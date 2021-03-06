const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
    
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is incorrect");
                }
            }
    
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
}, {
    timestamps: true
});

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('No user found');
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if(!isCorrect){
        throw new Error('Incorrect password');
    }

    return user;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.getAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'tempToken');
    return token;
}

userSchema.pre('save', async function(next) {
    const user = this;
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
});

userSchema.pre('remove', async function (next){
    const user = this;
    await Task.deleteMany({owner : user._id});
    next();
})

const User = mongoose.model('User', userSchema);


module.exports = User;