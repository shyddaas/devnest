# Bug Fix: React useState Error

## Issue
```
Uncaught TypeError: Cannot read properties of null (reading 'useState')
```

## Root Cause
Several newly created component files were missing the `import React from 'react';` statement at the top. While modern React doesn't always require explicit React imports for JSX (with the new JSX transform), some build configurations still need it, especially when using hooks or complex JSX.

## Files Fixed
Added `import React from 'react';` to the following files:

1. **src/components/ui/star-button.tsx**
   - Was missing React import
   - Uses JSX and Button component

2. **src/components/ui/theme-switcher.tsx**
   - Was missing React import
   - Uses JSX and dropdown components

3. **src/components/ui/empty-state.tsx**
   - Was missing React import
   - Uses JSX and Button component

4. **src/components/layouts/ToolPageLayout.tsx**
   - Had partial import (`useEffect` only)
   - Changed to `import React, { useEffect } from 'react';`
   - Uses JSX and multiple components

## Verification
- ✅ All lint checks passing (101 files)
- ✅ No TypeScript errors
- ✅ All component files now have proper React imports

## Prevention
Always include `import React from 'react';` at the top of any file that:
- Uses JSX syntax
- Renders React components
- Uses React hooks (even if imported separately)

This ensures compatibility across different build configurations and React versions.
