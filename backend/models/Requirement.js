import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['planner', 'performer', 'crew'],
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Details are required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
requirementSchema.index({ event: 1, category: 1 });

const Requirement = mongoose.model('Requirement', requirementSchema);

export default Requirement;