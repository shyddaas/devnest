const DAILY_TIPS = [
  "Use Ctrl+K (Cmd+K on Mac) to quickly access any tool without touching your mouse!",
  "Star your favorite tools for instant access from the sidebar and command palette.",
  "All your data is processed locally - nothing leaves your browser!",
  "Try different themes from the palette icon to match your coding environment.",
  "Recent tools are automatically sorted by usage frequency for faster access.",
  "The command palette supports fuzzy search - try typing 'jsf' to find JSON Formatter!",
  "Press Ctrl+D to quickly toggle between dark and light modes.",
  "Your tool usage statistics help organize your workspace more efficiently.",
  "Paste content directly into tools - we'll detect the format and suggest the right tool!",
  "All tools work offline - bookmark DevNest for instant access anytime.",
  "Use keyboard shortcuts to navigate faster: Tab, Enter, and Arrow keys work everywhere.",
  "The JSON Formatter automatically detects and highlights syntax errors.",
  "Base64 encoding is perfect for embedding images in CSS or HTML.",
  "Regular expressions can be tricky - use our Regex Tester to perfect your patterns!",
  "URL encoding is essential for passing special characters in query strings.",
  "Minify your code before deployment to reduce file sizes and improve load times.",
  "The Color Picker supports HEX, RGB, and HSL formats with instant conversion.",
  "Markdown Preview uses GitHub-style rendering for accurate documentation previews.",
  "Star tools you use frequently - they'll appear at the top of your favorites list.",
  "Your theme preference is saved locally and persists across sessions.",
  "The sidebar can be collapsed on mobile for more screen space.",
  "Copy buttons appear on all tool outputs for one-click clipboard access.",
  "Tool usage tracking helps you discover your most-used utilities.",
  "Dark mode reduces eye strain during long coding sessions.",
  "All tools are optimized for both desktop and mobile devices.",
  "The command palette remembers your recently used tools for quick access.",
  "Keyboard navigation works throughout the entire application.",
  "Your favorites and recent tools sync across browser tabs.",
  "The theme switcher shows color previews to help you choose the perfect look.",
  "Empty states provide helpful guidance when you're just getting started.",
];

export function getDailyTip(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
}
