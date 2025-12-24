import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileJson, 
  Binary, 
  Search, 
  Link as LinkIcon, 
  FileCode, 
  Palette, 
  FileText,
  Home,
  Info,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { tools } from '@/lib/tools-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileJson,
  Binary,
  Search,
  Link: LinkIcon,
  FileCode,
  Palette,
  FileText,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={cn('w-64 border-r border-border bg-card', className)}>
      <ScrollArea className="h-full py-6 px-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <div className="space-y-1">
              <Link
                to="/"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive('/')
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/about"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive('/about')
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
              <Link
                to="/privacy"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive('/privacy')
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Shield className="h-4 w-4" />
                <span>Privacy Policy</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Developer Tools
            </h3>
            <div className="space-y-1">
              {tools.map((tool) => {
                const Icon = iconMap[tool.icon] || FileCode;
                return (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive(tool.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
