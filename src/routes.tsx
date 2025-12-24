import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import JSONFormatterPage from './pages/tools/JSONFormatterPage';
import Base64Page from './pages/tools/Base64Page';
import RegexTesterPage from './pages/tools/RegexTesterPage';
import URLEncoderPage from './pages/tools/URLEncoderPage';
import CodeMinifierPage from './pages/tools/CodeMinifierPage';
import ColorPickerPage from './pages/tools/ColorPickerPage';
import MarkdownPreviewerPage from './pages/tools/MarkdownPreviewerPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />
  },
  {
    name: 'Privacy Policy',
    path: '/privacy',
    element: <PrivacyPage />
  },
  {
    name: 'JSON Formatter',
    path: '/tools/json-formatter',
    element: <JSONFormatterPage />
  },
  {
    name: 'Base64 Encoder/Decoder',
    path: '/tools/base64',
    element: <Base64Page />
  },
  {
    name: 'Regex Tester',
    path: '/tools/regex-tester',
    element: <RegexTesterPage />
  },
  {
    name: 'URL Encoder/Decoder',
    path: '/tools/url-encoder',
    element: <URLEncoderPage />
  },
  {
    name: 'Code Minifier',
    path: '/tools/code-minifier',
    element: <CodeMinifierPage />
  },
  {
    name: 'Color Picker',
    path: '/tools/color-picker',
    element: <ColorPickerPage />
  },
  {
    name: 'Markdown Previewer',
    path: '/tools/markdown-previewer',
    element: <MarkdownPreviewerPage />
  }
];

export default routes;
