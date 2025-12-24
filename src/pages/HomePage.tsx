import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { tools } from '@/lib/tools-data';
import {
  FileJson,
  Binary,
  Search,
  Link as LinkIcon,
  FileCode,
  Palette,
  FileText,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileJson,
  Binary,
  Search,
  Link: LinkIcon,
  FileCode,
  Palette,
  FileText,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const popularTools = tools.filter(tool => tool.popular);

  const filteredTools = searchQuery
    ? tools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-6xl font-bold tracking-tight">
              Developer Tools for{' '}
              <span className="text-primary">Modern Developers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A production-ready, high-performance platform providing essential utilities
              for developers worldwide. Fast, secure, and always free.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 justify-center items-center">
            <Link to="/tools/json-formatter">
              <Button size="lg" className="text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border">
              <Zap className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground text-center">
                Instant results with optimized performance
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border">
              <Shield className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Privacy First</h3>
              <p className="text-sm text-muted-foreground text-center">
                All processing happens locally in your browser
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border">
              <Gauge className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Production Ready</h3>
              <p className="text-sm text-muted-foreground text-center">
                Built with modern tech for reliability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Popular Tools</h2>
            <p className="text-muted-foreground">
              Most used developer utilities
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {popularTools.map((tool) => {
              const Icon = iconMap[tool.icon] || FileCode;
              return (
                <Link key={tool.id} to={tool.path}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                      </div>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Tools Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">All Tools</h2>
            <p className="text-muted-foreground">
              Search and explore all available tools
            </p>
            <div className="max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredTools.map((tool) => {
              const Icon = iconMap[tool.icon] || FileCode;
              return (
                <Link key={tool.id} to={tool.path}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
