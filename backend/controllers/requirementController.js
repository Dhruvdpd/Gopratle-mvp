import Event from '../models/Event.js';
import Requirement from '../models/Requirement.js';

export const createRequirement = async (req, res) => {
  try {
    const { event, category, details } = req.body;

    // Validate required fields
    if (!event || !category || !details) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: event, category, and details are required',
      });
    }

    // Validate category
    const validCategories = ['planner', 'performer', 'crew'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
      });
    }

    // Create or find event
    let eventDoc;
    
    if (event._id) {
      // If event ID is provided, find existing event
      eventDoc = await Event.findById(event._id);
      if (!eventDoc) {
        return res.status(404).json({
          success: false,
          message: 'Event not found',
        });
      }
    } else {
      // Create new event
      eventDoc = new Event({
        name: event.name,
        type: event.type,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        venue: event.venue,
      });
      await eventDoc.save();
    }

    // Create requirement
    const requirement = new Requirement({
      event: eventDoc._id,
      category,
      details,
    });

    await requirement.save();

    // Populate event details in response
    await requirement.populate('event');

    res.status(201).json({
      success: true,
      message: 'Requirement created successfully',
      data: {
        requirement,
        event: eventDoc,
      },
    });
  } catch (error) {
    console.error('Error creating requirement:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating requirement',
      error: error.message,
    });
  }
};

export const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find()
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching requirements',
      error: error.message,
    });
  }
};

export const getRequirementById = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id).populate('event');

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
    }

    res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    console.error('Error fetching requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching requirement',
      error: error.message,
    });
  }
};