const mongoose = require('mongoose');
const crypto = require('crypto');
const beautifyUnique = require('mongoose-beautiful-unique-validation');



const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        trim: true,
        required: 'First Name is required'
    },

    last_name:{
        type: String,
        trim: true,
        required: 'Last Name is required'
    },

    username:{
        type: String,
        trim: true,
        required: 'Name is required',
        minlength: 4,
        maxlength: 16
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },

    created: {
        type: Date,
        default: Date.now
    },

    hashed_password: {
        type: String,
        required: "Password is required"
    },
    
    salt: String,
    
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Instructor', 'Corporate Trainee', 'Trainee']
    },

    _roleid: {
        type: mongoose.ObjectId, 
        required: true,
        ref: 'role'
    },

    // _admin:{
    //     type: mongoose.ObjectId, 
    //     ref: 'Admin'
    // },

    // _instructor:{
    //     type:  mongoose.ObjectId, 
    //     ref: 'Instructor'
    // },

    // _corporate_trainee:{
    //     type: mongoose.ObjectId, 
    //     ref: 'Corporate Trainee'
    // },

    // _trainee:{
    //     type: mongoose.ObjectId, 
    //     ref: 'Trainee'
    // }
})

UserSchema
    .virtual('password')
    .set(function (password){
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) {
        if (!password) return ''
        try {
        return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch (err) {
            return ''
        }
    },

    makeSalt:
        function (){
            return Math.round((new Date().valueOf() *  Math.random())) + ''
        }
}

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6){
        this.invalidate('password', "Password is required") 
    }

    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }

})

// UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const salt = this.makeSalt()
//     const hash = this._password
//     this.password = hash;
//     next();
// });



UserSchema.plugin(beautifyUnique);


module.exports = mongoose.model('User', UserSchema)