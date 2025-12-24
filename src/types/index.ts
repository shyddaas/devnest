export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface User {
  id: string;
  email?: string;
  username?: string;
}

export interface Profile {
  id: string;
  username?: string;
  email?: string;
}
