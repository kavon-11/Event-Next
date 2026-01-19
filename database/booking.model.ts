import mongoose, { Schema, Document, Model } from 'mongoose';
import Event from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // Index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v: string) {
          return emailRegex.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Pre-save hook to validate that the referenced event exists
bookingSchema.pre<IBooking>('save', async function(next) {
  try {
    // Only validate eventId if it's new or modified
    if (this.isNew || this.isModified('eventId')) {
      const eventExists = await Event.findById(this.eventId);
      
      if (!eventExists) {
        throw new Error(`Event with ID ${this.eventId} does not exist`);
      }
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compound index to prevent duplicate bookings for same event and email
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Index on eventId for faster queries when fetching bookings by event
bookingSchema.index({ eventId: 1 });

// Index on email for faster queries when fetching bookings by user
bookingSchema.index({ email: 1 });

// Index on createdAt for sorting by booking time
bookingSchema.index({ createdAt: -1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;