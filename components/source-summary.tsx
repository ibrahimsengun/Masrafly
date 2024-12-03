'use client';
import { useSource } from '@/context/source-context';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PriceFormatter from './price-formatter';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function SourceSummary() {
  const { sources } = useSource();
  return (
    <Link href="/sources">
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader>
          <CardTitle className="md:text-lg">Your Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            <div className="flex flex-col gap-1">
              {sources.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-row gap-1">
                      <ChevronRight />
                      <span>No sources added</span>
                    </div>
                  </div>
                </motion.div>
              )}
              {sources.map((source) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-row gap-1">
                      <ChevronRight />
                      <span>{source.name}</span>
                    </div>
                    <span>
                      <PriceFormatter price={source.balance} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </Link>
  );
}
