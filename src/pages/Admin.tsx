import { useEffect, useState, type CSSProperties } from 'react';
import { RefreshCw, Save, Lock, Users, ExternalLink } from 'lucide-react';

/**
 * Admin panel — lives at an obscure route (see App.tsx) and is gated by a shared
 * password verified server-side. Lets the admin pull the live Facebook follower
 * count and save it to the stored site-data.json (committed to the repo, which
 * redeploys and updates the public site).
 */
type Status = { kind: 'idle' | 'ok' | 'err' | 'busy'; msg?: string };

export default function Admin() {
  const [password, setPassword] = useState('');
  const [followers, setFollowers] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [current, setCurrent] = useState<{ followers: number; views: number; updatedAt: string } | null>(null);
  const [refreshStatus, setRefreshStatus] = useState<Status>({ kind: 'idle' });
  const [saveStatus, setSaveStatus] = useState<Status>({ kind: 'idle' });

  // Load the currently stored value on mount
  useEffect(() => {
    fetch(`/site-data.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((d: { followers?: number; views?: number; updatedAt?: string }) => {
        const f = typeof d.followers === 'number' ? d.followers : 0;
        const v = typeof d.views === 'number' ? d.views : 0;
        setCurrent({ followers: f, views: v, updatedAt: d.updatedAt || '' });
        setFollowers(f);
        setViews(v);
      })
      .catch(() => {});
  }, []);

  const refreshFromFacebook = async () => {
    setRefreshStatus({ kind: 'busy', msg: 'Fetching live count from Facebook…' });
    try {
      const res = await fetch(`/api/fb-stats?fresh=1&t=${Date.now()}`);
      const data = (await res.json()) as { followers?: number; views?: number; error?: string };
      if (!res.ok || data.error) {
        setRefreshStatus({ kind: 'err', msg: data.error || `Facebook request failed (${res.status})` });
        // still surface any returned number as a hint
        if (typeof data.followers === 'number') setFollowers(data.followers);
        if (typeof data.views === 'number') setViews(data.views);
        return;
      }
      
      const hasFollowers = typeof data.followers === 'number';
      const hasViews = typeof data.views === 'number';

      if (hasFollowers) setFollowers(data.followers!);
      if (hasViews) setViews(data.views!);

      let msg = 'Live stats fetched successfully — click Save to publish.';
      if (hasFollowers && hasViews) {
        msg = `Live stats: ${data.followers!.toLocaleString()} followers & ${data.views!.toLocaleString()} views — click Save to publish.`;
      } else if (hasFollowers) {
        msg = `Live followers: ${data.followers!.toLocaleString()} — click Save to publish.`;
      }
      setRefreshStatus({ kind: 'ok', msg });
    } catch {
      setRefreshStatus({ kind: 'err', msg: 'Network error contacting /api/fb-stats' });
    }
  };

  const save = async () => {
    if (!password) {
      setSaveStatus({ kind: 'err', msg: 'Enter the admin password first.' });
      return;
    }
    setSaveStatus({ kind: 'busy', msg: 'Saving…' });
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, followers, views }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; followers?: number; views?: number };
      if (!res.ok || !data.ok) {
        setSaveStatus({ kind: 'err', msg: data.error || `Save failed (${res.status})` });
        return;
      }
      
      const savedFollowers = data.followers ?? followers;
      const savedViews = data.views ?? views;

      setSaveStatus({
        kind: 'ok',
        msg: `Saved ${savedFollowers.toLocaleString()} followers & ${savedViews.toLocaleString()} views. The site is redeploying — the new values go live in ~1 minute.`,
      });
      setCurrent({ 
        followers: savedFollowers, 
        views: savedViews, 
        updatedAt: new Date().toISOString() 
      });
    } catch {
      setSaveStatus({ kind: 'err', msg: 'Network error contacting /api/admin/save' });
    }
  };

  const statusColor = (s: Status) =>
    s.kind === 'ok' ? 'var(--cf-acid)' : s.kind === 'err' ? 'var(--cf-pink)' : 'var(--cf-text-secondary)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: 520, padding: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Lock size={22} style={{ color: 'var(--cf-cyan)' }} />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
            Admin <span className="text-gradient">Control</span>
          </h1>
        </div>
        <p style={{ color: 'var(--cf-text-secondary)', fontSize: '0.95rem', marginBottom: 28 }}>
          Update the public stats. Pull live numbers from Facebook, or enter them manually, then Save.
        </p>

        {/* Current stored value */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', marginBottom: 24,
            background: 'var(--cf-surface-2)', border: '1px solid var(--cf-border)', borderRadius: 'var(--r-sm)',
          }}
        >
          <Users size={18} style={{ color: 'var(--cf-cyan)' }} />
          <div>
            <div style={{ fontWeight: 700 }}>
              {current ? `${current.followers.toLocaleString()} followers & ${current.views.toLocaleString()} views` : '—'} <span style={{ color: 'var(--cf-text-secondary)', fontWeight: 500 }}>currently published</span>
            </div>
            {current?.updatedAt && (
              <div style={{ fontSize: '0.78rem', color: 'var(--cf-text-muted)' }}>
                Last updated {new Date(current.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Password */}
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--cf-text-secondary)', marginBottom: 6 }}>Admin password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={inputStyle}
        />

        {/* Followers value */}
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--cf-text-secondary)', margin: '18px 0 6px' }}>Follower count</label>
        <input
          type="number"
          min={0}
          value={followers}
          onChange={(e) => setFollowers(Number(e.target.value))}
          style={inputStyle}
        />

        {/* Page Views value */}
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--cf-text-secondary)', margin: '18px 0 6px' }}>Page views (rolling 28 days)</label>
        <input
          type="number"
          min={0}
          value={views}
          onChange={(e) => setViews(Number(e.target.value))}
          style={inputStyle}
        />

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
          <button onClick={refreshFromFacebook} disabled={refreshStatus.kind === 'busy'} className="btn btn-secondary" style={{ flex: 1, minWidth: 200 }}>
            <RefreshCw size={18} style={{ animation: refreshStatus.kind === 'busy' ? 'orbit 1s linear infinite' : undefined }} />
            Refresh from Facebook
          </button>
          <button onClick={save} disabled={saveStatus.kind === 'busy'} className="btn btn-primary" style={{ flex: 1, minWidth: 160 }}>
            <Save size={18} /> Save
          </button>
        </div>

        {/* Status messages */}
        {refreshStatus.msg && (
          <p style={{ marginTop: 16, fontSize: '0.85rem', color: statusColor(refreshStatus) }}>{refreshStatus.msg}</p>
        )}
        {saveStatus.msg && (
          <p style={{ marginTop: 8, fontSize: '0.85rem', color: statusColor(saveStatus) }}>{saveStatus.msg}</p>
        )}

        <a
          href="https://developers.facebook.com/tools/debug/accesstoken"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 24, fontSize: '0.78rem', color: 'var(--cf-text-muted)' }}
        >
          Check Facebook token expiry <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 'var(--r-sm)',
  background: 'var(--cf-surface-2)',
  border: '1px solid var(--cf-border)',
  color: 'var(--cf-text-primary)',
  fontSize: '1rem',
  fontFamily: 'inherit',
};
