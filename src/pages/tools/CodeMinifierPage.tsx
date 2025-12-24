import React, { useState } from 'react';
import { Copy, Check, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { minifyHTML, minifyCSS, minifyJS, calculateSize, formatBytes } from '@/lib/tool-utils';
import { Badge } from '@/components/ui/badge';

export default function CodeMinifierPage() {
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [cssInput, setCssInput] = useState('');
  const [cssOutput, setCssOutput] = useState('');
  const [jsInput, setJsInput] = useState('');
  const [jsOutput, setJsOutput] = useState('');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedJs, setCopiedJs] = useState(false);
  const { toast } = useToast();

  const handleMinifyHTML = () => {
    const result = minifyHTML(htmlInput);
    setHtmlOutput(result);
  };

  const handleMinifyCSS = () => {
    const result = minifyCSS(cssInput);
    setCssOutput(result);
  };

  const handleMinifyJS = () => {
    const result = minifyJS(jsInput);
    setJsOutput(result);
  };

  const handleCopy = async (text: string, type: 'html' | 'css' | 'js') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'html') setCopiedHtml(true);
      if (type === 'css') setCopiedCss(true);
      if (type === 'js') setCopiedJs(true);
      
      toast({
        title: 'Copied!',
        description: 'Minified code copied to clipboard',
      });
      
      setTimeout(() => {
        if (type === 'html') setCopiedHtml(false);
        if (type === 'css') setCopiedCss(false);
        if (type === 'js') setCopiedJs(false);
      }, 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  const getSizeInfo = (input: string, output: string) => {
    const inputSize = calculateSize(input);
    const outputSize = calculateSize(output);
    const savings = inputSize > 0 ? ((inputSize - outputSize) / inputSize * 100).toFixed(1) : '0';
    
    return {
      inputSize: formatBytes(inputSize),
      outputSize: formatBytes(outputSize),
      savings: `${savings}%`
    };
  };

  return (
    <div className="container py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Code Minifier</h1>
          <p className="text-muted-foreground">
            Minify HTML, CSS, and JavaScript to reduce file size
          </p>
        </div>

        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>HTML Input</CardTitle>
                  <CardDescription>Paste your HTML code</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="<html>&#10;  <body>&#10;    <h1>Hello World</h1>&#10;  </body>&#10;</html>"
                    className="font-mono text-sm min-h-[400px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleMinifyHTML}>
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Minify
                    </Button>
                    <Button onClick={() => setHtmlInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Minified HTML</CardTitle>
                  <CardDescription>
                    {htmlOutput && (
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">
                          {getSizeInfo(htmlInput, htmlOutput).inputSize} → {getSizeInfo(htmlInput, htmlOutput).outputSize}
                        </Badge>
                        <Badge variant="default" className="bg-success">
                          Saved {getSizeInfo(htmlInput, htmlOutput).savings}
                        </Badge>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={htmlOutput}
                    readOnly
                    placeholder="Minified HTML will appear here"
                    className="font-mono text-sm min-h-[400px] bg-muted"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleCopy(htmlOutput, 'html')}
                      disabled={!htmlOutput}
                      variant="outline"
                    >
                      {copiedHtml ? (
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="css" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CSS Input</CardTitle>
                  <CardDescription>Paste your CSS code</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={cssInput}
                    onChange={(e) => setCssInput(e.target.value)}
                    placeholder="body {&#10;  margin: 0;&#10;  padding: 0;&#10;  font-family: Arial;&#10;}"
                    className="font-mono text-sm min-h-[400px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleMinifyCSS}>
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Minify
                    </Button>
                    <Button onClick={() => setCssInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Minified CSS</CardTitle>
                  <CardDescription>
                    {cssOutput && (
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">
                          {getSizeInfo(cssInput, cssOutput).inputSize} → {getSizeInfo(cssInput, cssOutput).outputSize}
                        </Badge>
                        <Badge variant="default" className="bg-success">
                          Saved {getSizeInfo(cssInput, cssOutput).savings}
                        </Badge>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={cssOutput}
                    readOnly
                    placeholder="Minified CSS will appear here"
                    className="font-mono text-sm min-h-[400px] bg-muted"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleCopy(cssOutput, 'css')}
                      disabled={!cssOutput}
                      variant="outline"
                    >
                      {copiedCss ? (
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="js" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>JavaScript Input</CardTitle>
                  <CardDescription>Paste your JavaScript code</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={jsInput}
                    onChange={(e) => setJsInput(e.target.value)}
                    placeholder="function hello() {&#10;  console.log('Hello World');&#10;  return true;&#10;}"
                    className="font-mono text-sm min-h-[400px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleMinifyJS}>
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Minify
                    </Button>
                    <Button onClick={() => setJsInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Minified JavaScript</CardTitle>
                  <CardDescription>
                    {jsOutput && (
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">
                          {getSizeInfo(jsInput, jsOutput).inputSize} → {getSizeInfo(jsInput, jsOutput).outputSize}
                        </Badge>
                        <Badge variant="default" className="bg-success">
                          Saved {getSizeInfo(jsInput, jsOutput).savings}
                        </Badge>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={jsOutput}
                    readOnly
                    placeholder="Minified JavaScript will appear here"
                    className="font-mono text-sm min-h-[400px] bg-muted"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleCopy(jsOutput, 'js')}
                      disabled={!jsOutput}
                      variant="outline"
                    >
                      {copiedJs ? (
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>About Code Minification</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Code minification removes unnecessary characters from source code without changing its functionality.
              This reduces file size and improves load times.
            </p>
            <ul>
              <li>Removes whitespace and line breaks</li>
              <li>Removes comments</li>
              <li>Reduces file size for faster loading</li>
              <li>Note: This is a basic minifier for demonstration purposes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
