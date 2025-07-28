import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true  
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pets"
    },
    petName: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        enum: ["Basic Package", "Premium Package", "Deluxe Package"],
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        enum:["booked", "pending", "cancelled"],
        required: true
    },
    serviceStatus: {
        type: String,
        enum:["pending", "in_progress", "completed"],
        required: true
    },
    specialInstructions: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum:["pending", "paid"],
        required: true
    },
    petPhoto: {
        type: String
    }
},{
    timestamps: true
});

const booking = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default booking;