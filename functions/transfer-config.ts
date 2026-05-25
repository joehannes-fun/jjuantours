export async function onRequest(context: { request: Request; env: Record<string, string>; }) {
  const { request, env } = context;
  const binId = env.VITE_JSONBIN_TRANSFER_BIN_ID;
  const masterKey = env.VITE_JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    return new Response(JSON.stringify({ error: 'Transfer bin ID or master key is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiUrl = request.method === 'GET'
    ? `https://api.jsonbin.io/v3/b/${binId}/latest`
    : `https://api.jsonbin.io/v3/b/${binId}`;

  const headers: Record<string, string> = {
    'X-Master-Key': masterKey,
  };

  if (request.method !== 'GET') {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(apiUrl, {
      method: request.method,
      headers,
      body: request.method === 'GET' ? undefined : await request.text(),
    });

    const responseBody = await response.text();
    const responseHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    return new Response(responseBody, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
