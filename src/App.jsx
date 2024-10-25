import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";

import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

export default function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [renderedOutput, setRenderedOutput] = useState(null);

  const form = useForm({
    defaultValues: {
      url: "",
      jsonData: "",
      renderType: "html",
    },
  });

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              JSON Renderer
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Fetch, input, and render JSON data as HTML or Markdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/data"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL to fetch JSON data, or leave blank to input
                        manually
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jsonData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>JSON Data</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='{"key": "value"}'
                          className="font-mono"
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter valid JSON data or edit fetched data
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="renderType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Render As</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select render type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="markdown">Markdown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose how to render the JSON output
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Render JSON"}
                </Button>
              </form>
            </Form>
          </CardContent>
          {status && (
            <CardFooter>
              <Alert
                variant={status.startsWith("Error") ? "destructive" : "default"}
                className="w-full"
              >
                <AlertTitle>
                  {status.startsWith("Error") ? "Error" : "Success"}
                </AlertTitle>
                <AlertDescription>{status}</AlertDescription>
              </Alert>
            </CardFooter>
          )}
        </Card>
        {renderedOutput && (
          <Card>
            <CardHeader>
              <CardTitle>Rendered Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-md border overflow-auto max-h-[60vh]">
                {form.getValues("renderType") === "html" ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {renderedOutput}
                  </pre>
                ) : (
                  <ReactMarkdown className="prose max-w-none">
                    {renderedOutput}
                  </ReactMarkdown>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
