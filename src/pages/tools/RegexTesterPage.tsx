import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const commonPatterns = [
  { name: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
  { name: 'Phone (US)', pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$' },
  { name: 'Hex Color', pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$' },
  { name: 'IPv4', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$' },
  { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join('');
      
      const regex = new RegExp(pattern, flagString);
      
      if (flags.g) {
        const allMatches: RegExpMatchArray[] = [];
        let match;
        const globalRegex = new RegExp(pattern, flagString);
        while ((match = globalRegex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === globalRegex.lastIndex) {
            globalRegex.lastIndex++;
          }
        }
        setMatches(allMatches);
      } else {
        const match = testString.match(regex);
        setMatches(match ? [match] : []);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
      setMatches([]);
    }
  }, [pattern, testString, flags]);

  const handlePatternSelect = (selectedPattern: string) => {
    setPattern(selectedPattern);
  };

  const highlightMatches = () => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      if (match.index !== undefined) {
        parts.push(testString.substring(lastIndex, match.index));
        parts.push(
          <span key={i} className="bg-primary/20 text-primary font-semibold">
            {match[0]}
          </span>
        );
        lastIndex = match.index + match[0].length;
      }
    });

    parts.push(testString.substring(lastIndex));
    return parts;
  };

  return (
    <div className="container py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Regex Tester</h1>
          <p className="text-muted-foreground">
            Test regular expressions with live match highlighting
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Regular Expression</CardTitle>
            <CardDescription>Enter your regex pattern</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <span className="text-2xl text-muted-foreground">/</span>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="font-mono"
              />
              <span className="text-2xl text-muted-foreground">/</span>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-g"
                  checked={flags.g}
                  onCheckedChange={(checked) => setFlags({ ...flags, g: checked as boolean })}
                />
                <Label htmlFor="flag-g" className="text-sm font-mono">
                  g (global)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-i"
                  checked={flags.i}
                  onCheckedChange={(checked) => setFlags({ ...flags, i: checked as boolean })}
                />
                <Label htmlFor="flag-i" className="text-sm font-mono">
                  i (case insensitive)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-m"
                  checked={flags.m}
                  onCheckedChange={(checked) => setFlags({ ...flags, m: checked as boolean })}
                />
                <Label htmlFor="flag-m" className="text-sm font-mono">
                  m (multiline)
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Patterns</CardTitle>
            <CardDescription>Click to use a common regex pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {commonPatterns.map((p) => (
                <Button
                  key={p.name}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePatternSelect(p.pattern)}
                >
                  {p.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test String</CardTitle>
            <CardDescription>Enter text to test against the pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test..."
              className="font-mono text-sm min-h-[200px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Results
              {matches.length > 0 && (
                <Badge className="ml-2" variant="default">
                  {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Matches are highlighted below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted min-h-[200px] font-mono text-sm whitespace-pre-wrap break-words">
              {highlightMatches()}
            </div>

            {matches.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-sm">Match Details:</h4>
                {matches.map((match, i) => (
                  <div key={i} className="text-sm p-2 rounded bg-muted">
                    <span className="font-semibold">Match {i + 1}:</span>{' '}
                    <span className="font-mono">{match[0]}</span>
                    {match.index !== undefined && (
                      <span className="text-muted-foreground ml-2">
                        (index: {match.index})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
