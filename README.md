# City Flow

City Flow is a Next.js (App Router) web application for managing public "document applications" and ministry workflows. Public users can submit applications for government documents. Ministry staff review, approve/reject, and request data. Admins can manage users and roles. The app uses MongoDB for storage and Nodemailer for SMTP email notifications.

## Features

- Public user registration & login
- Submit, edit, delete applications (central `applications` collection + per-ministry mirrors)
- Admin review: approve/reject with email notifications
- Data request creation for inter-department workflows
- Password reset flow using email verification codes
- Admin role management (Auditor, Security Analyst, Super Admin)

## Tech stack

- Next.js (App Router)
- React (server & client components)
- MongoDB (native driver)
- Nodemailer for SMTP email
- Zod for server-side validation
- bcrypt for password hashing

## Recommended next steps

- Implement password-reset persistence + verification flow (store code, TTL, verify before allowing password change).
- Add audit logging for role changes and approval/rejection actions.
- Add tests for server actions (happy path + edge cases).
- Improve UI feedback by returning structured results from server actions and handling them client-side (instead of always redirecting).
