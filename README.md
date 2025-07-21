# DisasterCheck

### Stay Informed, Stay Safe

DisasterCheck empowers you with real-time awareness of natural disasters happening around any location worldwide. Whether you're checking on loved ones, planning travel, or monitoring your area, our intuitive map-based interface puts critical information at your fingertips.

The app delivers accurate, up-to-the-minute data about wildfires, severe storms, volcanic activity, and other natural hazards—all visualized on an interactive map for instant understanding.

You can view the app [here](https://disaster-check.vercel.app/)

## Why DisasterCheck?

### 🎯 Instant Awareness
- Type any location and immediately see active natural disasters in the area
- Visual markers clearly indicate different types of events (fires, storms, etc.)
- Get detailed information about each event with a simple click

### 🌍 Global Coverage
- Monitor natural disasters worldwide
- Accurate data from NASA's trusted EONET system
- Regular updates ensure you have the latest information

### 💡 Smart Design
- Clean, intuitive interface that works on any device
- Quick, responsive search powered by Mapbox
- Beautiful, accessible design that puts information first

### 🔄 Always Available
- Access from any device, anywhere
- Optimized performance for reliable access
- Support for multiple languages

### 📍 Example Locations to Try
To get started, try searching for these locations that often experience natural disasters:
- San Francisco, USA (earthquakes, wildfires)
- Central Texas, USA (wildfires, floods)
- Bgy. No. 42, Laoag, Ilocos Norte, Philippines (severe storms, typhoons)


## Tech Stack

### Frontend
- React
- TypeScript
- Chakra UI
- Mapbox

### Backend
- Node.js
- Express
- TypeScript
- Node-Cache

## Project Structure

```
.
├── api/                    # Backend API
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── types/        # TypeScript type definitions
│   │   ├── utils/        # Utility functions
│   │   └── routes/       # API routes
│   └── test/             # Backend tests
└── front-end/            # Frontend application
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   ├── services/     # API service calls
    │   └── types/       # TypeScript type definitions
    └── public/          # Static assets

```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Mapbox API key
- NASA EONET API access

## Environment Variables

### Backend (.env)
```
PORT=3001
NASA_API_KEY=your_nasa_api_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/obafemitayor/disaster-check
cd disaster-check
```

2. Install backend dependencies
```bash
cd api
npm install
```

3. Install frontend dependencies
```bash
cd front-end
npm install
```

4. Set up environment variables
- Create `.env` files in both `api/` and `front-end/` directories
- Add the required environment variables as shown above

## Running the Application

1. Start the backend server
```bash
cd api
npm run build
npm start
```

2. Start the frontend development server
```bash
cd front-end
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Running Tests

### Backend Tests
```bash
cd api
npm test
```

### Frontend Tests
```bash
cd front-end
npm test -- --watchAll=false
```
