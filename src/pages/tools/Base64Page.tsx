import React, { useState } from 'react';
import { Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { encodeBase64, decodeBase64 } from '@/lib/tool-utils';

export default function Base64Page() {
  const [encodeInput, setEncodeInput] = useState('');
  const [encodeOutput, setEncodeOutput] = useState('');
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeOutput, setDecodeOutput] = useState('');
  const [copiedEncode, setCopiedEncode] = useState(false);
  const [copiedDecode, setCopiedDecode] = useState(false);
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const result = encodeBase64(encodeInput);
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
      const result = decodeBase64(decodeInput);
      setDecodeOutput(result);
    } catch (error) {
      toast({
        title: 'Decoding failed',
        description: error instanceof Error ? error.message : 'Invalid Base64 string',
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
        description: 'Encoded text copied to clipboard',
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
        description: 'Decoded text copied to clipboard',
      });
      setTimeout(() => setCopiedDecode(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Base64 Encoder/Decoder</h1>
          <p className="text-muted-foreground">
            Encode and decode Base64 strings instantly
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
                  <CardDescription>Enter text to encode</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    placeholder="Enter text to encode..."
                    className="font-mono text-sm min-h-[300px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleEncode}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Encode
                    </Button>
                    <Button onClick={() => setEncodeInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Base64 Output</CardTitle>
                  <CardDescription>Encoded result</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={encodeOutput}
                    readOnly
                    placeholder="Encoded Base64 will appear here"
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
                  <CardTitle>Base64 Input</CardTitle>
                  <CardDescription>Enter Base64 to decode</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    placeholder="Enter Base64 to decode..."
                    className="font-mono text-sm min-h-[300px]"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleDecode}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Decode
                    </Button>
                    <Button onClick={() => setDecodeInput('')} variant="outline">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Text Output</CardTitle>
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
            <CardTitle>About Base64</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
              It's commonly used for encoding data in emails, URLs, and data URIs.
            </p>
            <ul>
              <li>Switch between Encode and Decode tabs</li>
              <li>Enter your text or Base64 string</li>
              <li>Click the button to convert</li>
              <li>Copy the result to your clipboard</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
