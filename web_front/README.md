# Library Reservation System Frontend

This React application serves as the frontend for the Library Reservation System. It allows users to interact with the library's services, such as book browsing, making reservations, and managing user profiles.

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **Book Browsing**: Browse available books and see detailed information about each.
- **Reservation Management**: Make, view, and cancel book reservations.
- **Role-Based Access**: Different functionalities available to users, librarians, and administrators.
- **Responsive Design**: Ensures a good user experience on desktops and mobile devices.

## Technology Stack

- React: A JavaScript library for building user interfaces.
- Material-UI: A popular React UI framework that implements Google's Material Design.
- Axios: A promise-based HTTP client for making API calls.
- React Router: For navigation within the application.
- Styled Components: For styling React components with styled CSS.
- React Toastify: For displaying alert messages or notifications.
- React Helmet Async: For managing changes to the document head.

## Prerequisites

- Node.js (14.x or higher)
- npm (comes with Node.js)

## Getting Started

Run the following commands to start the frontend application:
- Install dependencies: `npm install`
- Copy .env.example to .env.local and update the REACT_APP_API_URL variable with the URL of the backend API and REACT_APP_AES_ENCRYPT_KEY with the encryption key.
- Start the development server: `npm start`
