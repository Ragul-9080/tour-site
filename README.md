# Tour Packages Website

A full-stack tour packages website built with React (Vite) and Node.js (Express + Supabase).

## Prerequisites

1.  **Node.js**: Ensure Node.js is installed.
2.  **Supabase Account**: You need a Supabase project.

## Setup Instructions

### 1. Database Setup (Supabase)
1.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Open the **SQL Editor**.
3.  Copy the contents of `backend/schema.sql` and run it to create the tables.
4.  Go to **Project Settings > API**.
5.  Copy the **Project URL** and **anon public key**.

### 2. Backend Setup
1.  Open `backend/.env` file.
2.  Paste your Supabase URL and Key:
    ```env
    SUPABASE_URL=your_project_url
    SUPABASE_KEY=your_anon_key
    ```
3.  Install dependencies (if not done):
    ```bash
    cd backend
    npm install
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

### 3. Frontend Setup
1.  Open a new terminal.
2.  Navigate to frontend:
    ```bash
    cd frontend
    ```
3.  Install dependencies (if not done):
    ```bash
    npm install
    ```
4.  Start the React app:
    ```bash
    npm run dev
    ```
    The app will run on `http://localhost:5173`.

## Features
- **Public**: Home, Packages (Filter by region), Offers, Contact.
- **Admin**: Manage Packages and Enquiries.
- **Super Admin**: Manage Admins.
"# leholidays" 
