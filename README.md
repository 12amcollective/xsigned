# XSignedAI - Music Industry AI Platform

A modern React TypeScript landing page for a revolutionary music industry AI platform. This "Coming Soon" page features email waitlist signup and showcases the future of AI-powered music marketing.

## Features

- 🎵 Clean, modern landing page design
- 📧 Email waitlist signup functionality
- 🎨 Responsive design with smooth animations
- ⚡ Fast performance with Vite
- 🔧 TypeScript for type safety
- 📱 Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   # Copy the example file for local development (optional)
   cp .env.local.example .env.local
   # Edit .env.local with your actual API keys and local settings
   ```

### Environment Configuration

This project uses separate environment files:

- **`.env.development`** - Development environment settings (committed to repo)
- **`.env.production`** - Production environment settings (committed to repo)
- **`.env.local.example`** - Template for local overrides (committed to repo)
- **`.env.local`** - Your local settings with actual API keys (not committed)

Environment variables use the `VITE_` prefix and are available in the app as `import.meta.env.VITE_VARIABLE_NAME`.

### Development

**For optimal development experience, we recommend running frontend and backend separately:**

#### Option 1: Hybrid Development (Recommended)

1. **Start backend services** (from your backend repository):

   ```bash
   # In your backend repository directory
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Start frontend development server** (from this repository):

   ```bash
   npm run dev
   ```

3. **Access your application:**
   - Frontend: `http://localhost:5173` (with hot reloading)
   - Backend API: `http://localhost:5001/api`
   - Database: `localhost:5432`

#### Option 2: Full Docker Development

```bash
# From your backend repository
docker-compose -f docker-compose.yml up --build
```

#### Development URLs

**Frontend**: `http://localhost:5173` (with hot reloading)  
**Backend API**: `http://localhost:5001/api`  
**Database**: `localhost:5432`

#### Backend Connection

The frontend is configured to connect to your backend API at:

- **Development**: `http://localhost:5001/api` (when backend runs in Docker)
- **Production**: `https://xsigned.ai/api`

To switch to connecting to your Raspberry Pi for testing, update `.env.development`:

```bash
# Uncomment and set your Pi's IP address:
VITE_API_URL=http://[YOUR_PI_IP]/api
VITE_API_BASE_URL=http://[YOUR_PI_IP]
```

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx          # Main landing page component
├── App.css          # Styling for the landing page
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Design Features

- **Coming Soon Badge**: Eye-catching announcement
- **Hero Title**: Bold, impactful messaging about music industry transformation
- **Email Signup**: Clean form with validation and success states
- **Tagline**: Clear value proposition about AI-powered music marketing
- **Animated Logo**: Sound wave visualization with CSS animations
- **Gradient Background**: Modern aesthetic with subtle color transitions

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with animations and responsive design

## Customization

You can easily customize the design by modifying:

- Colors and gradients in `App.css`
- Text content in `App.tsx`
- Animation timing and effects
- Email handling logic

## Deployment

This project can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3/CloudFront

Build the project with `npm run build` and deploy the `dist` folder.

## License

This project is private and proprietary to XSignedAI.
