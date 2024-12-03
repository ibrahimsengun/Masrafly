'use client';

import { cn } from '@/lib/utils';
import { getMonthName } from '@/utils/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

export default function DateChanger({ className }: { className?: string }) {
  const router = useRouter();
  const query = useSearchParams();

  const queryMonth = query.get('month');
  const queryYear = query.get('year');

  const initialMonth = queryMonth ? parseInt(queryMonth) : new Date().getMonth() + 1;
  const initialYear = queryYear ? parseInt(queryYear) : new Date().getFullYear();

  const [month, setMonth] = useState<number>(initialMonth);
  const [year, setYear] = useState<number>(initialYear);
  const handleChangeMonth = (type: 'prev' | 'next') => {
    let currentMont = month;
    let currentYear = year;
    if (type == 'next') {
      if (currentMont == 12) {
        currentMont = 1;
        currentYear++;
      } else {
        currentMont++;
      }
    } else {
      if (month == 1) {
        currentMont = 12;
        currentYear--;
      } else {
        currentMont--;
      }
    }
    setMonth(currentMont);
    setYear(currentYear);
    router.push(`?month=${currentMont}&year=${currentYear}`);
  };
  return (
    <div className={cn('flex flex-row justify-evenly items-center w-full', className)}>
      <Button variant="ghost" onClick={() => handleChangeMonth('prev')}>
        <ArrowLeft />
      </Button>
      <div>
        {getMonthName(month)}, {year}
      </div>
      <Button variant="ghost" onClick={() => handleChangeMonth('next')}>
        <ArrowRight />
      </Button>
    </div>
  );
}
