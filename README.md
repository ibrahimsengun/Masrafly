<h1 align="center">💰 Masrafly</h1>

<p align="center">
  <strong>Personal Finance Management Made Simple</strong>
</p>

<p align="center">
  Track your expenses, manage your sources, and take control of your financial future with this modern, intuitive finance management application.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

<br/>

## ✨ Features

### 💳 **Expense Management**

- **Smart Categorization**: Color-coded categories for easy expense tracking
- **Detailed Logging**: Rich expense descriptions with date tracking
- **Advanced Filtering**: Filter by category, source, amount, and date range
- **Multiple Sorting**: Sort expenses by date, amount, or category
- **Quick Actions**: Add, edit, or delete expenses with intuitive UI

### 🏦 **Source Management**

- **Multi-Source Tracking**: Manage multiple bank accounts, cash, and payment methods
- **Balance Overview**: Real-time balance tracking across all sources
- **Source-Based Filtering**: Track expenses by payment source
- **Optional Tracking**: Enable/disable source tracking per user preference

### 📊 **Analytics & Insights**

- **Category Breakdown**: Visual pie charts showing expense distribution
- **Monthly Trends**: Track spending patterns over time
- **Budget Analysis**: Compare actual vs planned spending
- **Financial Summary**: Key metrics and spending insights

### ⚙️ **Customization**

- **Multi-Currency Support**: Support for TRY, USD, EUR, GBP, JPY
- **Number Formatting**: Customizable decimal places and separators
- **Theme Support**: Dark/Light mode with system preference detection
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🔐 **Security & Authentication**

- **Secure Authentication**: Google OAuth integration via Supabase Auth
- **User Privacy**: Personal data isolation and secure storage
- **Session Management**: Persistent login with secure cookie handling

## 🛠️ Tech Stack

### **Frontend**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library with hooks and context
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern React component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### **Backend & Database**

- **[Supabase](https://supabase.com/)** - Backend-as-a-Service platform
- **[PostgreSQL](https://www.postgresql.org/)** - Open source relational database
- **[Supabase Auth](https://supabase.com/docs/guides/auth)** - Authentication with OAuth providers

### **Additional Libraries**

- **[TanStack Table](https://tanstack.com/table/v8)** - Headless table building
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon pack
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Theme switching

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ibrahimsengun/Masrafly.git
   cd Masrafly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Supabase**

   Create a new Supabase project at [database.new](https://database.new)

4. **Environment Variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in your [Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. **Database Setup**

   Run the SQL migrations in your Supabase dashboard to create the necessary tables:

   - Users (handled by Supabase Auth)
   - Categories
   - Sources
   - Expenses
   - Preferences

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Masrafly/
├── app/                          # Next.js 15 App Router
│   ├── (auth-pages)/            # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (protected)/             # Protected routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── expenses/            # Expense management
│   │   ├── categories/          # Category management
│   │   ├── sources/             # Source management
│   │   └── preferences/         # User settings
│   ├── auth/callback/           # OAuth callback handler
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── actions/                     # Server Actions
│   ├── auth-actions.ts          # Authentication actions
│   ├── expense-actions.ts       # Expense CRUD operations
│   ├── category-actions.ts      # Category CRUD operations
│   ├── source-actions.ts        # Source CRUD operations
│   └── preferences-actions.ts   # User preferences
├── components/                  # Reusable UI components
│   ├── ui/                      # shadcn/ui base components
│   ├── expense-list.tsx         # Expense list component
│   ├── expense-form-dialog.tsx  # Add/edit expense form
│   ├── expenses-dashboard.tsx   # Dashboard layout
│   └── ...                     # Other components
├── context/                     # React Context providers
│   ├── expense-context.tsx      # Expense state management
│   ├── category-context.tsx     # Category state management
│   ├── source-context.tsx       # Source state management
│   └── preferences-context.tsx  # User preferences
├── forms/                       # Form components
│   ├── expense-form.tsx         # Expense form logic
│   ├── category-form.tsx        # Category form logic
│   └── source-form.tsx          # Source form logic
├── types/                       # TypeScript type definitions
│   ├── expense.ts               # Expense-related types
│   ├── category.ts              # Category types
│   ├── source.ts                # Source types
│   └── preferences.ts           # Preference types
├── utils/                       # Utility functions
│   ├── supabase/                # Supabase configuration
│   └── utils.ts                 # Helper functions
└── hooks/                       # Custom React hooks
    ├── use-media-query.ts       # Responsive design hook
    └── use-toast.ts             # Toast notification hook
```

## 🗄️ Database Schema

### Core Tables

**Categories**

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `name` (Text)
- `color` (Text) - Hex color code
- `created_at` (Timestamp)

**Sources**

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `name` (Text)
- `balance` (Decimal)
- `created_at` (Timestamp)

**Expenses**

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `amount` (Decimal)
- `description` (Text)
- `date` (Date)
- `category_id` (UUID, Foreign Key to Categories)
- `source_id` (UUID, Foreign Key to Sources)
- `created_at` (Timestamp)

**Preferences**

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `currency` (Text)
- `number_format` (Text)
- `decimal_length` (Integer)
- `track_sources` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 🎨 UI Components

The application uses a consistent design system built with:

- **Color Palette**: Financial trust colors with careful contrast ratios
- **Typography**: Geist Sans font family for modern readability
- **Spacing**: Consistent 4px/8px/16px/24px grid system
- **Interactive States**: Smooth hover, focus, and active transitions
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels

## 📱 Features Walkthrough

### Dashboard

- Monthly expense overview with key metrics
- Interactive charts showing expense distribution
- Quick expense entry and management
- Source balance tracking
- Category-based expense breakdown

### Expense Management

- Add expenses with category and source selection
- Rich filtering options (date, category, amount, source)
- Bulk operations for efficiency
- Export capabilities
- Search functionality

### Source Management

- Add and manage multiple financial sources
- Balance tracking and updates
- Source-based expense filtering
- Optional source tracking

### Preferences

- Currency selection and formatting
- Number format customization
- Theme preferences (dark/light)
- Feature toggles (source tracking)

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the excellent backend platform
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for seamless deployment
- The open-source community for the amazing tools and libraries

## 📞 Support

If you have any questions or need help:

- Open an [issue](https://github.com/ibrahimsengun/Masrafly/issues) on GitHub
- Contact the maintainers
- Check the [documentation](https://supabase.com/docs) for Supabase-related questions

---

<p align="center">Made with ❤️ for better financial management</p>
