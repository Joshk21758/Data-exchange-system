# City Flow

City Flow connect is a Next.js (App Router) web application for managing public "document applications" and workflows. Public users can submit applications for government documents. Review, approve/reject, and request data. Admins can manage users and roles. The app uses MongoDB for storage and Resend for SMTP email notifications.

## Features

- Public user registration & login
- Submit, edit, delete applications (central `applications` collection + per-ministry mirrors)
- Admin review: approve/reject with email notifications
- Password reset flow using email verification codes
- Admin role management (Auditor, Security Analyst, Super Admin)

## Tech stack

- Next.js (App Router)
- React (server & client components)
- MongoDB (native driver)
- Resend for SMTP email
- Zod for server-side validation
- bcrypt for password hashing

## Challenges faced

- Implementing an authentication system for both public users and admins
- Implementing a role-based access control system for admins
- Implementing a password reset flow using email verification codes
- Implementing a secure and scalable database schema
- Implementing a secure and scalable email notification system

## How to Run the App

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd city-flow
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## How to use

1. Register for an account
2. Registering as an Adiministrator, do not use real credentials, as it is just for testing. The admin credentials are:
3. Log in to your account
4. Submit an application
5. Track your application status
6. Receive email notifications
