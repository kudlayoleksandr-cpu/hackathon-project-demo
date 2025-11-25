# StudentInsights

A full-stack web application where current university students can share their experiences with applicants for a small fee. Built with Next.js, Supabase, Stripe, and TailwindCSS.

![StudentInsights Platform](https://via.placeholder.com/800x400?text=StudentInsights+Platform)

## 🎯 Overview

StudentInsights connects prospective university applicants with current students who can provide authentic, firsthand insights about campus life, courses, and career prospects. Students can earn money by sharing their experiences, while applicants get valuable information to make informed decisions.

### Key Features

- **For Students**: Create and manage consultation offers, receive payments, track earnings
- **For Applicants**: Browse student profiles, purchase insights, access delivered content
- **Multiple Service Types**: Written reviews, video calls, chat sessions
- **Secure Payments**: Stripe integration with platform commission handling
- **Modern UI**: Dark/light mode, responsive design, beautiful animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel

## 📦 Project Structure

```
student-insights/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (main)/            # Public pages with header/footer
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── explore/       # Browse offers
│   │   │   ├── universities/  # Universities list
│   │   │   ├── offers/[id]/   # Offer details
│   │   │   └── students/[id]/ # Student profiles
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboards
│   │   │   ├── student/       # Student dashboard
│   │   │   └── applicant/     # Applicant dashboard
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   │       ├── checkout/      # Stripe checkout
│   │       └── webhooks/      # Stripe webhooks
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   ├── offers/           # Offer-related components
│   │   └── providers/        # Context providers
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities and configurations
│       ├── supabase/         # Supabase clients
│       ├── database.types.ts # TypeScript types
│       ├── stripe.ts         # Stripe utilities
│       └── utils.ts          # Helper functions
├── supabase/
│   └── schema.sql            # Database schema
├── public/                   # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- (Optional) Vercel account for deployment

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd student-insights

# Install dependencies
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)

2. Go to **SQL Editor** and run the schema from `supabase/schema.sql`

3. Go to **Settings > API** and copy your project URL and keys

4. Enable Email Auth in **Authentication > Providers**

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Get your API keys from the Stripe Dashboard

3. Set up a webhook endpoint for `/api/webhooks/stripe`:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret

### 4. Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Platform Settings
PLATFORM_COMMISSION=15
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

### Tables

- **users**: User profiles with role (student/applicant/admin)
- **offers**: Student consultation offers
- **orders**: Purchase transactions
- **universities**: University directory
- **reviews**: Order reviews and ratings

### Key Relationships

```
users (1) → (many) offers
users (1) → (many) orders (as buyer or seller)
offers (1) → (many) orders
orders (1) → (1) reviews
```

## 💳 Payment Flow

1. **Checkout**: Applicant selects offer → Creates Stripe Checkout Session
2. **Payment**: User completes payment on Stripe
3. **Webhook**: Stripe sends `checkout.session.completed` event
4. **Order Creation**: Webhook creates order in database
5. **Delivery**: Student delivers content/consultation
6. **Payout**: Platform takes commission (15%), student receives 85%

## 🔐 Authentication

- Email/password authentication via Supabase Auth
- Role-based access control (student, applicant, admin)
- Protected routes with middleware
- Session management with cookies

## 🎨 Theming

The app supports both light and dark modes:

- Uses `next-themes` for theme management
- Tailwind CSS with custom color palette
- CSS variables for dynamic theming
- System preference detection

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Responsive navigation with mobile menu
- Touch-friendly interfaces

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🧪 Testing Stripe Payments

Use these test card numbers:

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Requires Auth**: 4000 0025 0000 3155

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout` | Create Stripe checkout session |
| POST | `/api/webhooks/stripe` | Handle Stripe webhook events |

## 🔧 Configuration

### Platform Commission

Set the platform commission percentage in `.env.local`:

```env
PLATFORM_COMMISSION=15  # 15% commission
```

### Supabase RLS Policies

Row Level Security policies are defined in `supabase/schema.sql`:

- Users can view all profiles but only edit their own
- Students can manage their own offers
- Order access limited to buyer/seller
- Admin has full access

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ for students worldwide

