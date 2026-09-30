import { useState, useEffect } from 'react';

const steps = [
  {
    id: 1,
    label: 'STEP 01',
    title: 'Create your agent',
    subtitle: 'Register any AI agent in seconds',
    color: '#6366f1',
    content: (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px', letterSpacing: '1px' }}>AGENT NAME</div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '10px', padding: '14px 18px', color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#6366f1' }}>🤖</span> customer-support-bot
            <span style={{ marginLeft: 'auto', width: '2px', height: '18px', background: '#6366f1', animation: 'blink 1s infinite' }} />
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px', letterSpacing: '1px' }}>PERMISSIONS</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['read:customers', 'send:emails', 'read:tickets'].map((p, i) => (
              <div key={i} style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', color: '#818cf8' }}>{p}</div>
            ))}
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '10px', padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
          ✨ Create Agent Identity
        </div>
      </div>
    )
  },
  {
    id: 2,
    label: 'STEP 02',
    title: 'Get your AgentID',
    subtitle: 'Unique cryptographic credentials issued instantly',
    color: '#8b5cf6',
    content: (
      <div style={{ padding: '24px' }}>
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
          <div style={{ color: '#10b981', fontWeight: '700', marginBottom: '4px' }}>Agent Identity Created!</div>
          <div style={{ color: '#555', fontSize: '13px' }}>customer-support-bot</div>
        </div>
        {[
          { label: 'AGENT ID', value: 'agt_x7k2p9m3n8q1', icon: '🪪' },
          { label: 'SECRET KEY', value: 'sk_live_••••••••••••••••', icon: '🔑' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: '#555', marginBottom: '6px', letterSpacing: '2px' }}>{item.label}</div>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{item.icon}</span>
              <span style={{ color: '#a78bfa', fontFamily: 'monospace', fontSize: '13px', flex: 1 }}>{item.value}</span>
              <span style={{ fontSize: '12px', color: '#6366f1', cursor: 'pointer', padding: '4px 10px', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '6px' }}>Copy</span>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 3,
    label: 'STEP 03',
    title: 'Add to your agent',
    subtitle: '5 lines of code — works with any framework',
    color: '#a78bfa',
    content: (
      <div style={{ padding: '24px' }}>
        <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '2' }}>
          <div><span style={{ color: '#6366f1' }}>from</span> <span style={{ color: '#34d399' }}>agentauth</span> <span style={{ color: '#6366f1' }}>import</span> <span style={{ color: '#fff' }}>AgentAuth</span></div>
          <br />
          <div><span style={{ color: '#fff' }}>auth = AgentAuth(</span></div>
          <div>&nbsp;&nbsp;<span style={{ color: '#fff' }}>agent_id=</span><span style={{ color: '#fbbf24' }}>"agt_x7k2p9m3n8q1"</span>,</div>
          <div>&nbsp;&nbsp;<span style={{ color: '#fff' }}>secret=</span><span style={{ color: '#fbbf24' }}>"sk_live_••••••"</span></div>
          <div><span style={{ color: '#fff' }}>)</span></div>
          <br />
          <div><span style={{ color: '#fff' }}>token = auth.</span><span style={{ color: '#34d399' }}>get_token</span><span style={{ color: '#fff' }}>()</span></div>
          <div><span style={{ color: '#fff' }}>auth.</span><span style={{ color: '#34d399' }}>log_action</span><span style={{ color: '#fff' }}>(</span><span style={{ color: '#fbbf24' }}>"api_call"</span><span style={{ color: '#fff' }}>)</span></div>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {['LangChain', 'AutoGen', 'CrewAI', 'Custom'].map((f, i) => (
            <div key={i} style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', color: '#818cf8' }}>{f}</div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 4,
    label: 'STEP 04',
    title: 'Monitor in real time',
    subtitle: 'TrustScore updates live as your agent works',
    color: '#10b981',
    content: (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '600', fontFamily: 'monospace' }}>customer-support-bot</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>Reading customer tickets</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#10b981', textShadow: '0 0 15px #10b981', fontFamily: 'monospace' }}>94</div>
            <div style={{ fontSize: '10px', color: '#555', letterSpacing: '1px' }}>TRUST</div>
          </div>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ height: '100%', width: '94%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '2px', boxShadow: '0 0 10px #10b981', transition: 'width 1s ease' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'API calls', value: '1,247', color: '#6366f1' },
            { label: 'Data accessed', value: '89 records', color: '#8b5cf6' },
            { label: 'Avg response', value: '142ms', color: '#10b981' },
            { label: 'Anomalies', value: '0 detected', color: '#10b981' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: s.color, fontFamily: 'monospace' }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 5,
    label: 'STEP 05',
    title: 'Instant revocation',
    subtitle: 'Anomaly detected — access revoked in milliseconds',
    color: '#ef4444',
    content: (
      <div style={{ padding: '24px' }}>
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>🚨</span>
            <div>
              <div style={{ color: '#ef4444', fontWeight: '700', fontSize: '14px' }}>ANOMALY DETECTED</div>
              <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>Unusual database access pattern</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '20px', fontWeight: '900', color: '#ef4444', fontFamily: 'monospace' }}>12</div>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ height: '100%', width: '12%', background: 'linear-gradient(90deg, #ef4444, #f87171)', borderRadius: '2px', boxShadow: '0 0 10px #ef4444' }} />
          </div>
          <div style={{ fontSize: '12px', color: '#555' }}>TrustScore dropped from 94 → 12 in 3 seconds</div>
        </div>
        <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>🔒</span>
          <div>
            <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: '700' }}>Access automatically revoked</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>Token invalidated · 0ms response time</div>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#ef4444', fontWeight: '700' }}>REVOKED</div>
        </div>
        <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>📧</span>
          <div style={{ fontSize: '13px', color: '#10b981' }}>Alert sent to security team</div>
        </div>
      </div>
    )
  }
];

