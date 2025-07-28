import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true  
    },
    petName: {
        type: String,
        required: true
    },
    petType: {
        type: String,
        enum: ["dog","cat"],
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    vaccinated: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const pet = mongoose.models.pets || mongoose.model("pets", petSchema);

export default pet;