import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Admin save endpoint. Verifies the admin password, then commits the updated
 * follower count to public/site-data.json in the repo via the GitHub Contents
 * API. The commit triggers a Vercel redeploy, after which the public site picks
 * up the new value from /site-data.json.
 *
 * Required env vars (set in Vercel → Settings → Environment Variables):
 *   ADMIN_PASSWORD     – the shared admin password
 *   GITHUB_REPO_TOKEN  – fine-grained PAT with Contents: Read & Write on the repo
 * Optional:
 *   GITHUB_REPO        – "owner/name" (defaults to this repo)
 *   GITHUB_BRANCH      – branch to commit to (defaults to "main")
 */
const DATA_PATH = 'public/site-data.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const ghToken = process.env.GITHUB_REPO_TOKEN;
  const repo = process.env.GITHUB_REPO || 'aroonthorat/chemistry-fundamentals-app1';
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured on the server' });
  }
  if (!ghToken) {
    return res.status(500).json({ error: 'GITHUB_REPO_TOKEN is not configured on the server' });
  }

  // Body may arrive as a parsed object or a raw string depending on runtime
  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const password = body?.password;
  const followers = Number(body?.followers);
  const views = Number(body?.views ?? 0);

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  if (!Number.isFinite(followers) || followers < 0) {
    return res.status(400).json({ error: 'followers must be a non-negative number' });
  }
  if (!Number.isFinite(views) || views < 0) {
    return res.status(400).json({ error: 'views must be a non-negative number' });
  }

  const content = JSON.stringify(
    { 
      followers: Math.round(followers), 
      views: Math.round(views),
      updatedAt: new Date().toISOString() 
    },
    null,
    2,
  ) + '\n';

  const apiBase = `https://api.github.com/repos/${repo}/contents/${DATA_PATH}`;
  const ghHeaders = {
    Authorization: `Bearer ${ghToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'chemistry-fundamentals-admin',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // Get the current file SHA (required to update an existing file)
    let sha: string | undefined;
    const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers: ghHeaders });
    if (getRes.ok) {
      const cur = (await getRes.json()) as { sha?: string };
      sha = cur.sha;
    } else if (getRes.status !== 404) {
      const errText = await getRes.text();
      console.error('GitHub get-file failed:', getRes.status, errText);
      return res.status(502).json({ error: `GitHub read failed (${getRes.status})` });
    }

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Update follower count to ${Math.round(followers)} and views to ${Math.round(views)} via admin panel`,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error('GitHub commit failed:', putRes.status, errText);
      return res.status(502).json({ error: `GitHub commit failed (${putRes.status})` });
    }

    return res.json({ ok: true, followers: Math.round(followers), views: Math.round(views) });
  } catch (err) {
    console.error('Admin save failed:', err);
    return res.status(500).json({ error: 'Save failed' });
  }
}

function safeParse(s: string): { password?: string; followers?: unknown; views?: unknown } | undefined {
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
}
