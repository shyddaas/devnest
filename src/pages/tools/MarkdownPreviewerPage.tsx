import React, { useState } from 'react';
import { Copy, Check, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const defaultMarkdown = `# Welcome to Markdown Previewer

## Features

This is a **live** Markdown previewer with *real-time* rendering.

### Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

- Item 1
- Item 2
  - Nested item
  - Another nested item

### Links and Images

[Visit DevNest](/)

### Blockquotes

> This is a blockquote
> It can span multiple lines

### Tables

| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Copy    | ✅ |

---

Start editing to see your changes!`;

export default function MarkdownPreviewerPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Markdown copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  const renderMarkdown = (text: string) => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="font-mono text-sm">$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-border pl-4 italic my-4 text-muted-foreground">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-8 border-border" />');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-4">$1</ul>');

    // Tables
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim());
      const cellsHtml = cells.map(cell => `<td class="border border-border px-4 py-2">${cell.trim()}</td>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    });
    html = html.replace(/(<tr>.*<\/tr>)/s, '<table class="w-full border-collapse my-4">$1</table>');

    // Paragraphs
    html = html.split('\n\n').map(para => {
      if (para.startsWith('<') || para.trim() === '') return para;
      return `<p class="my-4">${para}</p>`;
    }).join('\n');

    return html;
  };

  return (
    <div className="container py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Markdown Previewer</h1>
          <p className="text-muted-foreground">
            Write Markdown with live preview rendering
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Editor</CardTitle>
              </div>
              <CardDescription>Write your Markdown here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Enter Markdown..."
                className="font-mono text-sm min-h-[600px]"
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={handleCopy} variant="outline">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button onClick={() => setMarkdown('')} variant="outline">
                  Clear
                </Button>
                <Button onClick={() => setMarkdown(defaultMarkdown)} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-success" />
                <CardTitle>Preview</CardTitle>
              </div>
              <CardDescription>Live rendered output</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none min-h-[600px] p-4 rounded-lg bg-muted overflow-auto"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Markdown Syntax Guide</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Headers</h4>
              <code className="block bg-muted p-2 rounded font-mono text-xs">
                # H1<br />
                ## H2<br />
                ### H3
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Emphasis</h4>
              <code className="block bg-muted p-2 rounded font-mono text-xs">
                *italic* or _italic_<br />
                **bold** or __bold__
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lists</h4>
              <code className="block bg-muted p-2 rounded font-mono text-xs">
                - Item 1<br />
                - Item 2<br />
                &nbsp;&nbsp;- Nested
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Links & Code</h4>
              <code className="block bg-muted p-2 rounded font-mono text-xs">
                [Link](url)<br />
                `inline code`<br />
                ```code block```
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
