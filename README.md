# J&B Chat PWA

A Progressive Web App (PWA) for private chat between James and Beril, built with Next.js, React, Tailwind CSS, and InstantDB.

## Features

- **Real-time messaging** with InstantDB
- **File sharing** (images and documents up to 50MB)
- **Auto-link detection** and dedicated links view
- **Image gallery** for shared photos
- **Customizable theme** with color picker
- **Push notifications** for new messages
- **Offline support** with service worker
- **Installable** as a standalone app on mobile and desktop
- **Mobile-optimized** design (max-width 420px)

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **InstantDB** - Real-time database
- **PWA** - Installable web app with offline support

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Navigate to the pwa directory:
   ```bash
   cd pwa
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

5. Add your InstantDB App ID to `.env.local`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment

The PWA can be deployed to any static hosting service:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages** (with static export)

## PWA Installation

### Mobile (Chrome/Safari)
1. Open the app in your browser
2. Tap the share button
3. Select "Add to Home Screen"

### Desktop (Chrome/Edge)
1. Open the app in your browser
2. Click the install icon in the address bar
3. Follow the prompts

## Database Compatibility

This PWA shares the same InstantDB database with the Chrome extension, ensuring seamless sync between both platforms.

## Project Structure

```
pwa/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main app page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── chat/             # Chat-related components
│   ├── media/            # Media views (links, images, files)
│   ├── settings/         # Settings components
│   ├── layout/           # Layout components
│   └── shared/           # Shared/reusable components
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   ├── manifest.json    # PWA manifest
│   └── icons/           # App icons
├── instant.schema.ts    # InstantDB schema
└── instant.perms.ts     # InstantDB permissions
```

## License

Private project for personal use.
