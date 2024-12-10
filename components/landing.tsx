'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  DollarSign,
  PieChart,
  Smartphone,
  Target,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function Landing() {
  return (
    <main>
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Take Control of Your Finances
        </motion.h1>
        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Masrafly helps you manage your money smarter. Track expenses, set budgets, and achieve
          your financial goals with ease.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" asChild>
            <Link href="/sign-in" className="inline-flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart2,
              title: 'Asset Tracking',
              description: 'Add and manage all your financial assets in one place.'
            },
            {
              icon: PieChart,
              title: 'Expense Insights',
              description: 'Categorize and visualize your spending patterns.'
            },
            {
              icon: Target,
              title: 'Budget Management',
              description: 'Set and track budgets to reach your financial goals.'
            },
            {
              icon: Smartphone,
              title: 'Mobile Friendly',
              description: 'Access your finances on-the-go with our responsive design.'
            },
            {
              icon: Users,
              title: 'Multi-User Support',
              description: 'Collaborate on finances with family or team members.'
            },
            {
              icon: DollarSign,
              title: 'Financial Health Score',
              description: 'Get a clear picture of your overall financial wellbeing.'
            }
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center  mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex M.',
                quote:
                  "Masrafly has completely transformed how I manage my money. It's intuitive and insightful!"
              },
              {
                name: 'Sarah L.',
                quote:
                  'I love how easy it is to track my expenses and see where my money is going. Highly recommended!'
              },
              {
                name: 'Jordan K.',
                quote:
                  'The budgeting features have helped me save more than I ever thought possible. Thank you, FinanceTrack!'
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <p className=" font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold  mb-8">Ready to Take Control?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have already discovered the power of FinanceTrack. Start your
          journey to financial clarity today.
        </p>
        <Button size="lg" asChild>
          <Link href="/sign-in">Sign In Now</Link>
        </Button>
      </section>
    </main>
  );
}
