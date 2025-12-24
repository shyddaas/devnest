import React, { useState } from 'react';
import { Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { encodeURL, decodeURL } from '@/lib/tool-utils';

export default function URLEncoderPage() {
  const [encodeInput, setEncodeInput] = useState('');
  const [encodeOutput, setEncodeOutput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeOutput, setDecodeOutput] = useState('');
  const [copiedEncode, setCopiedEncode] = useState(false);
  const [copiedDecode, setCopiedDecode] = useState(false);
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const result = encodeURL(encodeInput);
      setEncodeOutput(result);
    } catch (error) {
      toast({
        title: 'Encoding failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURL(decodeInput);
      setDecodeOutput(result);
    } catch (error) {
      toast({
        title: 'Decoding failed',
        description: error instanceof Error ? error.message : 'Invalid URL encoding',
        variant: 'destructive',
      });
    }
  };

  const handleCopyEncode = async () => {
    try {
      await navigator.clipboard.writeText(encodeOutput);
      setCopiedEncode(true);
      toast({
        title: 'Copied!',
        description: 'Encoded URL copied to clipboard',
      });
      setTimeout(() => setCopiedEncode(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  const handleCopyDecode = async () => {
    try {
      await navigator.clipboard.writeText(decodeOutput);
      setCopiedDecode(true);
      toast({
        title: 'Copied!',
        description: 'Decoded URL copied to clipboard',
      });
      setTimeout(() => setCopiedDecode(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  React.useEffect(() => {
    if (encodeInput) {
      handleEncode();
    } else {
      setEncodeOutput('');
    }
  }, [encodeInput]);

  React.useEffect(() => {
    if (decodeInput) {
      handleDecode();
    } else {
      setDecodeOutput('');
    }
  }, [decodeInput]);

  return (
    <div className="container py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">URL Encoder/Decoder</h1>
          <p className="text-muted-foreground">
            Encode and decode URL strings for safe transmission
          </p>
        </div>

        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                  <CardDescription>Enter text to URL encode</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    placeholder="Enter text to encode..."
                    className="font-mono text-sm min-h-[300px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => setEncodeInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>URL Encoded Output</CardTitle>
                  <CardDescription>Encoded result</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={encodeOutput}
                    readOnly
                    placeholder="Encoded URL will appear here"
                    className="font-mono text-sm min-h-[300px] bg-muted"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={handleCopyEncode}
                      disabled={!encodeOutput}
                      variant="outline"
                    >
                      {copiedEncode ? (
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

          <TabsContent value="decode" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>URL Encoded Input</CardTitle>
                  <CardDescription>Enter URL encoded text to decode</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    placeholder="Enter URL encoded text to decode..."
                    className="font-mono text-sm min-h-[300px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => setDecodeInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Decoded Output</CardTitle>
                  <CardDescription>Decoded result</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={decodeOutput}
                    readOnly
                    placeholder="Decoded text will appear here"
                    className="font-mono text-sm min-h-[300px] bg-muted"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={handleCopyDecode}
                      disabled={!decodeOutput}
                      variant="outline"
                    >
                      {copiedDecode ? (
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
            <CardTitle>About URL Encoding</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              URL encoding converts characters into a format that can be transmitted over the Internet.
              Special characters are replaced with a percent sign (%) followed by two hexadecimal digits.
            </p>
            <ul>
              <li>Spaces become %20</li>
              <li>Special characters like &, =, ? are encoded</li>
              <li>Useful for query parameters and form data</li>
              <li>Automatically encodes/decodes as you type</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
