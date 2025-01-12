# File Sharing Application

## Objective

The goal of this project is to develop an online file sharing application with user management, file upload, sharing, and organization features.

## Features

### User Management

#### Sign Up
- Allows new users to register.
- Details required during registration:
  - **Unique username:** Application warns if the username is already taken.
  - **Email address**
  - **Password requirements:**
    - Must contain more than 8 characters.
    - At least one uppercase letter.
    - At least one lowercase letter.
    - At least one letter.

#### Login
- Users can log in with their credentials.
  - **Success:** Redirects the user to their **File Dashboard**, displaying files linked to their account.
  - **Failure:** Displays the message: _"Couldn’t find that user! Please try again."

#### Logout
- Logged-in users can log out, redirecting them back to the login page.

#### User Profile
- Users can update their profile details such as:
  - Name
  - Email address

### File Management

#### File Dashboard
- Displays all files associated with a user account as tiles in a grid.
- Files are sorted in descending order of upload date (latest first).
- Details for each file include:
  1. Name with extension (e.g., `big_win.pdf`)
  2. Upload date in the format _"23 May 2018"_

#### File Upload
- Users can upload one file at a time by clicking an upload button.

#### File Download
- Users can download a file by clicking the download action next to it.

#### File Share
- Users can toggle public sharing for a file using an ON/OFF toggle.
- When sharing is enabled, a unique publicly accessible URL is provided.
- Shared files cannot be deleted or reshared.

#### File Deletion
- Users can delete files by clicking the delete action next to each file.

### File Sharing

- A standalone page for shared files is available.
- The page displays the shared file with essential details.

## UI Representations

### Sign Up Page
- UI mock-up provided for user registration, including input validation for username, email, and password.

### Login Page
- Mock-up available, highlighting login success and failure scenarios.

### File Dashboard
- Represents file grid layout with file details and actions for upload, download, share, and delete.

### User Profile
- Displays a form to update profile information.

### Shared File Page
- Displays the publically shared file details with a unique URL.

## Dependencies

### Backend
- **Framework:** Express (Typescript, Node.js)
- **Database:** PostgreSQL
- **ORM:** Prisma

### Frontend
- **Framework:** ReactJS (Typescript)

### Miscellaneous
- Authentication libraries: JWT
- File storage: local

## Setup Instructions

1. Clone the repository.
2. Install dependencies listed in `package.json`.
3. Run the backend server.
4. Launch the frontend and navigate to the URL `http://localhost:5173` to access the application.
