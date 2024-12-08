import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId : {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl : {
        type: String,
        required: true
    },
    visitHistory : [{ timestamps : { type : Number}}] ,
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

urlSchema.index({ userId: 1, redirectUrl: 1 }, { unique: true });

const Url = mongoose.model('Url', urlSchema);

export default Url;