import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai/providers";

export async function POST(request: Request) {
  if (process.env.AI_PROVIDER !== "mock" && (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.trim() === "sk-ant-...")) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const body: unknown = await request.json();
    const businessIdea =
      typeof body === "object" && body !== null && "businessIdea" in body
        ? String((body as { businessIdea?: unknown }).businessIdea ?? "")
        : "";

    if (!businessIdea.trim()) {
      return NextResponse.json({ error: "businessIdea is required." }, { status: 400 });
    }

    const provider = getProvider();
    const siteConfig = await provider.generateSiteConfig(businessIdea);
    return NextResponse.json({ siteConfig });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown generation error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
