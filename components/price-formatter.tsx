'use client';

import { usePreferences } from '@/context/preferences-context';
import { cn } from '@/lib/utils';
import { CurrencyCode } from '@/types/preferences';

export default function PriceFormatter({
  price,
  className
}: {
  price: number;
  className?: string;
}) {
  const { preferences } = usePreferences();
  const formattedPrice = new Intl.NumberFormat(
    CurrencyCode[preferences?.currency as keyof typeof CurrencyCode],
    {
      style: 'currency',
      currency: preferences?.currency,
      minimumFractionDigits: preferences?.decimal_length,
      maximumFractionDigits: preferences?.decimal_length
    }
  ).format(price);
  return <span className={cn(className)}>{formattedPrice}</span>;
}
