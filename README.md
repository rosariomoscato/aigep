# AIGEP - AI Governance & Ethics Platform

A comprehensive AI governance platform that provides compliance management, risk assessment, and certification for AI products. Supporting both traditional machine learning and LLM-based applications with role-based workflows for organizations implementing responsible AI practices.

## 🚀 Features

- **🛡️ Compliance Management**: Automated compliance checks for EU AI Act, Rome Call, and industry standards
- **📊 Risk Assessment**: Comprehensive risk evaluation tools for AI systems and models
- **🏆 Certification System**: Quality badges and certification workflows with public verification
- **👥 Multi-Role Platform**: Role-based access for Data Scientists, Compliance Officers, Auditors, and Product Managers
- **📈 Monitoring & Analytics**: Real-time model performance tracking, drift detection, and compliance metrics
- **📁 Project Management**: Complete artifact versioning and collaboration for ML and LLM projects
- **📚 Documentation & Learning**: Interactive guides, tutorials, and best practices for AI governance
- **🔐 Authentication**: Better Auth with Google OAuth integration
- **🗃️ Database**: Drizzle ORM with PostgreSQL
- **🎨 UI Components**: shadcn/ui with Tailwind CSS
- **⚡ Modern Stack**: Next.js 16, React 19, TypeScript
- **📱 Responsive**: Mobile-first design approach

## 🎯 Platform Overview

AIGEP is designed for organizations that need to implement comprehensive AI governance and compliance frameworks. The platform provides end-to-end solutions for managing AI product lifecycles while ensuring adherence to regulatory requirements and ethical standards.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Version 18.0 or higher (<a href="https://nodejs.org/" target="_blank">Download here</a>)
- **Git**: For cloning the repository (<a href="https://git-scm.com/" target="_blank">Download here</a>)
- **PostgreSQL**: Either locally installed or access to a hosted service like Vercel Postgres

## 🛠️ Quick Setup

**1. Clone the Repository**

```bash
git clone https://github.com/yourusername/aigep.git
cd aigep
```

**2. Install Dependencies**

This project uses pnpm as the package manager:

```bash
pnpm install
```

**3. Environment Setup**

Copy the example environment file:

```bash
cp env.example .env
```

Fill in your environment variables in the `.env` file:

```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/aigep_db"

# Authentication - Better Auth
BETTER_AUTH_SECRET="your-random-32-character-secret-key-here"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App URL (for production deployments)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# File Storage (Optional - for file upload functionality)
# Leave empty to use local storage (public/uploads/) in development
# Set to enable Vercel Blob storage in production
BLOB_READ_WRITE_TOKEN=""
```

**4. Database Setup**

Generate and run database migrations:

```bash
pnpm run db:generate
pnpm run db:migrate
```

**5. Start the Development Server**

```bash
pnpm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## ⚙️ Service Configuration

### PostgreSQL Database on Vercel

1. Go to <a href="https://vercel.com/dashboard" target="_blank">Vercel Dashboard</a>
2. Navigate to the **Storage** tab
3. Click **Create** → **Postgres**
4. Choose your database name and region
5. Copy the `POSTGRES_URL` from the `.env.local` tab
6. Add it to your `.env` file

### Google OAuth Credentials

1. Go to <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a>
2. Create a new project or select an existing one
3. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
4. Set application type to **Web application**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the **Client ID** and **Client Secret** to your `.env` file

### AIGEP Platform Configuration

The AIGEP platform supports various AI governance frameworks and compliance standards. Configuration includes:

1. **Compliance Frameworks**: EU AI Act, Rome Call principles, industry-specific regulations
2. **Risk Assessment Models**: Configurable risk matrices and evaluation criteria
3. **Certification Workflows**: Customizable certification paths and badge systems
4. **Role-Based Access**: Define permissions and workflows for different user types

These configurations can be managed through the admin dashboard after initial setup.

### File Storage Configuration

The project includes a flexible storage abstraction that automatically switches between local filesystem storage (development) and Vercel Blob storage (production).

**For Development (Local Storage):**
- Leave `BLOB_READ_WRITE_TOKEN` empty or unset in your `.env` file
- Files are automatically stored in `public/uploads/`
- Files are served at `/uploads/` URL path
- No external service or configuration needed

**For Production (Vercel Blob):**
1. Go to <a href="https://vercel.com/dashboard" target="_blank">Vercel Dashboard</a>
2. Navigate to your project → **Storage** tab
3. Click **Create** → **Blob**
4. Copy the `BLOB_READ_WRITE_TOKEN` from the integration
5. Add it to your production environment variables

The storage service automatically detects which backend to use based on the presence of the `BLOB_READ_WRITE_TOKEN` environment variable.

## 🗂️ Project Structure

```
src/
├── app/                           # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   └── diagnostics/          # System diagnostics
│   ├── audit/                    # Audit management page
│   ├── compliance/               # Compliance management page
│   ├── dashboard/                # Main dashboard
│   ├── login/                    # Login page
│   ├── notifications/            # Notifications center
│   ├── projects/                 # Project management hub
│   ├── reports/                  # Reports and analytics
│   └── settings/                 # Settings and configuration
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   └── ui/                      # shadcn/ui components
└── lib/                         # Utilities and configurations
    ├── auth.ts                  # Better Auth configuration
    ├── auth-client.ts           # Client-side auth utilities
    ├── db.ts                    # Database connection
    ├── schema.ts                # Database schema
    ├── storage.ts               # File storage abstraction
    └── utils.ts                 # General utilities
