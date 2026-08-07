# TypoLearny

TypoLearny is a typing practice web app with:
- 14 basic levels
- 10 advanced practice/test levels
- score-based progression
- emoji feedback and speech audio
- login-based progress tracking (optional guest play)

## Deploy to Render

This app has two parts:
- a backend web service for the API and database access
- a static frontend for the game UI

### 1. Create MongoDB Atlas
1. Go to https://www.mongodb.com/atlas
2. Create a free account and a new cluster.
3. Create a database user.
4. Allow access from `0.0.0.0/0` (or add your current IP).
5. Copy the connection string. It will look like:
   - `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/typolearny?retryWrites=true&w=majority`

### 2. Deploy the backend service on Render
1. In Render, click Create New and choose Web Service.
2. Connect your GitHub repository.
3. Select the folder that contains the app.
4. Set the build command to:
   - `npm install`
5. Set the start command to:
   - `node server.js`
6. Add these environment variables:
   - `NODE_ENV=production`
   - `JWT_SECRET=<a-long-random-string>`
   - `MONGO_URI=<your-mongodb-connection-string>`
7. Click Create Web Service.
8. Wait for the deployment to finish and copy the backend URL.

### 3. Deploy the frontend on Render
1. In Render, click Create New and choose Static Site.
2. Connect the same GitHub repository.
3. Set the publish directory to:
   - `VSTEst/public`
   - If that path does not work, use the folder that contains the frontend files.
4. Add this environment variable:
   - `API_BASE_URL=https://<your-backend-render-url>`
5. Click Create Static Site.

The frontend will use that API base for authentication and progress requests.

### 4. Verify the app
- Open the frontend URL.
- Try registering a user.
- Confirm the backend health endpoint at:
  - `https://<your-backend-render-url>/api/health`

It should return JSON like:
- `{"ok":true}`

## GitHub

1. Create a new private repository on GitHub.
2. Push this project to GitHub with:
   - `git remote add origin https://github.com/<your-user>/<your-repo>.git`
   - `git branch -M main`
   - `git push -u origin main`
