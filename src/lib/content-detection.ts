export interface ContentPattern {
  type: string;
  pattern: RegExp;
  suggestedTool: string;
  toolName: string;
  confidence: number;
  description: string;
}

export const CONTENT_PATTERNS: ContentPattern[] = [
  {
    type: 'json',
    pattern: /^\s*[\{\[]/,
    suggestedTool: 'json-formatter',
    toolName: 'JSON Formatter',
    confidence: 0.9,
    description: 'Looks like JSON data',
  },
  {
    type: 'base64',
    pattern: /^[A-Za-z0-9+/]{20,}={0,2}$/,
    suggestedTool: 'base64',
    toolName: 'Base64 Encoder/Decoder',
    confidence: 0.7,
    description: 'Looks like Base64 encoded data',
  },
  {
    type: 'url',
    pattern: /^https?:\/\/.+/,
    suggestedTool: 'url-encoder',
    toolName: 'URL Encoder/Decoder',
    confidence: 0.8,
    description: 'Looks like a URL',
  },
  {
    type: 'hex-color',
    pattern: /^#[0-9A-Fa-f]{6}$/,
    suggestedTool: 'color-picker',
    toolName: 'Color Picker',
    confidence: 0.95,
    description: 'Looks like a hex color code',
  },
  {
    type: 'rgb-color',
    pattern: /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
    suggestedTool: 'color-picker',
    toolName: 'Color Picker',
    confidence: 0.95,
    description: 'Looks like an RGB color',
  },
  {
    type: 'markdown',
    pattern: /^#{1,6}\s+.+|^\*\*.+\*\*|^\[.+\]\(.+\)/m,
    suggestedTool: 'markdown-previewer',
    toolName: 'Markdown Previewer',
    confidence: 0.85,
    description: 'Looks like Markdown text',
  },
  {
    type: 'html',
    pattern: /^<[a-z][\s\S]*>/i,
    suggestedTool: 'code-minifier',
    toolName: 'Code Minifier',
    confidence: 0.8,
    description: 'Looks like HTML code',
  },
  {
    type: 'css',
    pattern: /^[.#]?[\w-]+\s*\{[\s\S]*\}/,
    suggestedTool: 'code-minifier',
    toolName: 'Code Minifier',
    confidence: 0.75,
    description: 'Looks like CSS code',
  },
  {
    type: 'encoded-url',
    pattern: /%[0-9A-Fa-f]{2}/,
    suggestedTool: 'url-encoder',
    toolName: 'URL Encoder/Decoder',
    confidence: 0.85,
    description: 'Looks like URL-encoded text',
  },
];

export interface DetectionResult {
  pattern: ContentPattern;
  input: string;
}

export function detectContent(input: string): DetectionResult | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const trimmed = input.trim();

  // Try each pattern in order of confidence
  const sortedPatterns = [...CONTENT_PATTERNS].sort((a, b) => b.confidence - a.confidence);

  for (const pattern of sortedPatterns) {
    if (pattern.pattern.test(trimmed)) {
      return {
        pattern,
        input: trimmed,
      };
    }
  }

  return null;
}

export function detectContentType(input: string): string | null {
  const result = detectContent(input);
  return result ? result.pattern.type : null;
}

export function getSuggestedTool(input: string): string | null {
  const result = detectContent(input);
  return result ? result.pattern.suggestedTool : null;
}

// Validation helpers
export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    line?: number;
    column?: number;
    message: string;
    suggestion?: string;
  }>;
}

export function validateJSON(input: string): ValidationResult {
  try {
    JSON.parse(input);
    return { valid: true, errors: [] };
  } catch (error) {
    const err = error as Error;
    const match = err.message.match(/position (\d+)/);
    const position = match ? parseInt(match[1]) : 0;
    
    // Calculate line and column
    const lines = input.substring(0, position).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    return {
      valid: false,
      errors: [
        {
          line,
          column,
          message: err.message,
          suggestion: 'Check for missing commas, brackets, or quotes',
        },
      ],
    };
  }
}

export function validateBase64(input: string): ValidationResult {
  const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
  
  if (!base64Pattern.test(input.trim())) {
    return {
      valid: false,
      errors: [
        {
          message: 'Invalid Base64 format',
          suggestion: 'Base64 should only contain A-Z, a-z, 0-9, +, /, and = for padding',
        },
      ],
    };
  }

  return { valid: true, errors: [] };
}

export function validateURL(input: string): ValidationResult {
  try {
    new URL(input);
    return { valid: true, errors: [] };
  } catch {
    return {
      valid: false,
      errors: [
        {
          message: 'Invalid URL format',
          suggestion: 'URL should start with http:// or https://',
        },
      ],
    };
  }
}

export function validateHexColor(input: string): ValidationResult {
  const hexPattern = /^#[0-9A-Fa-f]{6}$/;
  
  if (!hexPattern.test(input.trim())) {
    return {
      valid: false,
      errors: [
        {
          message: 'Invalid hex color format',
          suggestion: 'Hex color should be in format #RRGGBB (e.g., #3b82f6)',
        },
      ],
    };
  }

  return { valid: true, errors: [] };
}
