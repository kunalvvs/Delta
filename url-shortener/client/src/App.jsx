import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [stats, setStats] = useState(null)

  const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')
  const canSubmit = useMemo(() => longUrl.trim().length > 0 && !loading, [longUrl, loading])

  async function onSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')
    setResult(null)
    setStats(null)
    try {
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, custom: custom || undefined })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to shorten')
      const baseForShort = API_BASE || window.location.origin
      const shortUrl = `${baseForShort.replace(/\/$/, '')}/${data.code}`
      setResult({ ...data, shortUrl })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    async function loadStats(code) {
      try {
        const r = await fetch(`${API_BASE}/api/stats/${code}`)
        if (!r.ok) return
        const s = await r.json()
        if (active) setStats(s)
      } catch {
        // ignore
      }
    }
    if (result?.code) loadStats(result.code)
    return () => { active = false }
  }, [result?.code])

  async function copy() {
    if (!result?.shortUrl) return
    try {
      await navigator.clipboard.writeText(result.shortUrl)
      alert('Copied!')
    } catch {
      alert('Copy failed')
    }
  }

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: 24 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0 24px' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'radial-gradient(circle at 30% 30%, #22c55e, #16a34a 40%, #065f46 75%)' }} />
        <div>
          <h1 style={{ margin: 0 }}>LinkMint</h1>
          <div style={{ color: '#9ca3af', fontSize: 12 }}>Shorten long URLs into neat, shareable links.</div>
        </div>
      </header>

      <div style={{ border: '1px solid #1f2937', borderRadius: 12, padding: 16 }}>
        <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
          <input
            type="url"
            placeholder="Paste a long URL, e.g. https://example.com/very/long/link"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #1f2937' }}
          />
          <button disabled={!canSubmit} type="submit" style={{ padding: '12px 16px', borderRadius: 10, border: 0, background: '#22c55e', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Shortening…' : 'Shorten'}
          </button>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
            <input
              type="text"
              placeholder="Optional custom code (a-z, A-Z, 0-9, _ , -)"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              pattern="[A-Za-z0-9_-]{3,30}"
              style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #1f2937' }}
            />
          </div>
        </form>

        {error && (
          <div style={{ marginTop: 12, color: '#ef4444' }}>{error}</div>
        )}

        {result && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #1f2937', padding: 12, borderRadius: 10 }}>
              <span>Short URL:</span>
              <a href={result.shortUrl} target="_blank" rel="noreferrer">
                {result.shortUrl}
              </a>
              <button type="button" onClick={copy} style={{ padding: '8px 12px', borderRadius: 8, border: 0, background: '#22c55e', fontWeight: 700, cursor: 'pointer' }}>Copy</button>
            </div>
            {stats && (
              <div style={{ marginTop: 8, color: '#9ca3af', fontSize: 12 }}>
                Created {new Date(stats.createdAt).toLocaleString()} · Clicks {stats.clicks}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
