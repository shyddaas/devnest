import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { convertColor, hexToRgb, rgbToHsl } from '@/lib/tool-utils';
import { Label } from '@/components/ui/label';

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3b82f6');
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbInput, setRgbInput] = useState('rgb(59, 130, 246)');
  const [hslInput, setHslInput] = useState('hsl(217, 91%, 60%)');
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);
  const [copiedHsl, setCopiedHsl] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    updateFormats(color);
  }, [color]);

  const updateFormats = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHexInput(hexColor);
      setRgbInput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setHslInput(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    }
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const converted = convertColor(value);
    if (converted) {
      setColor(converted.hex);
      setRgbInput(converted.rgb);
      setHslInput(converted.hsl);
    }
  };

  const handleRgbChange = (value: string) => {
    setRgbInput(value);
    const converted = convertColor(value);
    if (converted) {
      setColor(converted.hex);
      setHexInput(converted.hex);
      setHslInput(converted.hsl);
    }
  };

  const handleHslChange = (value: string) => {
    setHslInput(value);
    const converted = convertColor(value);
    if (converted) {
      setColor(converted.hex);
      setHexInput(converted.hex);
      setRgbInput(converted.rgb);
    }
  };

  const handleCopy = async (text: string, type: 'hex' | 'rgb' | 'hsl') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'hex') setCopiedHex(true);
      if (type === 'rgb') setCopiedRgb(true);
      if (type === 'hsl') setCopiedHsl(true);
      
      toast({
        title: 'Copied!',
        description: `${type.toUpperCase()} color copied to clipboard`,
      });
      
      setTimeout(() => {
        if (type === 'hex') setCopiedHex(false);
        if (type === 'rgb') setCopiedRgb(false);
        if (type === 'hsl') setCopiedHsl(false);
      }, 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Color Picker & Converter</h1>
          <p className="text-muted-foreground">
            Pick colors and convert between HEX, RGB, and HSL formats
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Color Picker</CardTitle>
            <CardDescription>Select a color using the picker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-6">
              <div
                className="w-full h-48 rounded-lg border-4 border-border shadow-lg transition-colors"
                style={{ backgroundColor: color }}
              />
              
              <div className="w-full max-w-md">
                <Label htmlFor="color-picker" className="mb-2 block">
                  Pick a color
                </Label>
                <input
                  id="color-picker"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-16 rounded-lg cursor-pointer border-2 border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Formats</CardTitle>
            <CardDescription>Convert between different color formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hex-input">HEX</Label>
              <div className="flex gap-2">
                <Input
                  id="hex-input"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono"
                  placeholder="#3b82f6"
                />
                <Button
                  onClick={() => handleCopy(hexInput, 'hex')}
                  variant="outline"
                  size="icon"
                >
                  {copiedHex ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rgb-input">RGB</Label>
              <div className="flex gap-2">
                <Input
                  id="rgb-input"
                  value={rgbInput}
                  onChange={(e) => handleRgbChange(e.target.value)}
                  className="font-mono"
                  placeholder="rgb(59, 130, 246)"
                />
                <Button
                  onClick={() => handleCopy(rgbInput, 'rgb')}
                  variant="outline"
                  size="icon"
                >
                  {copiedRgb ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hsl-input">HSL</Label>
              <div className="flex gap-2">
                <Input
                  id="hsl-input"
                  value={hslInput}
                  onChange={(e) => handleHslChange(e.target.value)}
                  className="font-mono"
                  placeholder="hsl(217, 91%, 60%)"
                />
                <Button
                  onClick={() => handleCopy(hslInput, 'hsl')}
                  variant="outline"
                  size="icon"
                >
                  {copiedHsl ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Colors</CardTitle>
            <CardDescription>Quick access to common colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 xl:grid-cols-8 gap-3">
              {[
                '#ef4444', '#f97316', '#f59e0b', '#eab308',
                '#84cc16', '#22c55e', '#10b981', '#14b8a6',
                '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
                '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
              ].map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className="w-full aspect-square rounded-lg border-2 border-border hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <ul>
              <li>Use the color picker to select any color visually</li>
              <li>Enter color values in HEX, RGB, or HSL format to convert</li>
              <li>Click the copy button next to any format to copy it</li>
              <li>Click on common colors for quick selection</li>
              <li>All formats update automatically when you change any value</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
