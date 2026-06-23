import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "..", "functions", "data");

const createErrorResponse = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const readLocalJson = (filename: string): unknown => {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

const saveToKV = async (
  env: Record<string, any>,
  key: string,
  payload: unknown,
) => {
  const dataKV = env.DATA_KV_M;
  if (!dataKV || typeof dataKV.put !== "function") {
    throw new Error(
      "DATA_KV_M namespace binding is not configured. Please bind a Cloudflare KV namespace to DATA_KV_M.",
    );
  }

  await dataKV.put(key, JSON.stringify(payload));
};

const RESOURCE_ENTRIES = [
  { resource: "brand", filename: "brand.json" },
  { resource: "transfer-config", filename: "transfer-config.json" },
  { resource: "social-media", filename: "social-media.json" },
  { resource: "testimonials", filename: "testimonials.json" },
  {
    resource: "blog",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `blog-${locale}.json`,
  },
  {
    resource: "tours",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `tours-${locale}.json`,
  },
  {
    resource: "transport-services",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `transport-services-${locale}.json`,
  },
  {
    resource: "example-tours",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `example-tours-${locale}.json`,
  },
  {
    resource: "story-elements",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `story-elements-${locale}.json`,
  },
  {
    resource: "intro-story",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `intro-story-${locale}.json`,
  },
  {
    resource: "translations",
    locales: ["en", "es"],
    filenameTemplate: (locale: string) => `translations-${locale}.json`,
  },
];

export async function onRequest(context: {
  request: Request;
  env: Record<string, any>;
}) {
  const { request, env } = context;
  const secretHeader = request.headers.get("x-init-secret") || "";
  const expectedSecret = env.INIT_DATA_SECRET;

  if (request.method !== "POST") {
    return createErrorResponse("Only POST requests are allowed.", 405);
  }

  if (!expectedSecret) {
    return createErrorResponse(
      "INIT_DATA_SECRET is not configured in Cloudflare environment.",
      500,
    );
  }

  if (secretHeader !== expectedSecret) {
    return createErrorResponse("Invalid initialization secret.", 401);
  }

  const dataKV = env.DATA_KV_M;
  if (!dataKV || typeof dataKV.put !== "function") {
    return createErrorResponse(
      "DATA_KV_M namespace binding is not configured. This initializer requires a Cloudflare KV namespace bound to DATA_KV_M.",
      500,
    );
  }

  const results: Array<{ key: string; status: string; message?: string }> = [];

  for (const entry of RESOURCE_ENTRIES) {
    try {
      if (entry.filename) {
        const payload = readLocalJson(entry.filename);
        await saveToKV(env, entry.resource, payload);
        results.push({ key: entry.resource, status: "stored" });
        continue;
      }

      for (const locale of entry.locales!) {
        const filename = entry.filenameTemplate!(locale);
        const resourceKey = `${entry.resource}-${locale}`;
        const payload = readLocalJson(filename);
        await saveToKV(env, resourceKey, payload);
        results.push({ key: resourceKey, status: "stored" });
      }
    } catch (error: any) {
      results.push({
        key: entry.filename || entry.resource,
        status: "error",
        message: String(error?.message || error),
      });
    }
  }

  return new Response(JSON.stringify({ success: true, results }, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
