# Recmovie

Recmovie is a simple CRUD application designed to recommend movies based on the time of day and type of day (weekend or weekday) (This could very well be a solution to a problem only I face but all problems are important!). It allows users to register, log in, view recommendations, and manage watchlists. The watchlists are tailored to different times and days to cater to varying movie appetites. (All in a basic manner ofcourse)

## Features

- **User Registration and Login**
- **Dynamic Movie Recommendations**
  - Recommendations change based on the time of day and type of day (weekday or weekend).
- **Personalized Watchlists**
  - Separate watchlists for different times and days.
- **JWT-Based Authentication**
- **Profile Editing**

## Tech Stack

- **Frontend:** React (with Vite) (Please excuse the current UI, hehe)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (cloud-based cluster)
- **Authentication:** JWT

## Setup

### Clone the Repository

### Prepare Environment Files

For backend:

```bash
cd backend
cp .env.template .env
```

Ensure to add your MongoDB URL in the MONGO_URL variable and generate a TMDB_API_KEY.

For client

```bash
cd client
cp .env.template .env
```

### Running the Application

You can run the application in two ways:

#### Using npm

**Start Backend**

```bash
cd backend
npm run dev
# Backend will run on http://localhost:5100
# Client will run on http://localhost:5173
```

#### Using docker

##### Ensure Docker is installed.

```bash
docker-compose up --build
# The application will be available at http://localhost:5173 for the frontend and http://localhost:5100 for the backend.
```

## Notes

Make sure to generate a TMDB_API_KEY and place it in the respective backend .env files. The MongoDB URL I provide should also be correctly placed in the backend .env file under MONGO_URL.
