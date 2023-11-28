# Next.js Dropbox Clone

A cutting-edge cloud storage solution, combining the power of Next.js with secure authentication, and seamless integration with cloud storage services. Users can confidently manage their files and experience a modern and responsive interface across devices.

## Features
- Upload various file types to Firebase Storage, emulating Dropbox functionality.
- Integrate complete CRUD functionality for seamless file management.
- Create an appealing UI/UX using the popular Shadcn library.
- Implement NextAuth Middleware for secure access control.
- Build a smooth login/logout flow with Clerk Authentication.
- Use loaders for visual feedback during data fetching.
- Implement a table view for files with metadata display.
- Enable users to download uploaded files directly to their devices.
- Implement drag-and-drop file uploads using React DnD library.
- Add a dark mode toggling feature for user interface customization.
- Utilize TypeScript for bug reduction and improved code robustness.

## Tech Stack
- [Next.js](https://nextjs.org/)
- [React.js](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Clerk Authentication](https://clerk.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN](ShadCN)
- [Firebase](https://firebase.google.com/)
- [React Dropzone](https://www.npmjs.com/package/react-dropzone)
- [React Firebase Hooks](https://www.npmjs.com/package/react-firebase-hooks)
- [React File Icon](https://www.npmjs.com/package/react-file-icon)
- [Pretty bytes](https://www.npmjs.com/package/pretty-bytes)

## Installation

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 18.12.0 required).

2. Clone The Repo.
  
  ```bash
    git clone https://github.com/anoopraju31/nextjs-dropbox-clone
  ```

3. Install Dependencies
 
  ```bash
      npm install
  ```    

4. Make a copy of the example environment variables file.

   On Linux systems: 
   ```bash
   $ cp .env.local.example .env.local
   ```
   On Windows:
   ```powershell
   $ copy .env.local.example .env.local
   ```

6. Create a new project in [Clerk](https://dashboard.clerk.com/) and add the API Key to the newly created `.env.local` file.

7. Create a new project in [firebase](https://console.firebase.google.com/u/0/) and add the API Key to the newly created `.env.local` file.

8. Run Local
  
    ```bash
        npm run dev
    ```
