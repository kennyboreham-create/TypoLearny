# TypoLearny

TypoLearny is a typing practice web app with:
- 14 basic levels
- 10 advanced practice/test levels
- score-based progression
- emoji feedback and speech audio
- login-based progress tracking (optional guest play)

## Deploy to Render

### Backend service
- Create a new Render Web Service from this repository.
- Set the build command to: `npm install`
- Set the start command to: `node server.js`
- Add environment variables:
  - `NODE_ENV=production`
  - `JWT_SECRET=<strong-secret>`
  - `MONGO_URI=<your-mongodb-connection-string>`

### Frontend service
- Create a second Render Static Site from the same repository.
- Set the publish directory to: `public`
- Add an environment variable:
  - `API_BASE_URL=https://<your-backend-render-url>`

The frontend will use that API base for auth and progress requests.

## GitHub

1. Create a new private repository on GitHub.
2. Push this project to GitHub with:
   - `git remote add origin https://github.com/<your-user>/<your-repo>.git`
   - `git branch -M main`
   - `git push -u origin main`
