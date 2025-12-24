export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  icon: string;
  popular?: boolean;
}

export const toolCategories = [
  'All Tools',
  'Formatters',
  'Encoders',
  'Testers',
  'Converters',
  'Minifiers'
];

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON with syntax highlighting',
    category: 'Formatters',
    path: '/tools/json-formatter',
    icon: 'FileJson',
    popular: true
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'Encoders',
    path: '/tools/base64',
    icon: 'Binary',
    popular: true
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with live matching',
    category: 'Testers',
    path: '/tools/regex-tester',
    icon: 'Search',
    popular: true
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URL strings',
    category: 'Encoders',
    path: '/tools/url-encoder',
    icon: 'Link'
  },
  {
    id: 'code-minifier',
    name: 'Code Minifier',
    description: 'Minify HTML, CSS, and JavaScript code',
    category: 'Minifiers',
    path: '/tools/code-minifier',
    icon: 'FileCode',
    popular: true
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and convert between formats',
    category: 'Converters',
    path: '/tools/color-picker',
    icon: 'Palette',
    popular: true
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Preview Markdown with live rendering',
    category: 'Formatters',
    path: '/tools/markdown-previewer',
    icon: 'FileText',
    popular: true
  }
];
