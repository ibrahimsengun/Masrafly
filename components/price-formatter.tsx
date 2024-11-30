'use client';

import { cn } from '@/lib/utils';

export default function PriceFormatter({
  price,
  className
}: {
  price: number;
  className?: string;
}) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
  return <span className={cn(className)}>{formattedPrice}</span>;
}
