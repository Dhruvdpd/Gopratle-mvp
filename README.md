# Event Requirements Platform

A sophisticated event requirement posting system with a distinctive editorial-luxury design aesthetic.

## Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Form Management**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS with custom design tokens
- **Typography**: Cormorant Garamond (display) + Spectral (body)
- **Design System**: Editorial-luxury aesthetic with intentional motion and grain texture

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: RESTful API with structured JSON responses
- **Data Model**: Event and Requirement schemas with flexible details object

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (v5 or higher) running on `mongodb://127.0.0.1:27017`

## Installation & Setup

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

The backend is pre-configured to connect to MongoDB at:
```
mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
```

Start the backend server:

```bash
npm run dev
```

The server will start on **http://localhost:5000**

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## Usage

1. Open your browser and navigate to **http://localhost:3000**
2. Complete the 4-step requirement posting flow:
   - **Step 1**: Enter event details (name, type, dates, location)
   - **Step 2**: Select requirement category (Planner, Performer, or Crew)
   - **Step 3**: Fill in category-specific details
   - **Step 4**: Review and submit
3. View all requirements at **http://localhost:3000/requirements**

## API Endpoints

### POST `/api/requirements`
Create a new requirement with event details

**Request Body:**
```json
{
  "event": {
    "name": "Summer Music Festival",
    "type": "festival",
    "startDate": "2026-07-15",
    "endDate": "2026-07-17",
    "location": "Austin, TX",
    "venue": "Zilker Park"
  },
  "category": "performer",
  "details": {
    "performanceType": "Live band",
    "duration": "2-hours",
    "genre": "Rock",
    "audienceSize": "500-1000",
    "equipmentNeeded": ["Sound system", "Lighting"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Requirement created successfully",
  "data": {
    "requirement": { ... },
    "event": { ... }
  }
}
```

### GET `/api/requirements`
Retrieve all requirements

### GET `/api/requirements/:id`
Retrieve a specific requirement by ID

## Project Structure

```
event-requirements-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Event.js              # Event schema
│   │   └── Requirement.js        # Requirement schema
│   ├── controllers/
│   │   └── requirementController.js
│   ├── routes/
│   │   └── requirements.js
│   ├── server.js                 # Express server
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── app/
    │   ├── layout.tsx            # Root layout with fonts
    │   ├── page.tsx              # Main form page
    │   ├── success/page.tsx      # Success page
    │   ├── requirements/page.tsx # Requirements listing
    │   └── globals.css           # Global styles
    ├── components/
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   ├── Select.tsx
    │   ├── Textarea.tsx
    │   ├── Checkbox.tsx
    │   ├── ProgressIndicator.tsx
    │   └── steps/
    │       ├── Step1EventDetails.tsx
    │       ├── Step2Category.tsx
    │       ├── Step3PlannerDetails.tsx
    │       ├── Step3PerformerDetails.tsx
    │       ├── Step3CrewDetails.tsx
    │       └── Step4Review.tsx
    ├── lib/
    │   ├── schemas.ts            # Zod validation schemas
    │   └── api.ts                # API client functions
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## Design Philosophy

This application features an **editorial-luxury aesthetic** characterized by:

- **Distinctive Typography**: Cormorant Garamond and Spectral serif fonts
- **Refined Color Palette**: Pearl, Champagne, Bronze, and Sage tones
- **Intentional Motion**: Choreographed animations with cubic-bezier easing
- **Textural Depth**: Grain overlay and subtle gradients
- **Spatial Precision**: Asymmetric layouts with generous negative space
- **Elegant Interactions**: Smooth transitions and hover states

## Features

### Form Validation
- Real-time validation with Zod schemas
- Clear error messaging with smooth animations
- Type-safe form handling with React Hook Form

### Dynamic Routing
- Category-specific form fields based on selection
- Conditional rendering for planner, performer, and crew details
- Smooth step transitions with progress indicators

### Data Persistence
- MongoDB storage with Mongoose schemas
- Flexible details object for category-specific data
- Proper event-requirement relationships

### User Experience
- Loading states during submission
- Success confirmation page
- Requirements listing with filtering
- Responsive design for all screen sizes

## Technology Highlights

- **Next.js App Router**: Modern routing with server components
- **React Hook Form**: Performant form state management
- **Zod**: Runtime type validation
- **Tailwind CSS**: Utility-first styling with custom theme
- **Framer Motion**: Production-ready animations
- **Mongoose**: Elegant MongoDB object modeling

## Notes

- This is a development build not hardened for production
- No authentication or authorization implemented
- CORS is enabled for localhost development
- MongoDB must be running before starting the backend
- All validation happens both client-side (Zod) and server-side (Mongoose)