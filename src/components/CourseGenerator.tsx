import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Award } from "lucide-react";
import { marked } from "marked";

const DEFAULT_PROMPT = `Create a comprehensive, milestone-based course roadmap for the following topic, using only free online resources accessible on the internet through scraping or public APIs. Provide an engaging title, a short description, a clear list of course goals, and 4-8 milestone modules. For each module, give a title, learning objectives, and suggest at least two *free* resources (with URLs) to help master the module. Use markdown formatting.`;

export function CourseGenerator() {
  const [apiKey, setApiKey] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [courseMarkdown, setCourseMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCourseMarkdown("");
    if (!apiKey || apiKey.length < 10) {
      setError("Please enter a valid Gemini API key.");
      return;
    }
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + encodeURIComponent(apiKey), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: DEFAULT_PROMPT + "\n\nTopic: " + topic }]}
          ]
        }),
      });
      const json = await res.json();
      // Gemini returns the response in 'candidates'
      const answer = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!answer) {
        setError(
          "Failed to generate course. Check your API key, or try again later."
        );
      } else {
        setCourseMarkdown(answer);
      }
    } catch (err: any) {
      setError("Error: " + err.message || "Unknown error");
    }
    setLoading(false);
  };

  return (
    <section className="bg-csdark p-6 rounded-xl mb-12 shadow hover:shadow-[0_0_24px_rgba(74,227,181,0.07)] transition">
      <div className="flex items-center mb-3 gap-2">
        <BookOpen className="text-csgreen" size={24} />
        <h2 className="font-bold text-2xl">Generate Your Free Custom Course</h2>
      </div>
      <p className="mb-3 text-gray-400">
        Use Gemini AI to create a complete self-paced learning roadmap for any CS topic, including learning objectives, milestones, and the best free resources.
      </p>
      <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-stretch mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-300 mb-1" htmlFor="topic">What topic do you want to learn?</label>
          <Input
            id="topic"
            className="w-full bg-cssecondary border-csgreen"
            value={topic}
            placeholder="e.g. Web Security, Data Science, Rust..."
            onChange={e => setTopic(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-300 mb-1" htmlFor="gemini-api-key">
            Gemini API Key <span className="text-xs text-gray-400">(required, never stored)</span>
          </label>
          <Input
            id="gemini-api-key"
            value={apiKey}
            className="w-full bg-cssecondary border-csgreen"
            type="password"
            placeholder="Paste your Gemini API key here..."
            onChange={e => setApiKey(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <Button
          type="submit"
          className="self-end bg-csgreen text-black disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>
      {error && <div className="text-destructive mb-3">{error}</div>}
      {courseMarkdown && (
        <div className="bg-cssecondary rounded-lg p-6 overflow-x-auto mt-6">
          <Award className="inline text-csgreen mb-1 mr-2" />
          <span className="font-semibold text-lg">Course Plan</span>
          <div className="prose prose-invert max-w-none mt-4" dangerouslySetInnerHTML={{ __html: marked.parse(courseMarkdown) }} />
        </div>
      )}
    </section>
  );
}
