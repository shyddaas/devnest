import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, TrendingUp, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tools } from '@/lib/tools-data';
import { useFavorites } from '@/hooks/use-favorites';
import { useUsageTracking } from '@/hooks/use-usage-tracking';
import { EmptyState } from '@/components/ui/empty-state';
import { getDailyTip } from '@/lib/daily-tips';

export default function HomePage() {
  const { favorites } = useFavorites();
  const { getRecentTools, getWeeklyStats } = useUsageTracking();

  const recentToolIds = getRecentTools(6);
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));
  const recentTools = tools.filter(tool => recentToolIds.includes(tool.id));
  const weeklyStats = getWeeklyStats();
  const dailyTip = getDailyTip();

  const mostUsedTool = tools.find(t => t.id === weeklyStats.mostUsedTool);

  return (
    <div className="container py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Smart Developer Workspace
          </div>
          <h1 className="text-4xl xl:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">DevNest</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy-first developer toolkit with 7 essential utilities.
            All processing happens locally in your browser.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/tools/json-formatter">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Daily Tip */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              💡 Daily Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{dailyTip}</p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        {weeklyStats.totalActions > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{weeklyStats.totalActions}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tool actions performed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Most Used Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {mostUsedTool && (
                    <>
                      {React.createElement(mostUsedTool.icon, { className: "h-5 w-5 text-primary" })}
                      <div className="text-lg font-semibold">{mostUsedTool.name}</div>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {weeklyStats.toolUsage[weeklyStats.mostUsedTool] || 0} times
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{favorites.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tools starred
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Favorites Section */}
        {favoriteTools.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Star className="h-6 w-6 text-primary fill-primary" />
                Your Favorites
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {favoriteTools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <Link key={tool.id} to={tool.path}>
                    <Card className="hover:border-primary transition-all hover:shadow-lg group">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            {React.createElement(ToolIcon, { className: "h-6 w-6 text-primary" })}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                          </div>
                          <Star className="h-5 w-5 text-primary fill-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Tools Section */}
        {recentTools.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Recently Used
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {recentTools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <Link key={tool.id} to={tool.path}>
                    <Card className="hover:border-primary transition-all hover:shadow-lg group">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            {React.createElement(ToolIcon, { className: "h-6 w-6 text-primary" })}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All Tools Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              All Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tools.map((tool) => {
              const ToolIcon = tool.icon;
              const isFavorite = favorites.includes(tool.id);
              return (
                <Link key={tool.id} to={tool.path}>
                  <Card className="hover:border-primary transition-all hover:shadow-lg group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          {React.createElement(ToolIcon, { className: "h-6 w-6 text-primary" })}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </div>
                        {isFavorite && (
                          <Star className="h-4 w-4 text-primary fill-primary" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Empty State for First Time Users */}
        {favorites.length === 0 && recentTools.length === 0 && (
          <Card className="mt-8">
            <CardContent className="py-12">
              <EmptyState
                icon={Star}
                title="Welcome to DevNest!"
                description="Start by exploring our tools. Star your favorites for quick access, and we'll track your most-used utilities to personalize your experience."
                action={{
                  label: 'Explore Tools',
                  onClick: () => {
                    const element = document.querySelector('a[href="/tools/json-formatter"]');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  },
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
