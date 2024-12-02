# Radix-Web-Interface

## Overview

This project is designed to manage and display sensor data from equipment in real-time, primarily aimed at users who need to monitor and interact with their equipment's data. It involves setting up a backend to handle sensor readings, user authentication, and storing information about the equipment. Users can register and get an API key to begin using the platform and interact with the sensors.

## Requirements

- **Node.js** (version 16.x or higher)
- **npm** or **yarn**

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone git@github.com:PatrickSchifter/radix-web-interface.git
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
cd radix-web-interface
npm install
```

or

```bash
cd radix-web-interface
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file at the root of the project and set the necessary environment variables:

```
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:3030/api/
```

Make sure to replace the placeholders with your actual values.

### 4. Start the Application

Run the following command to start the application:

```bash
npm run build
npm start
```

or

```bash
yarn build
yarn start
```

The application will be available at `http://localhost:3000`.

### 5. Register a User

Before using the platform, you need to create a user. Register a user using the authentication system in place (e.g., through a sign-up form or via an API).

### 6. Register Equipment

Once the user is registered, they can proceed to register equipment. Each piece of equipment requires a registration, after which an **API Key** will be generated. This API Key is required for interacting with the equipment and retrieving sensor data.

### 7. Fetch Sensor Data

To fetch sensor data, you need to authenticate with the platform by providing the equipment's API key. Use the API to request sensor data and visualize it on the dashboard.

### 8. Accessing the API

To access the backend API, visit the [Radix-Server repository](git@github.com:PatrickSchifter/radix-server.git). Follow the instructions in the README and API documentation to set up the backend server and use your API keys for interacting with the platform.
