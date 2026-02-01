import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Event type is required'],
      enum: ['wedding', 'corporate', 'concert', 'festival', 'conference', 'party', 'other'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value >= this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;