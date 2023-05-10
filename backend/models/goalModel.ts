import { Schema, model , Types} from 'mongoose';

const goalSchema = new Schema({
    // user: {
    //     type: Types.ObjectId,
    //     required: true,
    //     ref: "User"
    //     // ref the User model to identify which model the ObjectID pertains to 
    // },
    name: {
        type: String,
        required: [true, 'please add a text value']
    },
    start: {
        type: Date,
        required: [true, 'please add a text value']
    },
    end: {
        type: Date,
        required: [true, 'please add a text value']
    },
    timeAllotment: {
        type: Number,
    },
    progress: {
        type: Number,
    }
}, {
    timestamps: true
    // Will create an updated at and created at field automatically
})

module.exports = model("Goal", goalSchema)