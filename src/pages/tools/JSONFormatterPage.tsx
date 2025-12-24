import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { formatJSON, validateJSON } from '@/lib/tool-utils';
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';
import { detectContent } from '@/lib/content-detection';
import { SmartSuggestionBanner } from '@/components/ui/smart-suggestion-banner';

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [suggestion, setSuggestion] = useState<{ toolName: string; toolPath: string; description: string } | null>(null);
  const { toast } = useToast();

  const handleInputChange = (value: string) => {
    setInput(value);
    
    // Detect content type and suggest tools
    if (value.trim().length > 10) {
      const detection = detectContent(value);
      if (detection && detection.pattern.suggestedTool !== 'json-formatter') {
        setSuggestion({
          toolName: detection.pattern.toolName,
          toolPath: `/tools/${detection.pattern.suggestedTool}`,
          description: detection.pattern.description,
        });
      } else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }
  };

  const handleFormat = () => {
    const result = formatJSON(input);
    if (result.error) {
      setError(result.error);
      setOutput('');
    } else {
      setError(null);
      setOutput(result.formatted);
    }
  };

  const handleValidate = () => {
    const result = validateJSON(input);
    if (result.valid) {
      toast({
        title: 'Valid JSON',
        description: 'Your JSON is valid!',
        className: 'bg-success text-success-foreground',
      });
      setError(null);
    } else {
      setError(result.error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'JSON copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  React.useEffect(() => {
    if (input) {
      handleFormat();
    } else {
      setOutput('');
      setError(null);
    }
  }, [input]);

  return (
    <ToolPageLayout toolId="json-formatter" toolName="JSON Formatter & Validator">
      <div className="max-w-6xl mx-auto space-y-6">
        <p className="text-muted-foreground">
          Format and validate JSON with real-time syntax highlighting and error detection
        </p>

        {suggestion && (
          <SmartSuggestionBanner
            toolName={suggestion.toolName}
            toolPath={suggestion.toolPath}
            description={suggestion.description}
            onDismiss={() => setSuggestion(null)}
          />
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Paste your JSON here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="font-mono text-sm min-h-[400px]"
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={handleFormat}>Format</Button>
                <Button onClick={handleValidate} variant="outline">
                  Validate
                </Button>
                <Button onClick={handleClear} variant="outline">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>Formatted JSON</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here"
                className="font-mono text-sm min-h-[400px] bg-muted"
              />
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleCopy}
                  disabled={!output}
                  variant="outline"
                >
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
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <ul>
              <li>Paste your JSON in the input field</li>
              <li>The JSON will be automatically formatted</li>
              <li>Click "Validate" to check if your JSON is valid</li>
              <li>Click "Copy" to copy the formatted JSON to clipboard</li>
              <li>Use "Clear" to reset both input and output</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
