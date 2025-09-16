# Madhive Proto

A modern Next.js application built with a powerful tech stack including Redux, Recharts, Mantine UI, and Framer Motion.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Redux Toolkit** - State management with modern Redux patterns
- **Recharts** - Beautiful data visualization components
- **Mantine** - Modern React components library
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## Features

- ✅ Server-side rendering with Next.js App Router
- ✅ Type-safe Redux store with RTK
- ✅ Responsive UI components with Mantine
- ✅ Server status monitoring with real-time updates
- ✅ RESTful API endpoints for server status
- ✅ Smooth animations with Framer Motion
- ✅ Modern CSS with Tailwind
- ✅ Development tools (ESLint, TypeScript)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```text
src/
├── app/                     # Next.js App Router
│   ├── api/                # API endpoints
│   │   └── status/         # Server status endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── StoreProvider.tsx   # Redux store provider
├── components/             # React components
│   └── ServerStatus.tsx   # Server status display component
└── store/                 # Redux store
    ├── store.ts           # Store configuration
    ├── hooks.ts           # Typed Redux hooks
    └── features/          # Redux slices
        └── serverStatusSlice.ts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Example Usage

The application now features a Server Status page that demonstrates:

- **API Endpoints**: RESTful `/api/status` endpoint providing server information
- **Redux Integration**: Server status state management with async thunks
- **Mantine UI**: Clean status cards and interactive components
- **Real-time Updates**: Refresh button to get current server status
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Graceful error states and loading indicators

## API Endpoints

### GET /api/status

Returns current server status information:

```json
{
  "server": "online",
  "timestamp": "2025-09-15T14:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "development",
  "memory": {
    "used": 45,
    "total": 128
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.