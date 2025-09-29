# 👤 User Management API

## Project Overview

This is a **Node.js backend application** built with **Express.js** and **PostgreSQL** for managing users. It demonstrates **role-based access control**, **CRUD operations**, **JWT authentication**, and file uploads. Admins have full control over user management, while regular users can only access their own data.

**Key Features:**
- **User Roles:** Two roles: `Admin` and `User`.
  - **Admin:** Can add, update, delete, list, search, and sort users.  
  - **User:** Can view their own profile details only.  
- **CRUD Operations:** Full create, read, update, delete functionality for users.
- **JWT Authentication:** Secure API endpoints with JWT tokens.
- **Request Logging:** Logs incoming requests using **Winston** middleware.
- **Pagination:** List users with 10 records per page.
- **Sorting & Searching:** Admin can sort and search users by name, phone, or email.
- **File Uploads:** Upload profile images using **Multer** (size limit: 50KB).
- **Forgot Password:** Implemented using **EJS templates** with email notifications.
- **Email Notifications:** Send emails on registration and password recovery via **NodeMailer**.
- **Data Validation:** Ensure unique email addresses and valid profile image uploads.

**Technologies Used:**
- Node.js & Express.js  
- MongoDB & Mongoose  
- JWT for authentication  
- Multer for file uploads  
- Winston for logging  
- NodeMailer for email notifications  
- EJS templates for rendering UI  


**Project Structure:**

User_Management/  
├── index.js # Main server file (Express setup)  
├── .env # Environment variables (e.g., SECRET_KEY)  
├── db.js # MongoDB connection setup  
├── controller/ # Route logic  
│ ├── login.js # POST login + JWT issuance  
│ ├── user_data.js # User/Admin creation  
│ ├── admin.js # Admin-only CRUD operations  
│ ├── dashboard.js # User-specific dashboard  
│ ├── forget_password.js  
│ └── reset_password.js  
├── middleware/  
│ ├── auth.js # JWT auth + Role-based access control  
│ └── upload.js # Multer configuration for uploads  
├── model/  
│ └── user_data.js # User schema with profile info & role  
├── logger/  
│ └── logger.js # Winston logging setup  
├── static_route/  
│ └── static.js # Renders home, login, create-user pages  
├── utils/  
│ └── mailer.js # Mailing utilities (NodeMailer)  
├── view/ # EJS templates  
│ ├── home.ejs  
│ ├── login.ejs  
│ ├── user_data.ejs  
│ ├── userlist.ejs  
│ ├── single_user.ejs  
│ ├── forget_password.ejs  
│ └── reset_password.ejs  
├── Upload/ # Uploaded profile images  
├── Logs/ # Winston logs  
├── app.log  
└── error.log