import React from 'react';
import { Code2, Zap, Shield, Globe, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Code2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">About DevNest</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, high-performance developer tools platform built for developers, by developers.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              DevNest was created to provide developers worldwide with instant access to essential
              development utilities. We believe that developer tools should be fast, reliable, and
              accessible to everyone without barriers.
            </p>
            <p>
              Our platform processes everything locally in your browser, ensuring your data remains
              private and secure. No servers, no tracking, no data collection—just pure functionality
              when you need it.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built with modern web technologies for instant results. All processing happens
                locally in your browser with zero latency.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Privacy First</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your data never leaves your device. All tools run entirely in your browser,
                ensuring complete privacy and security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle>Always Available</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deployed on edge networks for global availability. Access your tools from
                anywhere, anytime, with 99.9% uptime.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                <CardTitle>Free Forever</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No subscriptions, no paywalls, no hidden costs. DevNest is and will always
                be completely free for everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>JSON Formatter & Validator</strong>
                  <p className="text-sm text-muted-foreground">
                    Format and validate JSON with real-time error detection
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Base64 Encoder/Decoder</strong>
                  <p className="text-sm text-muted-foreground">
                    Encode and decode Base64 strings instantly
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Regex Tester</strong>
                  <p className="text-sm text-muted-foreground">
                    Test regular expressions with live match highlighting
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>URL Encoder/Decoder</strong>
                  <p className="text-sm text-muted-foreground">
                    Encode and decode URL strings for safe transmission
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Code Minifier</strong>
                  <p className="text-sm text-muted-foreground">
                    Minify HTML, CSS, and JavaScript to reduce file size
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Color Picker & Converter</strong>
                  <p className="text-sm text-muted-foreground">
                    Pick colors and convert between HEX, RGB, and HSL formats
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Markdown Previewer</strong>
                  <p className="text-sm text-muted-foreground">
                    Write Markdown with live preview rendering
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Built for Developers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              DevNest is designed with developers in mind. Every tool is crafted to be intuitive,
              fast, and reliable. We focus on the essentials—no bloat, no unnecessary features,
              just the tools you need to get your work done efficiently.
            </p>
            <p>
              Whether you're debugging JSON, testing regex patterns, or converting colors, DevNest
              provides a seamless experience across all devices. Our responsive design ensures you
              can work comfortably on desktop, tablet, or mobile.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to get started?</h3>
              <p className="text-muted-foreground">
                Explore our tools and boost your development workflow today.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
