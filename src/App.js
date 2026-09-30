import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import DemoAnimation from './DemoAnimation';

// Live Agent Monitor
function AgentMonitor() {
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

  const getColor = (score) => {
    if (score > 80) return '#10b981';
    if (score > 50) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusColor = (status) => {
    return { active: '#10b981', warning: '#f59e0b', danger: '#ef4444' }[status];
  };

  return (
    <div style={{
      background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(99,102,241,0.3)',
      borderRadius: '20px', padding: '24px', backdropFilter: 'blur(20px)',
      boxShadow: '0 0 60px rgba(99,102,241,0.15)', maxWidth: '520px', margin: '0 auto',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', letterSpacing: '1px' }}>AGENTAUTH MONITOR</span>
        </div>
        <span style={{ fontSize: '11px', color: '#555', fontFamily: 'monospace' }}>{new Date().toLocaleTimeString()}</span>
      </div>
      {agents.map((agent, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
          borderRadius: '12px',
          background: i === 3 ? 'rgba(239,68,68,0.05)' : i === 2 ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${i === 3 ? 'rgba(239,68,68,0.2)' : i === 2 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)'}`,
          marginBottom: '10px', transition: 'all 0.5s'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(agent.status), boxShadow: `0 0 6px ${getStatusColor(agent.status)}`, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0', fontFamily: 'monospace' }}>{agent.name}</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>{agent.action}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: getColor(scores[i]), textShadow: `0 0 10px ${getColor(scores[i])}`, fontFamily: 'monospace', transition: 'all 0.5s' }}>{Math.round(scores[i])}</div>
            <div style={{ fontSize: '10px', color: '#444', letterSpacing: '1px' }}>TRUST</div>
          </div>
          <div style={{ width: '60px', flexShrink: 0 }}>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${scores[i]}%`, background: `linear-gradient(90deg, ${getColor(scores[i])}, ${getColor(scores[i])}88)`, borderRadius: '2px', transition: 'width 0.5s ease', boxShadow: `0 0 6px ${getColor(scores[i])}` }} />
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '16px' }}>🚨</span>
        <div>
          <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '700' }}>ALERT: data-agent-07 revoked</div>
          <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>Unusual database access pattern detected</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1, pulse: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const pr = p.r + Math.sin(p.pulse) * 0.5;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 5);
        g.addColorStop(0, `rgba(99,102,241,${p.opacity})`);
        g.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, pr * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.opacity + 0.3})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            const op = (1 - d / 180) * 0.3;
            const lg = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            lg.addColorStop(0, `rgba(99,102,241,${op})`);
            lg.addColorStop(0.5, `rgba(139,92,246,${op * 1.5})`);
            lg.addColorStop(1, `rgba(99,102,241,${op})`);
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lg; ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % 6), 2000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await emailjs.send(
        'service_gmys5yb',
        'template_cq4eou9',
        { email: email, to_email: email },
        'pRYcZuFaF5o_j_B4y'
      );
      await fetch('https://formspree.io/f/mzezwebn', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.log('Submit error:', err);
    }
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#080810', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", color: '#ffffff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes borderGlow { 0%,100% { border-color: rgba(99,102,241,0.2); box-shadow: 0 0 20px rgba(99,102,241,0.1); } 50% { border-color: rgba(99,102,241,0.6); box-shadow: 0 0 40px rgba(99,102,241,0.3); } }
        @keyframes scanLine { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .hero-text { animation: fadeUp 0.8s ease forwards; }
        .hero-sub { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
        .hero-btns { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }
        .hero-gradient-text { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-size: 200% 200%; animation: gradientMove 4s ease infinite; }
        .glow-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 36px; transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275); position: relative; overflow: hidden; cursor: default; }
        .glow-card:hover { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.06); transform: translateY(-8px) scale(1.02); box-shadow: 0 30px 60px rgba(99,102,241,0.2); }
        .glow-card.active { border-color: rgba(99,102,241,0.6); background: rgba(99,102,241,0.08); box-shadow: 0 20px 40px rgba(99,102,241,0.2); }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #fff; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 40px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2); position: relative; overflow: hidden; }
        .btn-primary::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transition: left 0.5s; }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 0 60px rgba(99,102,241,0.6), 0 20px 40px rgba(99,102,241,0.3); }
        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.12); color: #aaa; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s ease; background: rgba(255,255,255,0.03); }
        .btn-secondary:hover { border-color: rgba(99,102,241,0.5); color: #fff; background: rgba(99,102,241,0.08); transform: translateY(-2px); }
        .nav-link { color: #777; text-decoration: none; font-size: 14px; font-weight: 500; transition: all 0.2s; padding: 6px 12px; border-radius: 8px; }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .stat-card { text-align: center; padding: 48px 32px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); transition: all 0.4s; flex: 1; min-width: 200px; position: relative; overflow: hidden; }
        .stat-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--accent); opacity: 0.6; }
        .stat-card:hover { transform: translateY(-6px); border-color: var(--accent-faded); box-shadow: 0 20px 40px var(--accent-shadow); }
        .step-card { flex: 1; min-width: 260px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 40px; transition: all 0.4s; position: relative; overflow: hidden; }
        .step-card:hover { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.04); transform: translateY(-6px); box-shadow: 0 30px 60px rgba(99,102,241,0.15); }
        .step-number { position: absolute; top: 32px; right: 32px; font-size: 80px; font-weight: 900; color: rgba(99,102,241,0.06); line-height: 1; }
        .code-block { background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px; font-family: 'Fira Code','JetBrains Mono','Courier New',monospace; font-size: 14px; line-height: 2; position: relative; overflow: hidden; }
        .code-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent); animation: shimmer 3s linear infinite; background-size: 200% auto; }
        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2); border-radius: 100px; padding: 10px 24px; font-size: 13px; color: #818cf8; margin-bottom: 32px; animation: borderGlow 3s ease infinite; }
        .trust-item { display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 100px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #777; transition: all 0.3s; }
        .trust-item:hover { color: #aaa; border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); }
        .section-label { color: #6366f1; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; margin-bottom: 20px; }
        .section-heading { font-size: 56px; font-weight: 900; letter-spacing: -2px; color: #ffffff; margin-bottom: 20px; }
        .waitlist-input { padding: 18px 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #fff; font-size: 16px; width: 320px; outline: none; transition: all 0.3s; font-family: Inter, sans-serif; }
        .waitlist-input:focus { border-color: rgba(99,102,241,0.6); background: rgba(99,102,241,0.05); box-shadow: 0 0 30px rgba(99,102,241,0.2); }
        .waitlist-input::placeholder { color: #444; }
        .floating { animation: float 6s ease-in-out infinite; }
        .orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; animation: pulse 8s ease-in-out infinite; }
      `}</style>

      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.9, pointerEvents: 'none' }} />
      <div className="orb" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', top: '-200px', left: '-200px', animationDelay: '0s' }} />
      <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', top: '30%', right: '-150px', animationDelay: '3s' }} />
      <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', bottom: '-100px', left: '25%', animationDelay: '5s' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Navbar */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(30px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,8,16,0.85)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-1px' }}>
              Agent<span className="hero-gradient-text">Auth</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#demo" className="nav-link">Demo</a>
            <a href="#waitlist" className="nav-link">Waitlist</a>
          </div>
          <a href="#waitlist" className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
            Get Early Access →
          </a>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '100px 20px 80px', maxWidth: '900px', margin: '0 auto' }}>
          <div className="badge hero-text">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            Now in private beta — limited spots available
          </div>
          <h1 className="hero-text" style={{ fontSize: '80px', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-3px', marginBottom: '32px' }}>
            <span style={{ color: '#ffffff' }}>Identity &amp;<br />Authentication</span>
            <br />
            <span className="hero-gradient-text">for AI Agents</span>
          </h1>
          <p className="hero-sub" style={{ fontSize: '20px', color: '#aaaaaa', lineHeight: '1.8', marginBottom: '56px', maxWidth: '600px', margin: '0 auto 56px', fontWeight: '400' }}>
            Every AI agent deserves a verified identity. Give your agents unique credentials, continuous behaviour monitoring, and instant revocation — built by an IAM engineer, for the AI era.
          </p>
          <div className="hero-btns" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <a href="#waitlist" className="btn-primary">Join the Waitlist →</a>
            <a href="#demo" className="btn-secondary">See Live Demo</a>
          </div>
          <div className="hero-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🔐', text: 'Zero Trust Architecture' },
              { icon: '⚡', text: 'Real-time Monitoring' },
              { icon: '🇬🇧', text: 'Built in the UK' },
              { icon: '🛡️', text: 'GDPR Compliant' },
            ].map((item, i) => (
              <div key={i} className="trust-item">
                <span>{item.icon}</span>
                <span style={{ color: '#999' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '80px 60px', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '60px' }}>The AI Agent Identity Crisis — 2026</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { number: '88%', label: 'of companies experienced AI agent security incidents in 2026', color: '#ef4444', shadow: 'rgba(239,68,68,0.3)' },
              { number: '109x', label: 'more machine identities than human identities in enterprises', color: '#f59e0b', shadow: 'rgba(245,158,11,0.3)' },
              { number: '22%', label: 'of teams actually treat AI agents as proper identities', color: '#6366f1', shadow: 'rgba(99,102,241,0.3)' },
              { number: '#2', label: 'CISO priority for 2026 — AI agent identity assurance', color: '#10b981', shadow: 'rgba(16,185,129,0.3)' },
            ].map((stat, i) => (
              <div key={i} className="stat-card" style={{ '--accent': stat.color, '--accent-faded': `${stat.color}40`, '--accent-shadow': stat.shadow }}>
                <div style={{ fontSize: '52px', fontWeight: '900', color: stat.color, marginBottom: '16px', textShadow: `0 0 40px ${stat.color}`, letterSpacing: '-2px' }}>{stat.number}</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: '1.7' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Monitor */}
        <div style={{ padding: '120px 60px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p className="section-label">Live product preview</p>
              <h2 className="section-heading">See it in action</h2>
              <p style={{ color: '#777', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px' }}>
                Watch TrustScores update in real time as agents behave — and see instant revocation when anomalies are detected.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '🟢', text: 'Green — agent behaving normally' },
                  { icon: '🟡', text: 'Yellow — unusual activity detected' },
                  { icon: '🔴', text: 'Red — access automatically revoked' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#777', fontSize: '15px' }}>
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '320px' }} className="floating">
              <AgentMonitor />
            </div>
          </div>
        </div>

        {/* Demo Animation */}
        <div id="demo" style={{ padding: '120px 60px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p className="section-label">How to use it</p>
            <h2 className="section-heading">Step by step walkthrough</h2>
            <p style={{ color: '#777', fontSize: '18px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
              Watch how AgentAuth works — from registering your first agent to instant revocation in 5 simple steps
            </p>
          </div>
          <DemoAnimation />
        </div>

        {/* How it works */}
        <div id="how" style={{ padding: '120px 60px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p className="section-label">How it works</p>
            <h2 className="section-heading">Simple. Secure. Instant.</h2>
            <p style={{ color: '#777', fontSize: '18px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>Three steps to give every AI agent a verified, monitored identity</p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { step: '01', icon: '🪪', title: 'Register your agent', desc: 'Create an AgentID for each AI agent. Every agent gets unique credentials and a cryptographic identity — no more shared API keys.', color: '#6366f1' },
              { step: '02', icon: '🧠', title: 'Monitor behaviour', desc: 'AgentAuth builds a behaviour baseline — what APIs your agent calls, what data it accesses. Deviations flagged in real time.', color: '#8b5cf6' },
              { step: '03', icon: '⚡', title: 'Instant revocation', desc: 'If an agent acts suspiciously, access is revoked instantly — automatically or with one click. Full audit trail for compliance.', color: '#a78bfa' },
            ].map((item, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{item.step}</div>
                <div style={{ fontSize: '36px', marginBottom: '24px', width: '64px', height: '64px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                <div style={{ fontSize: '11px', color: item.color, fontWeight: '700', letterSpacing: '3px', marginBottom: '16px' }}>STEP {item.step}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', color: '#ffffff' }}>{item.title}</h3>
                <p style={{ color: '#777', fontSize: '15px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{ padding: '120px 60px', borderTop: '1px solid rgba(255,255,255,0.04)', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p className="section-label">Features</p>
            <h2 className="section-heading">Everything agents need</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🪪', title: 'Unique AgentID', desc: 'Every agent gets a verified cryptographic identity — like a passport, but for AI. No more shared secrets.', color: '#6366f1' },
              { icon: '🧠', title: 'Behaviour fingerprinting', desc: 'Continuous analysis builds a unique behaviour profile per agent. Any deviation is flagged instantly.', color: '#8b5cf6' },
              { icon: '⚡', title: 'Instant revocation', desc: 'One click or fully automatic revocation the moment something looks wrong. Zero delay, zero downtime.', color: '#ef4444' },
              { icon: '🔗', title: 'Agent-to-agent trust', desc: 'Cryptographically verify identity when one AI agent communicates with another agent.', color: '#f59e0b' },
              { icon: '📋', title: 'Full audit trail', desc: 'Every action logged. Every API call recorded. Every permission granted. Complete compliance visibility.', color: '#10b981' },
              { icon: '🔌', title: '5-line integration', desc: 'Works with LangChain, AutoGen, CrewAI, and custom agents. Add to any existing agent in minutes.', color: '#a78bfa' },
            ].map((f, i) => (
              <div key={i} className={`glow-card ${activeFeature === i ? 'active' : ''}`}>
                <div style={{ fontSize: '28px', marginBottom: '24px', width: '60px', height: '60px', background: activeFeature === i ? `${f.color}25` : 'rgba(99,102,241,0.08)', border: `1px solid ${activeFeature === i ? f.color + '60' : 'rgba(99,102,241,0.15)'}`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>{f.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#ffffff' }}>{f.title}</h3>
                <p style={{ color: '#777', fontSize: '14px', lineHeight: '1.8' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code */}
        <div style={{ padding: '120px 60px', borderTop: '1px solid rgba(255,255,255,0.04)', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p className="section-label">Integration</p>
            <h2 className="section-heading">Dead simple to add</h2>
            <p style={{ color: '#777', fontSize: '18px', lineHeight: '1.7' }}>5 lines of code. Any AI agent. Any framework.</p>
          </div>
          <div className="code-block">
            <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)', animation: 'scanLine 3s linear infinite', top: 0 }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', opacity: 0.8 }} />
              <span style={{ marginLeft: '12px', color: '#555', fontSize: '12px' }}>agentauth_example.py</span>
            </div>
            <div><span style={{ color: '#6366f1' }}>from</span> <span style={{ color: '#34d399' }}>agentauth</span> <span style={{ color: '#6366f1' }}>import</span> <span style={{ color: '#ffffff' }}>AgentAuth</span></div>
            <br />
            <div><span style={{ color: '#475569' }}># Give your agent a verified identity</span></div>
            <div><span style={{ color: '#ffffff' }}>auth = AgentAuth(</span></div>
            <div>&nbsp;&nbsp;<span style={{ color: '#ffffff' }}>agent_id=</span><span style={{ color: '#fbbf24' }}>"support-bot-01"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{ color: '#ffffff' }}>secret=</span><span style={{ color: '#fbbf24' }}>"sk_live_xxxxx"</span></div>
            <div><span style={{ color: '#ffffff' }}>)</span></div>
            <br />
            <div><span style={{ color: '#475569' }}># Get verified token and log actions</span></div>
            <div><span style={{ color: '#ffffff' }}>token = auth.</span><span style={{ color: '#34d399' }}>get_token</span><span style={{ color: '#ffffff' }}>()</span></div>
            <div><span style={{ color: '#ffffff' }}>auth.</span><span style={{ color: '#34d399' }}>log_action</span><span style={{ color: '#ffffff' }}>(action=</span><span style={{ color: '#fbbf24' }}>"api_call"</span><span style={{ color: '#ffffff' }}>, resource=</span><span style={{ color: '#fbbf24' }}>"db"</span><span style={{ color: '#ffffff' }}>)</span></div>
            <br />
            <div><span style={{ color: '#475569' }}># Real-time TrustScore</span></div>
            <div><span style={{ color: '#ffffff' }}>score = auth.</span><span style={{ color: '#34d399' }}>get_trust_score</span><span style={{ color: '#ffffff' }}>()</span> <span style={{ color: '#475569' }}># → 94 ✅</span></div>
          </div>
        </div>

        {/* Waitlist */}
        <div id="waitlist" style={{ padding: '140px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)', pointerEvents: 'none', animation: 'pulse 6s ease infinite' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="badge">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              Private Beta — Limited spots
            </div>
            <h2 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2.5px', marginBottom: '24px', color: '#ffffff', lineHeight: '1.1' }}>
              Secure your agents<br />
              <span className="hero-gradient-text">before it's too late</span>
            </h2>
            <p style={{ color: '#888', marginBottom: '56px', fontSize: '18px', maxWidth: '440px', margin: '0 auto 56px', lineHeight: '1.7' }}>
              Join the waitlist and get early access to AgentAuth.
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input type="email" name="email" placeholder="your@company.com" required className="waitlist-input" />
                <input type="hidden" name="_subject" value="New AgentAuth Waitlist Signup!" />
                <button type="submit" className="btn-primary">Get Early Access →</button>
              </form>
            ) : (
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '20px', padding: '40px 60px', display: 'inline-block' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
                <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>You're on the list!</div>
                <div style={{ color: '#888', fontSize: '15px' }}>We'll reach out when AgentAuth launches.</div>
              </div>
            )}
            <p style={{ marginTop: '28px', color: '#555', fontSize: '13px' }}>No spam. No credit card required. Just early access.</p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ padding: '48px 60px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px' }}>
              Agent<span className="hero-gradient-text">Auth</span>
            </div>
          </div>
          <div style={{ color: '#666', fontSize: '13px' }}>© 2026 AgentAuth · Identity for AI Agents · Built in the UK 🇬🇧</div>
          <div style={{ fontSize: '13px' }}>
            <span style={{ color: '#666' }}>Built by </span>
            <a href="https://www.linkedin.com/in/manohar-reddy-yandapalli-5998b3212/" target="_blank" rel="noreferrer" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>
              Manohar Reddy — ForgeRock Certified IAM Engineer
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}