export default function DemoAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const duration = 4000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setCurrentStep(prev => (prev + 1) % steps.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep]);

  const step = steps[currentStep];

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

      {/* Progress steps */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => { setCurrentStep(i); setProgress(0); }}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${currentStep === i ? s.color : 'rgba(255,255,255,0.08)'}`,
              background: currentStep === i ? `${s.color}15` : 'transparent',
              color: currentStep === i ? s.color : '#555',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              letterSpacing: '1px'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main card */}
      <div style={{
        background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${step.color}40`,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: `0 0 60px ${step.color}15`,
        backdropFilter: 'blur(20px)',
        transition: 'border-color 0.5s, box-shadow 0.5s'
      }}>

        {/* Top bar */}
        <div style={{
          padding: '20px 28px',
          borderBottom: `1px solid ${step.color}20`,
          background: `${step.color}08`,
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', opacity: 0.7 }} />
          </div>
          <div style={{ fontSize: '13px', color: '#555', fontFamily: 'monospace', flex: 1, textAlign: 'center' }}>
            agentauth.site — dashboard
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: `${step.color}15`, border: `1px solid ${step.color}30`,
            borderRadius: '20px', padding: '4px 12px'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: step.color, boxShadow: `0 0 6px ${step.color}` }} />
            <span style={{ fontSize: '11px', color: step.color, fontWeight: '700', letterSpacing: '1px' }}>LIVE</span>
          </div>
        </div>

        {/* Content area */}
        <div style={{ display: 'flex', minHeight: '320px' }}>

          {/* Left panel */}
          <div style={{
            width: '220px',
            flexShrink: 0,
            borderRight: `1px solid rgba(255,255,255,0.04)`,
            padding: '28px 24px',
            background: 'rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '11px', color: '#333', letterSpacing: '3px', marginBottom: '20px' }}>NAVIGATION</div>
            {['Dashboard', 'Agents', 'Monitor', 'Audit Log', 'Settings'].map((nav, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '4px',
                fontSize: '14px',
                color: i === currentStep ? '#fff' : '#444',
                background: i === currentStep ? `${step.color}20` : 'transparent',
                borderLeft: i === currentStep ? `3px solid ${step.color}` : '3px solid transparent',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}>{nav}</div>
            ))}
          </div>

          {/* Right panel */}
          <div style={{ flex: 1 }}>
            <div style={{ padding: '28px 28px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}30`,
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '11px',
                  color: step.color,
                  fontWeight: '700',
                  letterSpacing: '2px'
                }}>{step.label}</div>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '0' }}>{step.subtitle}</p>
            </div>
            <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
              {step.content}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${step.color}, ${step.color}88)`,
            transition: 'width 0.05s linear',
            boxShadow: `0 0 10px ${step.color}`
          }} />
        </div>

        {/* Bottom controls */}
        <div style={{
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderTop: '1px solid rgba(255,255,255,0.04)'
        }}>
          <button
            onClick={() => setIsPlaying(p => !p)}
            style={{
              background: `${step.color}15`,
              border: `1px solid ${step.color}30`,
              borderRadius: '8px',
              padding: '8px 16px',
              color: step.color,
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {steps.map((s, i) => (
              <div
                key={i}
                onClick={() => { setCurrentStep(i); setProgress(0); }}
                style={{
                  width: currentStep === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentStep === i ? s.color : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: currentStep === i ? `0 0 8px ${s.color}` : 'none'
                }}
              />
            ))}
          </div>

          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#333', fontFamily: 'monospace' }}>
            {currentStep + 1} / {steps.length}
          </div>
        </div>
      </div>

      {/* Step description */}
      <div style={{
        marginTop: '24px',
        padding: '20px 28px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: `${step.color}15`,
          border: `1px solid ${step.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', flexShrink: 0
        }}>
          {['🪪', '🔑', '💻', '📊', '🛡️'][currentStep]}
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{step.title}</div>
          <div style={{ fontSize: '13px', color: '#555' }}>{step.subtitle}</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '13px', color: step.color, fontWeight: '600' }}>
          Auto-advancing in {Math.ceil((100 - progress) / 25)}s
        </div>
      </div>
    </div>
  );
}
