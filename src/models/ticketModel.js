import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true  
    },
    ticketId: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved", "closed"],
        default: "open"
    },
    response: {
        type: String
    }
},{
    timestamps: true
});

const ticket = mongoose.models.tickets || mongoose.model("tickets", ticketSchema);

export default ticket;