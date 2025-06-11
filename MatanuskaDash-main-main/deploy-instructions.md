# Deployment Instructions for Matanuska Transport Application

This document provides step-by-step instructions for deploying the Matanuska Transport application to Firebase Hosting.

## Prerequisites

1. Node.js and npm installed
2. Firebase CLI installed (`npm install -g firebase-tools`)
3. A Firebase project created at [https://console.firebase.google.com/](https://console.firebase.google.com/)

## Step 1: Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database:
   - Go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Start in production mode or test mode (you can change this later)
   - Choose a location close to your users

## Step 2: Update Firebase Configuration

1. In the Firebase console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web app icon (</>) to register a web app if you haven't already
4. Copy the Firebase configuration object
5. Update the `firebaseConfig` object in `src/firebase.ts` with your configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 3: Build the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

## Step 4: Deploy to Firebase

```bash
# Login to Firebase (if not already logged in)
firebase login

# Initialize Firebase in your project (if not already initialized)
firebase init

# Select Hosting and Firestore
# Select your Firebase project
# Use "dist" as your public directory
# Configure as a single-page app: Yes
# Set up automatic builds and deploys with GitHub: No (unless you want to)

# Deploy to Firebase
firebase deploy
```

## Step 5: Access Your Deployed Application

After successful deployment, you'll see a URL where your application is hosted, typically in the format:

```
https://your-project-id.web.app
```

Visit this URL to access your deployed application.

## Updating the Application

When you make changes to the application:

1. Build the application again: `npm run build`
2. Deploy the updated build: `firebase deploy`

## Setting Up Continuous Deployment (Optional)

For automatic deployment when you push to GitHub:

1. Connect your GitHub repository to Firebase in the Firebase console
2. Set up GitHub Actions for continuous deployment

## Firestore Security Rules

The current security rules allow read and write access to anyone. For production, you should update the rules in `firestore.rules` to restrict access based on authentication and authorization.

## Troubleshooting

- If you encounter deployment errors, check the Firebase CLI output for specific error messages
- Ensure your Firebase project has the necessary services enabled (Hosting, Firestore)
- Verify that your Firebase configuration in `src/firebase.ts` is correct
- Check that your build process completed successfully before deploying