```

## 🔧 Available Scripts

```bash
pnpm run dev          # Start development server with Turbopack
pnpm run build        # Build for production (runs db:migrate first)
pnpm run build:ci     # Build without database (for CI/CD pipelines)
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run typecheck    # TypeScript type checking
pnpm run check        # Run lint and typecheck
pnpm run format       # Format code with Prettier
pnpm run format:check # Check code formatting
pnpm run db:generate  # Generate database migrations
pnpm run db:migrate   # Run database migrations
pnpm run db:push      # Push schema changes to database
pnpm run db:studio    # Open Drizzle Studio (database GUI)
pnpm run db:dev       # Push schema for development
pnpm run db:reset     # Reset database (drop all tables)
```

## 📖 Platform Modules

- **Home (`/`)**: Landing page with platform overview and features
- **Login (`/login`)**: Authentication portal with Google OAuth
- **Dashboard (`/dashboard`)**: Main governance dashboard with overview metrics
- **Projects (`/projects`)**: Project management hub for AI initiatives
- **Compliance (`/compliance`)**: Compliance management and monitoring
- **Audit (`/audit`)**: Audit trails and compliance verification
- **Reports (`/reports`)**: Analytics and governance reports
- **Settings (`/settings`)**: Platform configuration and user preferences
- **Notifications (`/notifications`)**: Alert center for compliance and governance updates

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Install the Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

2. Deploy your application:

   ```bash
   vercel --prod
   ```

3. Follow the prompts to configure your deployment
4. Add your environment variables when prompted or via the Vercel dashboard

### Production Environment Variables

Ensure these are set in your production environment:

- `POSTGRES_URL` - Production PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secure random 32+ character string
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `NEXT_PUBLIC_APP_URL` - Your production domain
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token (optional, uses local storage if not set)

## 🎯 Use Cases

AIGEP is designed for various scenarios:

- **Enterprise AI Governance**: Manage compliance across multiple AI projects and teams
- **Regulatory Compliance**: Ensure adherence to EU AI Act and other regulations
- **AI Certification**: Obtain and maintain AI quality certifications
- **Risk Management**: Identify and mitigate AI-related risks
- **Audit Preparation**: Maintain comprehensive audit trails for AI systems
- **Stakeholder Transparency**: Provide visibility into AI governance practices

## 🔒 Security & Compliance

- **GDPR Compliant**: Built with privacy-by-design principles
- **Role-Based Access Control**: Granular permissions for different user types
- **Audit Logging**: Comprehensive tracking of all governance activities
- **Data Encryption**: End-to-end encryption for sensitive data
- **Secure Authentication**: Enterprise-grade authentication with Better Auth

## 🤝 Contributing

We welcome contributions to the AIGEP platform! Please follow our contribution guidelines:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request with a detailed description

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

For support and additional resources:

- **Documentation**: Comprehensive guides and API documentation
- **Community Forum**: Connect with other AIGEP users
- **Issue Tracking**: Report bugs and request features via GitHub Issues
- **Enterprise Support**: Contact us for enterprise-level support and customizations

---

**Transform your AI governance with AIGEP! 🚀**
