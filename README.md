# FlavorFusion - Recipe Sharing App

Welcome to FlavorFusion, a modern web application for discovering and sharing recipes. This application is built with a React frontend and powered entirely by a Manifest backend.

## Features

- **User Authentication**: Secure user sign-up and login.
- **Recipe Management**: Create, Read, Update, and Delete your own recipes.
- **Image Uploads**: Add beautiful photos to your recipes.
- **Community Recipes**: Browse recipes shared by other chefs in the community.
- **Ownership Control**: Users can only edit or delete the recipes they have created, enforced by Manifest's access policies.
- **Auto-Generated Admin Panel**: Manage all users and recipes at `/admin`.

## Getting Started

### Prerequisites

- Node.js and npm
- A Manifest account and the Manifest CLI

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd flavorfusion
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Set up the Manifest Backend:**
   - Place the `manifest.yml` file in the root of your project.
   - Run the Manifest development server:
     ```bash
     mnfst dev
     ```
   - This command will start the backend, apply database migrations, and make the API available locally.

4. **Run the Frontend:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Admin Access

- The auto-generated admin panel is available at `/admin`.
- Default credentials are:
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`
