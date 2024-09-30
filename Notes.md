
# Job Application System

## Project Structure

This project is divided into two main folders:

- **Backend**: Manages the API and database with Node.js, Express, and MongoDB.
- **Frontend**: Manages the client-side of the application (could be React, Angular, etc.).

---

## Backend Setup

### 1. Initialize the Backend Folder

First, navigate to the backend folder and initialize a Node.js project:

```bash
npm init
```

### 2. Install Required Dependencies

Install the necessary dependencies for the backend:

```bash
npm install express mongoose nodemon jsonwebtoken bcryptjs cookie-parser dotenv
```

### 3. Create `index.js`

Inside the backend folder, create an `index.js` file, which will be the entry point for the backend server.

```bash
touch index.js
```

---

## Models

The application includes four main models to manage the data structure for users, jobs, companies, and applications. Below are the details for each model:

### 1. **User Model (userModel)**

This schema manages user data. It includes:

- **Fields**:
  - `fullname`: Full name of the user.
  - `email`: User’s email address (unique).
  - `phoneNumber`: User’s contact number.
  - `password`: User’s password (hashed).
  - `role`: Defines whether the user is a `student` (job applicant) or a `recruiter`.
  - `profile`: Additional fields such as `bio`, `skills`, `resume`, `profile photo`, and an optional `company` reference (for recruiters).

- **Relationships**:
  - The user can be associated with a company (if the role is `recruiter`).

### Example Schema:
```javascript
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student', 'recruiter'], 
        required: true 
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String, // URL of resume file
        resumeOriginalName: String,
        company: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Company" 
        },
        Profile_Photo: { type: String, default: "" }
    }
},{timestamps: true});

export const User = mongoose.model('User', userSchema);
```

### 2. **Job Model (jobModel)**

This schema represents job postings created by recruiters.

- **Fields**:
  - `title`: Title of the job position.
  - `description`: Detailed job description.
  - `salary`: Salary offered for the position.
  - `location`: Job location.
  - `jobType`: Full-time, part-time, contract, etc.

- **Relationships**:
  - `company`: References the `Company` collection.
  - `created_by`: References the `User` collection, representing the recruiter.
  - `application`: Array of references to `Application` objects (job applications submitted).

### Example Schema:
```javascript
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Company", 
        required: true 
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
}, {timestamps: true});

export const Job = mongoose.model("Job", jobSchema);
```

### 3. **Company Model (companyModel)**

This schema is for the companies that post jobs.

- **Fields**:
  - `name`: The company's name.
  - `description`: Description of the company.
  - `website`: Company's website URL.
  - `location`: Company location.
  - `logo`: URL of the company's logo.
  - `userId`: References the `User` collection, representing the recruiter.

### Example Schema:
```javascript
const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    website: String,
    location: String,
    logo: String, // URL of company logo
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps : true});

export const Company = mongoose.model("Company", companySchema);
```

### 4. **Application Model (applicationModel)**

This schema tracks job applications.

- **Fields**:
  - `job`: References the `Job` collection.
  - `applicant`: References the `User` collection (job seeker).
  - `status`: Enum with three possible states: `'pending'`, `'accepted'`, `'rejected'`.

### Example Schema:
```javascript
const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        required: true
    }
},{timestamps: true});

export const Application = mongoose.model("Application", applicationSchema);
```

---

## Running the Backend

To run the backend server in development mode:

1. Add a `scripts` section to your `package.json`:
   ```json
   "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
   }
   ```

2. Run the server using:

   ```bash
   npm run dev
   ```

The backend will be running at `http://localhost:8000`.

---

## Conclusion

This setup provides the backend infrastructure for a job application system where users can apply for jobs, and recruiters can manage job postings and applications. The data is managed through MongoDB with Mongoose, and different roles and relationships are clearly defined for users, jobs, companies, and applications.


# User Authentication System
## Features

- **User Registration**: Users can create an account with their full name, email, phone number, password, and role. Passwords are securely hashed using `bcrypt`.
- **Login**: Users can log in with their email, password, and role. The system verifies the user's credentials and issues a JWT token for session management.
- **Logout**: Users can log out by clearing the JWT token from the cookie.
- **Profile Update**: Authenticated users can update their profile information such as full name, email, phone number, bio, and skills.
- **JWT-Based Authentication**: The system uses JSON Web Tokens (JWT) for secure authentication and maintaining user sessions.

