
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






