import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { JsonForm } from "./components/JsonForm";
import { RenderedOutput } from "./components/RenderedOutput";
import { fetchJsonData } from "./lib/utils";

export default function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [renderedOutput, setRenderedOutput] = useState(null);
  const [renderType, setRenderType] = useState("html");
  const [jsonInput, setJsonInput] = useState("");

  async function onSubmit(values) {
    setLoading(true);
    setStatus("");
    setRenderedOutput(null);

    try {
      let jsonData = values.jsonData;
      if (values.url) {
        const fetchedData = await fetchJsonData(values.url);
        jsonData = JSON.stringify(fetchedData, null, 2);
        setJsonInput(jsonData);
        setStatus("Data fetched successfully");
      }

      // Only try to parse if we have JSON data from either source
      if (jsonData) {
        const parsedJson = JSON.parse(jsonData);
        setRenderedOutput(JSON.stringify(parsedJson, null, 2));
        setRenderType(values.renderType);
        setStatus("JSON rendered successfully");
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            <JsonForm
              onSubmit={onSubmit}
              loading={loading}
              jsonInput={jsonInput}
              setJsonInput={setJsonInput}
            />
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
          <RenderedOutput output={renderedOutput} renderType={renderType} />
        )}
      </div>
    </div>
  );
}
