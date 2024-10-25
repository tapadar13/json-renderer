import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function RenderedOutput({ output, renderType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendered Output</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-md border overflow-auto max-h-[60vh]">
          {renderType === "html" ? (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {output}
            </pre>
          ) : (
            <ReactMarkdown className="prose max-w-none">{output}</ReactMarkdown>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
