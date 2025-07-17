# Psychology Cabinet

A modern fullstack web application for managing a psychology practice, built with Next.js, TypeScript, Tailwind CSS, and a modular component architecture.

## Features

- **Appointment Booking:** Patients can book appointments online.
- **Practitioner Management:** Admins can manage practitioner profiles and availability.
- **Articles & Resources:** Share articles and resources for patients and practitioners.
- **Testimonials:** Display patient testimonials with moderation.
- **Contact Form:** Secure contact form for inquiries.
- **Admin Dashboard:** Manage appointments, articles, practitioners, and testimonials.
- **Responsive Design:** Optimized for all devices using Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** (Configure in `lib/db.ts`)
- **Styling:** Tailwind CSS, PostCSS
- **Package Manager:** pnpm

## Project Structure

```
app/            # Next.js app directory (pages, layouts, API routes)
components/     # Reusable React components
hooks/          # Custom React hooks
lib/            # Utility functions and database config
public/         # Static assets (images, logos)
scripts/        # SQL scripts for database setup and seeding
styles/         # Global styles
types/          # TypeScript type definitions
```

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Configure the database:**
   - Edit `lib/db.ts` with your database credentials.
   - Run SQL scripts in `scripts/` to set up and seed your database.
3. **Run the development server:**
   ```bash
   pnpm dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
