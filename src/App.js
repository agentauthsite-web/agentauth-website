import { useEffect, useRef, useState } from 'react';
import DemoAnimation from './DemoAnimation';

function AgentMonitor({ isDark }) {
  const [scores, setScores] = useState([94, 87, 62, 31]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScores(prev => prev.map((s, i) => {
        if (i === 2) return Math.max(20, Math.min(80, s + (Math.random() - 0.5) * 8));
        if (i === 3) return Math.max(10, Math.min(45, s + (Math.random() - 0.5) * 5));
        return Math.max(80, Math.min(99, s + (Math.random() - 0.5) * 3));
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { name: 'support-agent-01', status: 'active', action: 'Reading CRM data' },
    { name: 'analytics-bot', status: 'active', action: 'Processing reports' },
    { name: 'email-agent-03', status: 'warning', action: 'Unusual API calls' },
    { name: 'data-agent-07', status: 'danger', action: 'Access revoked' },
  ];

  const getColor = (s) => s > 80 ? '#10b981' : s > 50 ? '#f59e0b' : '#ef4444';
  const getStatusColor = (s) => ({ active: '#10b981', warning: '#f59e0b', danger: '#ef4444' }[s]);
  const textColor = isDark ? '#e2e8f0' : '#0f0f1a';
  const mutedColor = isDark ? '#666' : '#888';

  return (
    <div style={{
      background: `rgba(${isDark ? '255,255,255,0.06' : '255,255,255,0.65'})`,
      border: `1px solid rgba(255,255,255,${isDark ? '0.15' : '0.8'})`,
      borderRadius: '24px', padding: '24px',
      backdropFilter: 'blur(40px) saturate(180%)',
      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
      boxShadow: `0 8px 32px rgba(0,0,0,${isDark ? '0.3' : '0.1'}), inset 0 1px 0 rgba(255,255,255,${isDark ? '0.15' : '0.9'})`,
      maxWidth: '520px', margin: '0 auto', position: 'relative', overflow: 'hidden'
    }}>
      {/* Glass shine */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: `linear-gradient(180deg, rgba(255,255,255,${isDark ? '0.08' : '0.4'}) 0%, transparent 100%)`, borderRadius: '24px 24px 0 0', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: textColor, letterSpacing: '1px' }}>AGENTAUTH MONITOR</span>
        </div>
        <span style={{ fontSize: '11px', color: mutedColor, fontFamily: 'monospace' }}>{new Date().toLocaleTimeString()}</span>
      </div>
      {agents.map((agent, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
          borderRadius: '14px',
          background: i === 3 ? 'rgba(239,68,68,0.08)' : i === 2 ? 'rgba(245,158,11,0.08)' : `rgba(255,255,255,${isDark ? '0.04' : '0.5'})`,
          border: `1px solid ${i === 3 ? 'rgba(239,68,68,0.25)' : i === 2 ? 'rgba(245,158,11,0.2)' : `rgba(255,255,255,${isDark ? '0.08' : '0.7'})`}`,
          marginBottom: '10px', transition: 'all 0.5s',
          backdropFilter: 'blur(10px)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,${isDark ? '0.05' : '0.5'})`
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(agent.status), boxShadow: `0 0 6px ${getStatusColor(agent.status)}`, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: textColor, fontFamily: 'monospace' }}>{agent.name}</div>
            <div style={{ fontSize: '11px', color: mutedColor, marginTop: '2px' }}>{agent.action}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: getColor(scores[i]), textShadow: `0 0 10px ${getColor(scores[i])}`, fontFamily: 'monospace', transition: 'all 0.5s' }}>{Math.round(scores[i])}</div>
            <div style={{ fontSize: '10px', color: mutedColor, letterSpacing: '1px' }}>TRUST</div>
          </div>
          <div style={{ width: '60px', flexShrink: 0 }}>
            <div style={{ height: '4px', background: `rgba(${isDark ? '255,255,255,0.08' : '0,0,0,0.1'})`, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${scores[i]}%`, background: `linear-gradient(90deg, ${getColor(scores[i])}, ${getColor(scores[i])}88)`, borderRadius: '2px', transition: 'width 0.5s ease', boxShadow: `0 0 6px ${getColor(scores[i])}` }} />
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', gap: '10px', backdropFilter: 'blur(10px)' }}>
        <span style={{ fontSize: '16px' }}>🚨</span>
        <div>
          <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '700' }}>ALERT: data-agent-07 revoked</div>
          <div style={{ fontSize: '11px', color: mutedColor, marginTop: '2px' }}>Unusual database access pattern detected</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState('dark');
  const canvasRef = useRef(null);
  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? '#080810' : '#e8eaff',
    text: isDark ? '#ffffff' : '#0a0a1a',
    subtext: isDark ? '#aaa' : '#44446a',
    muted: isDark ? '#666' : '#7777aa',
    glassAlpha: isDark ? '0.07' : '0.55', // used in CSS vars
    glassBorder: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)',
    glassShine: isDark ? '0.08' : '0.45',
    navBg: isDark ? 'rgba(8,8,16,0.7)' : 'rgba(240,241,255,0.7)',
    sectionBorder: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.1)',
    shadow: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(99,102,241,0.12)',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1, pulse: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const op = isDark ? 1 : 0.4;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const pr = p.r + Math.sin(p.pulse) * 0.5;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 5);
        g.addColorStop(0, `rgba(99,102,241,${p.opacity * op})`);
        g.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, pr * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${(p.opacity + 0.2) * op})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 150) * 0.2 * op})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [isDark]);

  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % 6), 2000);
    return () => clearInterval(t);
  }, []);



  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", color: colors.text, overflowX: 'hidden', transition: 'all 0.5s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes scanLine { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes borderGlow { 0%,100% { box-shadow: 0 0 20px rgba(99,102,241,0.15); } 50% { box-shadow: 0 0 30px rgba(99,102,241,0.3); } }

        .hero-text { animation: fadeUp 0.8s ease forwards; }
        .hero-sub { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
        .hero-btns { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }

        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 200% 200%;
          animation: gradientMove 4s ease infinite;
        }

        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 36px;
          box-shadow: var(--glass-shadow);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(180deg, var(--glass-shine) 0%, transparent 100%);
          border-radius: 24px 24px 0 0;
          pointer-events: none;
        }
        .glass-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
        }
        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--glass-shadow-hover);
          border-color: rgba(99,102,241,0.4);
        }

        .glass-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 36px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          color: var(--text);
          font-size: 16px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3);
          position: relative; overflow: hidden;
        }
        .glass-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
          pointer-events: none;
        }
        .glass-btn:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.18);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35);
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff; padding: 16px 36px; border-radius: 50px;
          text-decoration: none; font-weight: 700; font-size: 16px;
          border: none; cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
          position: relative; overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .nav-link {
          color: var(--muted);
          text-decoration: none; font-size: 14px; font-weight: 500;
          transition: all 0.2s; padding: 6px 14px; border-radius: 50px;
        }
        .nav-link:hover {
          color: #6366f1;
          background: rgba(99,102,241,0.08);
        }

        .section-label {
          color: #6366f1; font-size: 12px; letter-spacing: 4px;
          text-transform: uppercase; font-weight: 600; margin-bottom: 20px;
        }

        .stat-card {
          text-align: center; padding: 40px 28px;
          flex: 1; min-width: 200px;
          transition: all 0.4s;
        }
        .stat-card:hover { transform: translateY(-6px); }

        .step-card { flex: 1; min-width: 260px; padding: 40px; }

        .floating { animation: float 6s ease-in-out infinite; }

        .theme-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          color: var(--text);
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.3s;
        }
        .theme-btn:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
        }

        .waitlist-input {
          padding: 18px 28px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          color: var(--text); font-size: 16px;
          width: 320px; outline: none;
          font-family: Inter, sans-serif;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.3s;
        }
        .waitlist-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.1);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .waitlist-input::placeholder { color: var(--muted); }

        .trust-badge {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 20px; border-radius: 50px;
          font-size: 13px; transition: all 0.3s;
        }
        .trust-badge:hover { transform: translateY(-2px); }
      `}</style>

      {/* CSS Variables */}
      <style>{`
        :root {
          --text: ${colors.text};
          --subtext: ${colors.subtext};
          --muted: ${colors.muted};
          --glass-bg: rgba(255,255,255,${colors.glassAlpha});
          --glass-border: ${colors.glassBorder};
          --glass-shine: rgba(255,255,255,${colors.glassShine});
          --glass-shadow: 0 8px 32px ${colors.shadow}, inset 0 1px 0 rgba(255,255,255,${colors.glassShine});
          --glass-shadow-hover: 0 20px 60px ${colors.shadow}, inset 0 1px 0 rgba(255,255,255,${parseFloat(colors.glassShine) + 0.1});
        }
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

      {/* Colorful Orbs */}
      <div style={{ position: 'fixed', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(80px)', background: `rgba(99,102,241,${isDark ? '0.35' : '0.25'})`, top: '-150px', left: '-150px', pointerEvents: 'none', zIndex: 0, animation: 'pulse 8s ease infinite' }} />
      <div style={{ position: 'fixed', width: '400px', height: '400px', borderRadius: '50%', filter: 'blur(80px)', background: `rgba(139,92,246,${isDark ? '0.3' : '0.2'})`, top: '20%', right: '-100px', pointerEvents: 'none', zIndex: 0, animation: 'pulse 8s ease infinite 2s' }} />
      <div style={{ position: 'fixed', width: '350px', height: '350px', borderRadius: '50%', filter: 'blur(80px)', background: `rgba(16,185,129,${isDark ? '0.2' : '0.15'})`, bottom: '10%', left: '10%', pointerEvents: 'none', zIndex: 0, animation: 'pulse 8s ease infinite 4s' }} />
      <div style={{ position: 'fixed', width: '300px', height: '300px', borderRadius: '50%', filter: 'blur(80px)', background: `rgba(239,68,68,${isDark ? '0.15' : '0.1'})`, bottom: '-50px', right: '20%', pointerEvents: 'none', zIndex: 0, animation: 'pulse 8s ease infinite 6s' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Navbar — Glass pill */}
        <nav style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 32px',
          margin: '16px 32px 0',
          borderRadius: '100px',
          background: `rgba(255,255,255,${isDark ? '0.07' : '0.6'})`,
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: `1px solid ${colors.glassBorder}`,
          boxShadow: `0 8px 32px ${colors.shadow}, inset 0 1px 0 rgba(255,255,255,${colors.glassShine})`,
          position: 'sticky', top: '16px', zIndex: 100,
          transition: 'all 0.5s'
        }}>
          <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-1px' }}>
            Agent<span className="gradient-text">Auth</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['#how', '#features', '#demo', '#waitlist'].map((href, i) => (
              <a key={i} href={href} className="nav-link">
                {['How it works', 'Features', 'Demo', 'Waitlist'][i]}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="theme-btn" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
              {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'}
            </button>
            <a href="https://app.agentauth.site" className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '50px' }}>
              Get Started →
            </a>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '100px 20px 80px', maxWidth: '900px', margin: '0 auto' }}>
          <div className="hero-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '100px', padding: '10px 24px', fontSize: '13px', color: '#818cf8', marginBottom: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 4px 20px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.1)', animation: 'borderGlow 3s ease infinite' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            Now in private beta — limited spots available
          </div>

          <h1 className="hero-text" style={{ fontSize: '80px', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-3px', marginBottom: '32px' }}>
            <span style={{ color: colors.text }}>Identity &amp;<br />Authentication</span>
            <br />
            <span className="gradient-text">for AI Agents</span>
          </h1>

          <p className="hero-sub" style={{ fontSize: '20px', color: colors.subtext, lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 56px' }}>
            Every AI agent deserves a verified identity. Give your agents unique credentials, continuous behaviour monitoring, and instant revocation — built by an IAM engineer, for the AI era.
          </p>

          <div className="hero-btns" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <a href="https://app.agentauth.site" className="btn-primary">Get Started Free →</a>
            <a href="#demo" className="glass-btn" style={{ color: colors.text }}>See Live Demo</a>
          </div>

          <div className="hero-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🔐', text: 'Zero Trust', color: 'rgba(99,102,241,0.15)' },
              { icon: '⚡', text: 'Real-time', color: 'rgba(245,158,11,0.15)' },
              { icon: '🇬🇧', text: 'Built in UK', color: 'rgba(16,185,129,0.15)' },
              { icon: '🛡️', text: 'GDPR Safe', color: 'rgba(139,92,246,0.15)' },
            ].map((item, i) => (
              <div key={i} className="trust-badge glass-card" style={{ padding: '10px 20px', borderRadius: '50px', background: `rgba(255,255,255,${colors.glassAlpha})` }}>
                <span>{item.icon}</span>
                <span style={{ color: colors.subtext, fontSize: '13px' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '80px 60px', borderTop: `1px solid ${colors.sectionBorder}`, borderBottom: `1px solid ${colors.sectionBorder}` }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '60px' }}>The AI Agent Identity Crisis — 2026</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { number: '88%', label: 'of companies experienced AI agent security incidents in 2026', color: '#ef4444' },
              { number: '109x', label: 'more machine identities than human identities in enterprises', color: '#f59e0b' },
              { number: '22%', label: 'of teams actually treat AI agents as proper identities', color: '#6366f1' },
              { number: '#2', label: 'CISO priority for 2026 — AI agent identity assurance', color: '#10b981' },
            ].map((stat, i) => (
              <div key={i} className="stat-card glass-card">
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`, opacity: 0.8 }} />
                <div style={{ fontSize: '52px', fontWeight: '900', color: stat.color, marginBottom: '16px', textShadow: `0 0 30px ${stat.color}50`, letterSpacing: '-2px' }}>{stat.number}</div>
                <div style={{ fontSize: '14px', color: colors.muted, lineHeight: '1.7' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Monitor */}
        <div style={{ padding: '120px 60px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p className="section-label">Live product preview</p>
              <h2 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', color: colors.text, marginBottom: '20px' }}>See it in action</h2>
              <p style={{ color: colors.subtext, fontSize: '18px', lineHeight: '1.8', marginBottom: '32px' }}>
                Watch TrustScores update in real time as agents behave — and see instant revocation when anomalies are detected.
              </p>
              {[
                { icon: '🟢', text: 'Green — agent behaving normally' },
                { icon: '🟡', text: 'Yellow — unusual activity detected' },
                { icon: '🔴', text: 'Red — access automatically revoked' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.muted, fontSize: '15px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>{item.text}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: '320px' }} className="floating">
              <AgentMonitor isDark={isDark} />
            </div>
          </div>
        </div>

        {/* Demo */}
        <div id="demo" style={{ padding: '120px 60px', maxWidth: '1100px', margin: '0 auto', borderTop: `1px solid ${colors.sectionBorder}` }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p className="section-label">How to use it</p>
            <h2 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', color: colors.text, marginBottom: '20px' }}>Step by step walkthrough</h2>
            <p style={{ color: colors.subtext, fontSize: '18px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>From registering your first agent to instant revocation in 5 simple steps</p>
          </div>
          <DemoAnimation />
        </div>

        {/* How it works */}
        <div id="how" style={{ padding: '120px 60px', maxWidth: '1100px', margin: '0 auto', borderTop: `1px solid ${colors.sectionBorder}` }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p className="section-label">How it works</p>
            <h2 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', color: colors.text, marginBottom: '20px' }}>Connect. Secure. Relax.</h2>
            <p style={{ color: colors.subtext, fontSize: '18px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Three steps to secure ALL your AI agents across any platform</p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { step: '01', icon: '🔌', title: 'Connect your agents', desc: 'Bring your existing AI agents from any platform. Enter your agent credentials and AgentAuth instantly shows them all in one unified dashboard.', color: '#6366f1' },
              { step: '02', icon: '🛡️', title: 'Set MFA & security rules', desc: 'Choose how your agents authenticate — fingerprint, push notification or OTP. Set auto-lock thresholds so AgentAuth protects them 24/7.', color: '#8b5cf6' },
              { step: '03', icon: '😌', title: 'Relax — we handle the rest', desc: 'AgentAuth monitors all your agents in real time. If anything looks wrong — agent is locked instantly and you get alerted immediately.', color: '#a78bfa' },
            ].map((item, i) => (
              <div key={i} className="step-card glass-card">
                <div style={{ position: 'absolute', top: '32px', right: '32px', fontSize: '80px', fontWeight: '900', color: 'rgba(99,102,241,0.05)', lineHeight: 1 }}>{item.step}</div>
                <div style={{ fontSize: '32px', marginBottom: '24px', width: '60px', height: '60px', background: `rgba(255,255,255,0.1)`, border: `1px solid rgba(255,255,255,0.2)`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>{item.icon}</div>
                <div style={{ fontSize: '11px', color: item.color, fontWeight: '700', letterSpacing: '3px', marginBottom: '16px' }}>STEP {item.step}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', color: colors.text }}>{item.title}</h3>
                <p style={{ color: colors.subtext, fontSize: '15px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{ padding: '120px 60px', borderTop: `1px solid ${colors.sectionBorder}`, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p className="section-label">Features</p>
            <h2 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', color: colors.text }}>Everything agents need</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { icon: '📊', title: 'Universal Dashboard', desc: 'See ALL your AI agents in one place regardless of which platform they run on. One unified view for everything.', color: '#6366f1' },
              { icon: '🛡️', title: 'MFA for Agents', desc: 'Protect your agents with fingerprint, push notification or OTP. No attacker can access your agent even if they steal the credentials.', color: '#8b5cf6' },
              { icon: '📡', title: 'Live TrustScore', desc: 'Every agent gets a real-time TrustScore from 0-100. Watch it update live as your agent works. Drop below threshold = auto-lock.', color: '#f59e0b' },
              { icon: '🚨', title: 'Auto-lock & Alerts', desc: 'AgentAuth detects suspicious behaviour and auto-locks the agent instantly. You get an email and phone alert the moment it happens.', color: '#ef4444' },
              { icon: '📋', title: 'Full Audit Trail', desc: 'Every action logged. Every API call recorded. Every permission granted. Complete compliance visibility across all your agents.', color: '#10b981' },
              { icon: '🌐', title: 'Cross-platform', desc: 'Works with any AI agent platform — cloud hosted, open source or custom built. One platform to secure them all.', color: '#a78bfa' },
            ].map((f, i) => (
              <div key={i} className="glass-card" style={{ borderColor: activeFeature === i ? `${f.color}50` : undefined, background: activeFeature === i ? `rgba(255,255,255,${parseFloat(colors.glassAlpha) + 0.04})` : undefined }}>
                <div style={{ fontSize: '28px', marginBottom: '24px', width: '60px', height: '60px', background: `${f.color}15`, border: `1px solid ${f.color}30`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>{f.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: colors.text }}>{f.title}</h3>
                <p style={{ color: colors.subtext, fontSize: '14px', lineHeight: '1.8' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Waitlist */}
        <div id="waitlist" style={{ padding: '140px 20px', textAlign: 'center', borderTop: `1px solid ${colors.sectionBorder}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)', pointerEvents: 'none', animation: 'pulse 6s ease infinite' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '100px', padding: '10px 24px', fontSize: '13px', color: '#818cf8', marginBottom: '32px', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              Private Beta — Limited spots
            </div>
            <h2 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-2.5px', marginBottom: '24px', color: colors.text, lineHeight: '1.1' }}>
              Secure your agents<br />
              <span className="gradient-text">before it's too late</span>
            </h2>
            <p style={{ color: colors.subtext, marginBottom: '56px', fontSize: '18px', maxWidth: '440px', margin: '0 auto 56px', lineHeight: '1.7' }}>
              One platform to monitor, secure and authenticate ALL your AI agents.
            </p>
            <a href="https://app.agentauth.site" className="btn-primary" style={{ fontSize: '18px', padding: '18px 48px', borderRadius: '50px', textDecoration: 'none' }}>
              Get Started Free →
            </a>
            <p style={{ marginTop: '28px', color: colors.muted, fontSize: '13px' }}>No credit card required. Free to start.</p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ padding: '48px 60px', borderTop: `1px solid ${colors.sectionBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px' }}>
            Agent<span className="gradient-text">Auth</span>
          </div>
          <div style={{ color: colors.muted, fontSize: '13px' }}>© 2026 AgentAuth · Identity for AI Agents · Built in the UK 🇬🇧</div>
          <div style={{ fontSize: '13px' }}>
            <span style={{ color: colors.muted }}>Built by </span>
            <a href="https://www.linkedin.com/in/manohar-reddy-yandapalli-5998b3212/" target="_blank" rel="noreferrer" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>
              Manohar Reddy — ForgeRock Certified IAM Engineer
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}