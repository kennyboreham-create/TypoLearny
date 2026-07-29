import os

# Project layout definition
project_structure = [
    # Backend Structure
"backend/src/config/db.js",
"backend/src/controllers/authController.js",
"backend/src/controllers/progressController.js",
"backend/src/middleware/authMiddleware.js",
"backend/src/models/User.js",
"backend/src/models/Progress.js",
"backend/src/routes/authRoutes.js",
"backend/src/routes/progressRoutes.js",
"backend/src/app.js",
"backend/.env.example",
"backend/package.json",

# Frontend Structure
"frontend/public/assets/videos/.gitkeep",
"frontend/public/css/style.css",
"frontend/public/js/api.js",
"frontend/public/js/auth.js",
"frontend/public/js/config/levels.js",
"frontend/public/js/engine/typingEngine.js",
"frontend/public/js/engine/particleFX.js",
"frontend/public/js/ui.js",
"frontend/public/js/app.js",
"frontend/public/index.html",
"frontend/public/login.html",
"frontend/src/input.css",
"frontend/tailwind.config.js",
]

# Basic starter content for select config files
file_defaults = {
    "backend/.env.example": "PORT=5000\nMONGO_URI=mongodb+srv://...\nJWT_SECRET=your_jwt_secret_here\n",
    "backend/package.json": '{\n  "name": "volunteer-hours-backend",\n  "version": "1.0.0",\n  "main": "src/app.js",\n  "scripts": {\n    "start": "node src/app.js",\n    "dev": "nodemon src/app.js"\n  }\n}\n',
    "frontend/tailwind.config.js": '/** @type {import(\'tailwindcss\').Config} */\nmodule.exports = {\n  content: ["./public/**/*.{html,js}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n',
    "frontend/src/input.css": '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n',
}


def create_project():
    root_dir = "volunteer-hours-app"
    print(f"🚀 Creating project directory at: ./{root_dir}\n")

    for relative_path in project_structure:
        full_path = os.path.join(root_dir, relative_path)
        dir_name = os.path.dirname(full_path)

        # 1. Create parent directories if they don't exist
        if dir_name and not os.path.exists(dir_name):
            os.makedirs(dir_name, exist_ok=True)
            print(f"📁 Created directory: {dir_name}")

        # 2. Create file if it doesn't exist
        if not os.path.exists(full_path):
            content = file_defaults.get(relative_path, "")
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"📄 Created file:      {full_path}")
        else:
            print(f"⚠️  Already exists:   {full_path}")

    print("\n✅ Project structure setup successfully!")


if __name__ == "__main__":
    create_project()