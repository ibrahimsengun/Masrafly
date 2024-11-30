'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { usePreferences } from '@/context/preferences-context';
import { useToast } from '@/hooks/use-toast';
import { CurrencyCode, Preferences } from '@/types/preferences';
import { Globe, Hash, RotateCcw, SunMoon } from 'lucide-react';
import { useState } from 'react';
import { ThemeSwitcher } from './theme-switcher';

const currencies = [
  { value: 'USD', label: 'US Dollar (USD)', code: 'en-US' },
  { value: 'EUR', label: 'Euro (EUR)', code: 'de-DE' },
  { value: 'TRY', label: 'Turkish Lira (TRY)', code: 'tr-TR' },
  { value: 'GBP', label: 'British Pound (GBP)', code: 'en-GB' },
  { value: 'JPY', label: 'Japanese Yen (JPY)', code: 'ja-JP' }
];

export default function PreferencesDashboard() {
  const { preferences: defaultPreferences, updatePreferences } = usePreferences();
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences!);
  const { toast } = useToast();

  const handleCurrencyChange = (value: string) => {
    setPreferences((prev) => ({ ...prev, currency: value }));
  };

  const handleDecimalLengthChange = (value: number[]) => {
    setPreferences((prev) => ({ ...prev, decimal_length: value[0] }));
  };

  const handleSave = () => {
    updatePreferences(preferences);
    toast({
      title: 'Preferences saved',
      description: 'Your display preferences have been updated successfully.'
    });
  };

  const handleReset = () => {
    setPreferences(defaultPreferences!);
    toast({
      title: 'Preferences reset',
      description: 'Your display preferences have been reset to default values.'
    });
  };

  const FormatPreview = ({ value }: { value: number }) => {
    const { currency, decimal_length, number_format } = preferences;
    const formatter = new Intl.NumberFormat(CurrencyCode[currency as keyof typeof CurrencyCode], {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimal_length,
      maximumFractionDigits: decimal_length
    });
    return formatter.format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Preferences</CardTitle>
          <CardDescription>Customize how financial data is displayed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-row justify-between">
            <Label htmlFor="theme" className="flex items-center gap-2 text-lg">
              <span className="flex justify-center border p-2 rounded-lg">
                <SunMoon className="h-6 w-6" />
              </span>
              Theme
            </Label>
            <div>
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <Label htmlFor="currency" className="flex items-center gap-2 text-lg">
              <span className="flex justify-center border p-2 rounded-lg">
                <Globe className="h-6 w-6" />
              </span>
              Currency
            </Label>
            <Select value={preferences.currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger id="currency" className="w-52">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row justify-between">
            <Label htmlFor="decimalLength" className="flex items-center gap-2 text-lg">
              <span className="flex justify-center border p-2 rounded-lg">
                <Hash className="w-6 h-6" />
              </span>
              Decimal Length:
              <span className="ml-1 text-muted-foreground font-semibold">
                {preferences.decimal_length}
              </span>
            </Label>
            <Slider
              id="decimalLength"
              min={0}
              max={4}
              step={1}
              value={[preferences.decimal_length]}
              onValueChange={handleDecimalLengthChange}
              className="w-52"
            />
          </div>

          <div className="p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <p className="text-2xl font-bold">
              <FormatPreview value={1234567.89} />
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
