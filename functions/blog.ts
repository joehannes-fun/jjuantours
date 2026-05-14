export async function onRequest(context: { request: Request; env: Record<string, string>; }) {
  const { request, env } = context;
  const url = new URL(request.url);
  const locale = String(url.searchParams.get('locale') || 'en').toLowerCase();
  const binId = locale === 'es' ? env.VITE_JSONBIN_BLOG_ES : env.VITE_JSONBIN_BLOG_EN;
  const masterKey = env.VITE_JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    return new Response(JSON.stringify({ error: 'Blog bin ID or master key is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiUrl = `https://api.jsonbin.io/v3/b/${binId}/latest`;
  const response = await fetch(apiUrl, {
    headers: {
      'X-Master-Key': masterKey,
    },
    cache: 'no-cache',
  });

  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
