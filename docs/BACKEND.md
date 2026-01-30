## Overview
This document describes the API endpoints for the Cafe Website backend, built with Express.js and MongoDB. The API handles user data, menu items, orders, and more. All endpoints return JSON responses.

[API central route hub is located at Backend Folder](../backend/routes/index.js)


# Clone repository:
```bash

```

clone the repository first then
```bash
npm install
```
or
```bash
npm i
```
## Check environment

```bash
.env
```
This should contain the following:
```bash
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.dgis6q8.mongodb.net/mern_db?retryWrites=true&w=majority
appName=Cluster0

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# Google OAuth
GOOGLECLIENTID=your_google_client_id
GOOGLECLIENTSECRET=your_google_client_secret

# Frontend
CLIENT_URL=http://localhost:3000

# AWS S3 bucket
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name
```

## Run in terminal
To run service:
 **npm run start**