## Routes

| Method | Endpoint           | Description                | Authentication |
|--------|--------------------|----------------------------|----------------|
| POST   | `/register`         | Registers a new user        | No             |
| POST   | `/login`            | Logs in an existing user    | No             |
| GET    | `/logout`           | Logs out the user           | Yes            |
| POST   | `/profile/update`   | Updates the user profile    | Yes            |


### JWT Token
After a successful login, a JWT token is generated and stored in a cookie. The token is valid for 1 day `(expiresIn: '1d')`. The cookie is configured as `httpOnly` and `sameSite: strict` to enhance security.


# Company Management System

This system handles company registration, retrieval, and updates. Users can register their companies, view their registered companies, get details of a specific company, and update the company's information. The system is built using Node.js, Express, MongoDB, and JWT for authentication.

## Features

- **Register a Company**: Users can register a company with a unique name. A company is associated with the user's account.
- **Get All Registered Companies**: Authenticated users can view all companies they have registered.
- **Get Company by ID**: Fetches detailed information about a specific company using its ID.
- **Update Company Information**: Allows users to update the company's information such as name, description, website, and location.

## Routes

| Method | Endpoint                  | Description                           | Authentication |
|--------|---------------------------|---------------------------------------|----------------|
| POST   | `/register`                | Registers a new company               | Yes            |
| GET    | `/get`                     | Retrieves all companies for the user  | Yes            |
| GET    | `/get/:id`                 | Retrieves a company by its ID         | Yes            |
| PUT    | `/update/:id`              | Updates the company information       | Yes    

### JWT Authentication
All routes are protected by JWT-based authentication. The token is required to be passed in the `Authorization` header as a Bearer token.
#### JWT Token Structure
 - The token is generated during the login process and stored as an `httpOnly` cookie.
 - The token is verified for each protected route to ensure the user is authenticated.


 # Job Management System

This system handles job postings, retrieval of all jobs, and retrieval of specific jobs by both users and admin. It allows authorized users to post jobs, search for jobs using keywords, and get details of specific jobs. The system is built using Node.js, Express, MongoDB, and JWT authentication for security.

## Features

- **Post a Job**: Authenticated users can post a job by providing job details such as title, description, requirements, salary, location, etc.
- **Get All Jobs**: Retrieves all jobs posted on the platform. Users can search for jobs using keywords.
- **Get Job by ID**: Fetches detailed information about a specific job using its ID.
- **Get Admin Jobs**: Admins can view all the jobs they have posted

## Routes

| Method | Endpoint                  | Description                           | Authentication |
|--------|---------------------------|---------------------------------------|----------------|
| POST   | `/post`                    | Posts a new job                       | Yes            |
| GET    | `/get`                     | Retrieves all jobs (with optional search) | Yes         |
| GET    | `/get/:id`                 | Retrieves a job by its ID             | Yes            |
| GET    | `/getadminjobs`            | Retrieves all jobs posted by admin    | Yes            |

### Request Examples

#### Post a Job
```http
POST /post
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Full Stack Developer",
  "description": "Develop and maintain web applications.",
  "requirements": "JavaScript, Node.js, React",
  "salary": 70000,
  "location": "Remote",
  "jobType": "Full-time",
  "experience": "2-4 years",
  "position": "Developer",
  "companyId": "650a1b3c9f0e1a6e12b3e711"
}
```



# Job Application Management System

The Job Application Management System enables users to apply for jobs, view jobs they have applied for, and allows admins to view the applicants for their posted jobs. Additionally, admins can update the status of applications (e.g., accepted, rejected, etc.).

## Features

- **Apply for a Job**: Authenticated users can apply for specific jobs.
- **Get Applied Jobs**: Users can view all jobs they have applied for.
- **Get Applicants for a Job**: Admins can view all applicants for a specific job.
- **Update Application Status**: Admins can update the status of job applications.

## Routes

