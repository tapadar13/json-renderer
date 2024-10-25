import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const renderAsHTML = (jsonData) => {
  try {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

    // Convert JSON to HTML
    const generateHTML = (obj) => {
      if (typeof obj !== "object" || obj === null) {
        return String(obj);
      }

      if (Array.isArray(obj)) {
        return `
          <ul class="list-disc pl-6">
            ${obj.map((item) => `<li>${generateHTML(item)}</li>`).join("")}
          </ul>
        `;
      }

      return `
        <div class="space-y-2">
          ${Object.entries(obj)
            .map(
              ([key, value]) => `
            <div class="mb-2">
              <span class="font-semibold">${key}:</span>
              <span class="ml-2">${generateHTML(value)}</span>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    };

    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: generateHTML(data) }}
      />
    );
  } catch (error) {
    return (
      <div className="text-red-500">Error rendering HTML: {error.message}</div>
    );
  }
};

const renderAsMarkdown = (jsonData) => {
  try {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

    // Convert JSON to Markdown
    const generateMarkdown = (obj, level = 0) => {
      if (typeof obj !== "object" || obj === null) {
        return String(obj);
      }
      if (Array.isArray(obj)) {
        return obj
          .map((item) => `- ${generateMarkdown(item, level + 1)}`)
          .join("\n");
      }

      return Object.entries(obj)
        .map(([key, value]) => {
          const heading = "#".repeat(level + 1);
          return `${heading} ${key}\n${generateMarkdown(value, level + 1)}`;
        })
        .join("\n\n");
    };

    return (
      <ReactMarkdown className="prose max-w-none">
        {generateMarkdown(data)}
      </ReactMarkdown>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        Error rendering Markdown: {error.message}
      </div>
    );
  }
};

export function RenderedOutput({ output, renderType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendered Output</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-md border overflow-auto max-h-[60vh]">
          {renderType === "html"
            ? renderAsHTML(output)
            : renderAsMarkdown(output)}
        </div>
      </CardContent>
    </Card>
  );
}
