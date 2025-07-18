# Matanuska Transport Trip-Based Profit & Loss Application

A comprehensive fleet management and trip tracking application for Matanuska Transport.

## Features

- Real-time trip tracking and profit/loss calculation
- Diesel consumption monitoring and efficiency analysis
- Invoice aging and payment tracking
- Customer retention dashboard
- Missed loads tracking
- Flags and investigations management
- Comprehensive reporting

## Technology Stack

- React with TypeScript
- Firebase (Firestore for database, Firebase Hosting for deployment)
- Tailwind CSS for styling
- Lucide React for icons

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Deployment

The application is deployed using Firebase Hosting:

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore database
3. Update the Firebase configuration in `src/firebase.ts` with your project details
4. Deploy the application using Firebase Hosting

## Real-time Updates

The application uses Firestore's real-time listeners to ensure all users see the latest data. When one user makes a change, all other users will see the update immediately without needing to refresh the page.

## Data Persistence

All data is stored in Firebase Firestore, ensuring it persists even when the application is closed. When users reopen the application, all their data will be available.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.