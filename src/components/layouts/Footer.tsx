import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">DevNest</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              A production-ready, high-performance developer tools platform providing 
              essential utilities for developers worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/tools/json-formatter" className="hover:text-foreground transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link to="/tools/base64" className="hover:text-foreground transition-colors">
                  Base64 Encoder
                </Link>
              </li>
              <li>
                <Link to="/tools/regex-tester" className="hover:text-foreground transition-colors">
                  Regex Tester
                </Link>
              </li>
              <li>
                <Link to="/tools/color-picker" className="hover:text-foreground transition-colors">
                  Color Picker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 DevNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
