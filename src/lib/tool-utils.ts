// JSON Formatter and Validator
export function formatJSON(input: string): { formatted: string; error: string | null } {
  try {
    const parsed = JSON.parse(input);
    return {
      formatted: JSON.stringify(parsed, null, 2),
      error: null
    };
  } catch (error) {
    return {
      formatted: '',
      error: error instanceof Error ? error.message : 'Invalid JSON'
    };
  }
}

export function validateJSON(input: string): { valid: boolean; error: string | null } {
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON'
    };
  }
}

// Base64 Encoder/Decoder
export function encodeBase64(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch (error) {
    throw new Error('Failed to encode to Base64');
  }
}

export function decodeBase64(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (error) {
    throw new Error('Failed to decode from Base64');
  }
}

// URL Encoder/Decoder
export function encodeURL(input: string): string {
  return encodeURIComponent(input);
}

export function decodeURL(input: string): string {
  try {
    return decodeURIComponent(input);
  } catch (error) {
    throw new Error('Failed to decode URL');
  }
}

// Code Minifier
export function minifyHTML(input: string): string {
  return input
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

export function minifyCSS(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();
}

export function minifyJS(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
    .trim();
}

// Color Converter
export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function convertColor(input: string): ColorFormats | null {
  // Try to parse as HEX
  if (/^#?[a-f\d]{6}$/i.test(input)) {
    const hex = input.startsWith('#') ? input : `#${input}`;
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return {
        hex,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      };
    }
  }

  // Try to parse as RGB
  const rgbMatch = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    const hsl = rgbToHsl(r, g, b);
    return {
      hex: rgbToHex(r, g, b),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    };
  }

  // Try to parse as HSL
  const hslMatch = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]);
    const s = parseInt(hslMatch[2]);
    const l = parseInt(hslMatch[3]);
    const rgb = hslToRgb(h, s, l);
    return {
      hex: rgbToHex(rgb.r, rgb.g, rgb.b),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`
    };
  }

  return null;
}

// Calculate file size
export function calculateSize(text: string): number {
  return new Blob([text]).size;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
