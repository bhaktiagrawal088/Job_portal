
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
