import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../lib/schema";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect } from "react";

export function JsonForm({ onSubmit, loading, jsonInput, setJsonInput }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      jsonData: "",
      renderType: "html",
    },
  });

  // Update form when jsonInput changes
  useEffect(() => {
    form.setValue("jsonData", jsonInput);
  }, [jsonInput, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API URL</FormLabel>
              <FormControl>
                <Input placeholder="https://api.example.com/data" {...field} />
              </FormControl>
              <FormDescription>Enter a URL to fetch JSON data</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jsonData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JSON Data (Optional if URL provided)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='{"key": "value"}'
                  className="font-mono"
                  rows={8}
                  {...field}
                  value={jsonInput || field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setJsonInput(e.target.value);
                  }}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white dark:bg-gray-950">
                    <SelectValue placeholder="Select render type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-gray-950">
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
  );
}
