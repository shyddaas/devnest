import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Search, Menu, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { tools } from '@/lib/tools-data';
import { useFavorites } from '@/hooks/use-favorites';
import { useUsageTracking } from '@/hooks/use-usage-tracking';
import { fuzzySearch } from '@/lib/fuzzy-search';

interface TopNavigationProps {
  onMenuClick: () => void;
}

export function TopNavigation({ onMenuClick }: TopNavigationProps) {
  const { toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { getRecentTools } = useUsageTracking();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recentToolIds = getRecentTools(5);
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));
  const recentTools = tools.filter(tool => recentToolIds.includes(tool.id));

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Ctrl+D for theme toggle
      if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleTheme]);

  const handleToolSelect = (path: string) => {
    setOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  // Filter tools based on search query
  const filteredTools = searchQuery
    ? fuzzySearch(searchQuery, tools, (tool) => `${tool.name} ${tool.description}`, 20)
        .map(result => result.item)
    : tools;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden mr-2"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">
              DevNest
            </span>
          </Link>

          <div className="flex-1 px-4">
            <Button
              variant="outline"
              className="w-full max-w-sm justify-start text-muted-foreground"
              onClick={() => setOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search tools...</span>
              <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          <div className="flex items-center ml-auto space-x-2">
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search tools and commands..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>

          {favoriteTools.length > 0 && (
            <>
              <CommandGroup heading="⭐ Favorites">
                {favoriteTools.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <CommandItem
                      key={tool.id}
                      onSelect={() => handleToolSelect(tool.path)}
                      className="cursor-pointer"
                    >
                      <Star className="mr-2 h-4 w-4 fill-primary text-primary" />
                      <span>{tool.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {recentTools.length > 0 && !searchQuery && (
            <>
              <CommandGroup heading="🕐 Recent">
                {recentTools.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <CommandItem
                      key={tool.id}
                      onSelect={() => handleToolSelect(tool.path)}
                      className="cursor-pointer"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{tool.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading="🔧 All Tools">
            {filteredTools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <CommandItem
                  key={tool.id}
                  onSelect={() => handleToolSelect(tool.path)}
                  className="cursor-pointer"
                >
                  {React.createElement(ToolIcon, { className: "mr-2 h-4 w-4" })}
                  <div className="flex flex-col">
                    <span>{tool.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
