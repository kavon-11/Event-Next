import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Utility function to generate URL-friendly slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Utility function to validate and normalize date to ISO format
const normalizeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
};

// Utility function to normalize time to HH:MM format
const normalizeTime = (timeStr: string): string => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(timeStr)) {
    throw new Error('Time must be in HH:MM format (24-hour)');
  }
  return timeStr;
};

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true,
      minlength: [10, 'Overview must be at least 10 characters long'],
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
        },
        message: 'Image must be a valid URL ending with jpg, jpeg, png, gif, or webp',
      },
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Event mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be either online, offline, or hybrid',
      },
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: function(v: string[]) {
          return Array.isArray(v) && v.length > 0 && v.every(item => item.trim().length > 0);
        },
        message: 'Agenda must be a non-empty array of non-empty strings',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Event organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Event tags are required'],
      validate: {
        validator: function(v: string[]) {
          return Array.isArray(v) && v.length > 0 && v.every(tag => tag.trim().length > 0);
        },
        message: 'Tags must be a non-empty array of non-empty strings',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Pre-save hook for slug generation and data normalization
eventSchema.pre<IEvent>('save', function(next) {
  try {
    // Generate slug only if title is new or modified
    if (this.isNew || this.isModified('title')) {
      this.slug = generateSlug(this.title);
    }

    // Normalize date and time if they are new or modified
    if (this.isNew || this.isModified('date')) {
      this.date = normalizeDate(this.date);
    }

    if (this.isNew || this.isModified('time')) {
      this.time = normalizeTime(this.time);
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

// Create unique index on slug for better performance
eventSchema.index({ slug: 1 }, { unique: true });

// Additional indexes for common queries
eventSchema.index({ date: 1, time: 1 });
eventSchema.index({ mode: 1 });
eventSchema.index({ tags: 1 });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;