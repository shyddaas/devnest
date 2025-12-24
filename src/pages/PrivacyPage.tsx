import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: December 24, 2025
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle>Your Privacy Matters</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              At DevNest, we take your privacy seriously. This Privacy Policy explains how we handle
              your data when you use our developer tools platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Processing</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h3>Local Processing Only</h3>
            <p>
              All tools on DevNest process data entirely in your browser. This means:
            </p>
            <ul>
              <li>Your data never leaves your device</li>
              <li>No data is sent to our servers</li>
              <li>No data is stored on our servers</li>
              <li>No data is shared with third parties</li>
            </ul>
            <p>
              When you use tools like the JSON Formatter, Base64 Encoder, or any other utility,
              all processing happens locally using JavaScript in your browser. We have no access
              to the data you input or process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <CardTitle>Local Storage</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h3>What We Store Locally</h3>
            <p>
              DevNest uses your browser's local storage to enhance your experience. The following
              data is stored locally on your device:
            </p>
            <ul>
              <li>
                <strong>Theme Preference:</strong> Your choice between light and dark mode
              </li>
              <li>
                <strong>Recently Used Tools:</strong> A list of tools you've recently accessed
                for quick navigation
              </li>
            </ul>
            <p>
              This data is stored only on your device and is never transmitted to our servers.
              You can clear this data at any time by clearing your browser's local storage or
              using your browser's privacy settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-primary" />
              <CardTitle>Analytics and Tracking</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h3>No Tracking</h3>
            <p>
              DevNest does not use any analytics, tracking, or monitoring tools. We do not:
            </p>
            <ul>
              <li>Track your usage patterns</li>
              <li>Collect personal information</li>
              <li>Use cookies for tracking</li>
              <li>Monitor your activity</li>
              <li>Share data with advertisers</li>
            </ul>
            <p>
              We believe in complete privacy. Your use of DevNest is entirely anonymous.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              DevNest is a static website hosted on edge networks (Vercel/Netlify). These hosting
              providers may collect basic server logs (IP addresses, request times) for security
              and performance purposes. However:
            </p>
            <ul>
              <li>We do not have access to these logs</li>
              <li>These logs are not used for tracking or analytics</li>
              <li>They are automatically deleted according to the hosting provider's policies</li>
            </ul>
            <p>
              We do not integrate any third-party services, APIs, or scripts that could track
              or collect your data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Since all data processing happens locally in your browser and we don't collect or
              store any data on our servers, your data security is entirely in your hands. We
              recommend:
            </p>
            <ul>
              <li>Using a secure, up-to-date browser</li>
              <li>Being cautious when using public or shared computers</li>
              <li>Clearing your browser data if using a shared device</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              DevNest is designed for developers and technical professionals. We do not knowingly
              collect any information from anyone, including children under 13. Since we don't
              collect any data at all, there is no risk of children's data being collected.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated "Last updated" date. Since we don't collect your contact
              information, we cannot notify you directly of changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Since we don't collect, store, or process any personal data on our servers, there
              is no data for you to access, modify, or delete. All data you input into our tools
              remains on your device and under your control.
            </p>
            <p>
              You have complete control over any locally stored preferences by managing your
              browser's local storage settings.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Summary</h3>
              <p className="text-muted-foreground">
                DevNest is built with privacy as a core principle. We don't collect, store, or
                share any of your data. All processing happens locally in your browser, ensuring
                complete privacy and security. Your data is yours, and it stays with you.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