| Method | Endpoint                      | Description                                    | Authentication |
|--------|--------------------------------|------------------------------------------------|----------------|
| POST   | `/apply/:id`                   | Applies for a specific job by its ID            | Yes            |
| GET    | `/get`                         | Retrieves all jobs the user has applied for     | Yes            |
| GET    | `/:id/applicants`              | Admins retrieve all applicants for a job by job ID | Yes         |
| POST   | `/status/:id/update`           | Admin updates the status of an application by its ID | Yes         |

### Key Sections:
- **Overview** of the features and technologies used.
- **API Routes** for applying to jobs, viewing applied jobs, getting applicants, and updating application statuses.
- **Error handling** to guide developers and users.
- **Future enhancements** like notifications and role-based access control.



# Frontend Setup with React, Vite, Tailwind CSS, and Shadcn UI

This guide explains how to set up a frontend project using **React**, **Vite**, **Tailwind CSS**, and **Shadcn UI**.

## Step 1: Initialize a React Project with Vite

1. Open your terminal and run the following command to create a new Vite project with React:

    ```bash
    npm create vite@latest my-app -- --template react
    ```

2. Change into the project directory:

    ```bash
    cd my-app
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Step 2: Install Tailwind CSS

Shadcn UI requires **Tailwind CSS** for styling. Follow the steps to install and configure Tailwind in the Vite project.

1. Install Tailwind CSS and its dependencies:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

2. Initialize Tailwind CSS configuration:

    ```bash
    npx tailwindcss init
    ```

    This will create a `tailwind.config.cjs` file.

3. Configure **tailwind.config.cjs** by adding the following:

    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

4. Create a `src/index.css` file and add Tailwind’s base styles:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

5. Import the `index.css` file into your `src/main.jsx` or `src/index.jsx` file:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // <-- Import Tailwind styles

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    ```

## Step 3: Add Shadcn UI Components

1. Install Shadcn CLI globally or use via `npx`:

    ```bash
    npx shadcn@latest init
    ```

2. Follow the setup instructions. After initialization, you can start adding Shadcn UI components. For example, to add a button component:

    ```bash
    npx shadcn add button
    ```

    Replace `button` with other components you may need (e.g., `input`, `dialog`).

## Step 4: Start the Development Server

Now that everything is set up, start the development server:

```bash
npm run dev
```
#### Open http://localhost:5173 in your browser to view your project.


# Navbar Component for Job Portal

The `Navbar` component for the Job Portal project is a navigation bar that conditionally renders content based on the user's login status. Below is a breakdown of the implementation, key features, and how to use it.

## Key Features

1. **Conditional Rendering:**
   - Displays Login and Signup buttons when the user is not logged in.
   - Displays the user's avatar with additional options (e.g., View Profile, Logout) when logged in.

2. **Lucide Icons:**
   - Uses **lucide-react** for displaying icons like `User2` and `LogOut`.

3. **Popover for User Actions:**
   - When the user is logged in, their avatar triggers a popover with options like viewing the profile or logging out.

4. **Navigation Links:**
   - The `Navbar` contains static navigation links such as `Home`, `Jobs`, and `Browser`. These links are connected to React Router for proper navigation.


## Login Page

The login page consists of a form with fields for the user's email, password, and role (Student or Recruiter). Upon submission, the form sends a POST request to the login API, and on successful login, the user is redirected to the homepage.

**Key Features:**
- Input fields for email and password.
- Radio buttons for selecting the user role (Student or Recruiter).
- Login button triggers an API call.
- Handles success and error responses using toast notifications.

## Signup Page

The signup page allows users to create an account by filling in their details, including full name, email, phone number, password, and role. Users can also upload a profile image. On form submission, a POST request is made to the registration API.

**Key Features:**
- Input fields for full name, email, phone number, password.
- Radio buttons for selecting the user role (Student or Recruiter).
- File input for profile image upload.
- Signup button triggers an API call.
- Handles success and error responses using toast notifications.

## Redux Toolkit Setup for State Management

This document outlines the steps required to set up Redux Toolkit for state management in a React application.

### Overview
Redux Toolkit simplifies the process of setting up Redux in a React application by providing tools to create slices of state, configure a store, and manage state efficiently with less boilerplate. In this setup, we demonstrate creating an authentication slice (`authSlice`) that tracks a loading state.

## Steps

### 1. Install Required Packages
To use Redux Toolkit and React-Redux in your project, install them with the following command:

```bash
npm install @reduxjs/toolkit react-redux
```



