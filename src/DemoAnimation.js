import { useEffect, useState, useRef } from 'react';

const scenes = [
  {
    id: 1,
    title: "The Threat",
    subtitle: "Your AI agent is exposed...",
    color: "#ef4444",
    icon: "⚠️",
    duration: 3000,
  },
  {
    id: 2,
    title: "Connect Your Agent",
    subtitle: "Enter your agent credentials",
    color: "#6366f1",
    icon: "🔌",
    duration: 3500,
  },
  {
    id: 3,
    title: "Set MFA Protection",
    subtitle: "Choose your security method",
    color: "#8b5cf6",
    icon: "🛡️",
    duration: 3500,
  },
  {
    id: 4,
    title: "Attack Detected!",
    subtitle: "AgentAuth blocks the intruder",
    color: "#ef4444",
    icon: "🚨",
    duration: 3000,
  },
  {
    id: 5,
    title: "Agent Safe & Secure",
    subtitle: "Your agent works peacefully 24/7",
    color: "#10b981",
    icon: "✅",
    duration: 3500,
  },
];

// Scene 1 — The Threat
function SceneThreat({ progress }) {
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets(prev => [
        ...prev.slice(-8),
        { id: Date.now(), x: Math.random() * 80 + 10, delay: Math.random() * 500 }
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Hacker terminal */}
      <div style={{
        background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(239,68,68,0.4)',
        borderRadius: '12px', padding: '20px', width: '260px',
        fontFamily: 'monospace', fontSize: '12px',
        boxShadow: '0 0 30px rgba(239,68,68,0.2)',
        animation: 'glitch 0.3s ease infinite'
      }}>
        <div style={{ color: '#ef4444', marginBottom: '8px', fontSize: '13px', fontWeight: '700' }}>⚠️ UNAUTHORIZED ACCESS</div>
        <div style={{ color: '#666', marginBottom: '4px' }}>$ scanning agents...</div>
        <div style={{ color: '#f59e0b' }}>$ found: customer-bot-01</div>
        <div style={{ color: '#f59e0b' }}>$ found: analytics-agent</div>
        <div style={{ color: '#ef4444', marginTop: '8px' }}>$ injecting payload...</div>
        <div style={{ color: '#ef4444' }}>$ extracting data... ██████░░</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444', animation: 'pulse 1s infinite' }} />
          <span style={{ color: '#ef4444', fontSize: '11px' }}>NO PROTECTION DETECTED</span>
        </div>
      </div>

      {/* Floating attack packets */}
      {packets.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${10 + Math.random() * 80}%`,
          fontSize: '18px',
          animation: 'floatUp 2s ease forwards',
          opacity: 0.8
        }}>💀</div>
      ))}
    </div>
  );
}

// Scene 2 — Connect Agent
function SceneConnect({ progress }) {
  const [step, setStep] = useState(0);
  const agentId = 'agt_3dc5953cce2da097';
  const secret = 'sk_live_••••••••••••';

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: '16px', padding: '24px', width: '280px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 40px rgba(99,102,241,0.15)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔌</span> Connect Your Agent
        </div>

        {/* Agent ID field */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', color: '#555', marginBottom: '6px', letterSpacing: '1px' }}>AGENT ID</div>
          <div style={{
            padding: '10px 14px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(99,102,241,${step >= 1 ? '0.5' : '0.1'})`,
            fontFamily: 'monospace', fontSize: '12px', color: '#a78bfa',
            transition: 'all 0.5s',
            minHeight: '36px'
          }}>
            {step >= 1 ? agentId : ''}
            {step === 1 && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
          </div>
        </div>

        {/* Secret field */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', color: '#555', marginBottom: '6px', letterSpacing: '1px' }}>SECRET KEY</div>
          <div style={{
            padding: '10px 14px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(99,102,241,${step >= 2 ? '0.5' : '0.1'})`,
            fontFamily: 'monospace', fontSize: '12px', color: '#a78bfa',
            transition: 'all 0.5s',
            minHeight: '36px'
          }}>
            {step >= 2 ? secret : ''}
            {step === 2 && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
          </div>
        </div>

        {/* Connect button */}
        <div style={{
          padding: '12px', borderRadius: '8px', textAlign: 'center',
          background: step >= 3 ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.3)',
          color: step >= 3 ? '#fff' : '#666',
          fontWeight: '700', fontSize: '14px',
          transition: 'all 0.5s',
          boxShadow: step >= 3 ? '0 0 20px rgba(99,102,241,0.4)' : 'none'
        }}>
          {step >= 3 ? '✅ Agent Connected!' : 'Connect Agent'}
        </div>
      </div>
    </div>
  );
}

// Scene 3 — Set MFA
function SceneMFA({ progress }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSelected('fingerprint'), 1000);
    const t2 = setTimeout(() => setConfirmed(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const methods = [
    { id: 'fingerprint', icon: '👆', label: 'Fingerprint' },
    { id: 'push', icon: '📱', label: 'Push Notification' },
    { id: 'otp', icon: '🔢', label: 'OTP Code' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: '16px', padding: '24px', width: '280px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 40px rgba(139,92,246,0.15)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🛡️</span> Choose MFA Method
        </div>

        {methods.map(method => (
          <div key={method.id} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 14px', borderRadius: '10px', marginBottom: '10px',
            background: selected === method.id ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${selected === method.id ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.06)'}`,
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: selected === method.id ? '0 0 15px rgba(139,92,246,0.2)' : 'none'
          }}>
            <span style={{ fontSize: '20px' }}>{method.icon}</span>
            <span style={{ fontSize: '13px', color: selected === method.id ? '#a78bfa' : '#666', fontWeight: selected === method.id ? '700' : '400' }}>
              {method.label}
            </span>
            {selected === method.id && <span style={{ marginLeft: 'auto', color: '#a78bfa', fontSize: '16px' }}>✓</span>}
          </div>
        ))}

        {confirmed && (
          <div style={{
            marginTop: '16px', padding: '12px', borderRadius: '8px', textAlign: 'center',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            color: '#10b981', fontWeight: '700', fontSize: '13px',
            animation: 'fadeIn 0.5s ease'
          }}>
            🔐 MFA Enabled — Agent Secured!
          </div>
        )}
      </div>
    </div>
  );
}

// Scene 4 — Attack Blocked
function SceneAttack({ progress }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '20px', flexWrap: 'wrap' }}>
      {/* Hacker side */}
      <div style={{
        background: 'rgba(0,0,0,0.6)', border: `1px solid rgba(239,68,68,${phase >= 1 ? '0.6' : '0.2'})`,
        borderRadius: '12px', padding: '16px', width: '120px', textAlign: 'center',
        transition: 'all 0.5s',
        opacity: phase >= 3 ? 0.4 : 1,
        boxShadow: phase >= 1 ? '0 0 20px rgba(239,68,68,0.2)' : 'none'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>👾</div>
        <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700' }}>ATTACKER</div>
        {phase >= 1 && <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Trying to access...</div>}
      </div>

      {/* Arrow + Shield */}
      <div style={{ textAlign: 'center' }}>
        {phase >= 1 && (
          <div style={{ fontSize: '24px', marginBottom: '8px', animation: 'slideRight 0.5s ease' }}>→</div>
        )}
        <div style={{
          fontSize: '40px',
          filter: phase >= 2 ? 'drop-shadow(0 0 15px #10b981)' : 'none',
          animation: phase >= 2 ? 'pulse 1s infinite' : 'none',
          transition: 'all 0.5s'
        }}>
          {phase >= 2 ? '🛡️' : '🔒'}
        </div>
        {phase >= 2 && (
          <div style={{
            fontSize: '11px', color: '#10b981', fontWeight: '700', marginTop: '8px',
            animation: 'fadeIn 0.5s ease'
          }}>
            BLOCKED!
          </div>
        )}
      </div>

      {/* Agent side */}
      <div style={{
        background: 'rgba(16,185,129,0.05)', border: `1px solid rgba(16,185,129,${phase >= 2 ? '0.5' : '0.1'})`,
        borderRadius: '12px', padding: '16px', width: '120px', textAlign: 'center',
        transition: 'all 0.5s',
        boxShadow: phase >= 2 ? '0 0 20px rgba(16,185,129,0.15)' : 'none'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</div>
        <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>YOUR AGENT</div>
        {phase >= 3 && <div style={{ fontSize: '10px', color: '#10b981', marginTop: '4px' }}>Safe ✅</div>}
      </div>

      {/* Alert notification */}
      {phase >= 3 && (
        <div style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '10px', padding: '10px 14px',
          animation: 'slideDown 0.5s ease',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: '700' }}>🚨 Attack Blocked</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>Email alert sent to you</div>
        </div>
      )}
    </div>
  );
}

// Scene 5 — Peace
function ScenePeace({ progress }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const agents = [
    { name: 'customer-bot', action: 'Handling support tickets', score: 97 },
    { name: 'analytics-agent', action: 'Processing reports', score: 94 },
    { name: 'email-agent', action: 'Sending campaigns', score: 91 },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(16,185,129,0.3)',
        borderRadius: '16px', padding: '20px', width: '300px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 40px rgba(16,185,129,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>All Agents Secure & Running</span>
        </div>

        {agents.map((agent, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px', borderRadius: '8px', marginBottom: '8px',
            background: 'rgba(16,185,129,0.05)',
            border: '1px solid rgba(16,185,129,0.15)',
            opacity: phase >= i + 1 ? 1 : 0,
            transform: phase >= i + 1 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0', fontFamily: 'monospace' }}>{agent.name}</div>
              <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{agent.action}</div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#10b981', fontFamily: 'monospace' }}>{agent.score}</div>
          </div>
        ))}

        {phase >= 3 && (
          <div style={{
            marginTop: '12px', padding: '10px', borderRadius: '8px', textAlign: 'center',
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
            animation: 'fadeIn 0.5s ease'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>😌</div>
            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>Relax. AgentAuth has got you covered.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DemoAnimation() {
  const [currentScene, setCurrentScene] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);
  const [isPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    const scene = scenes[currentScene];
    let startTime = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / scene.duration, 1);
      setProgress(p);

      if (p >= 1) {
        clearInterval(progressRef.current);
        setTimeout(() => {
          setCurrentScene(prev => (prev + 1) % scenes.length);
          setSceneKey(prev => prev + 1);
          setProgress(0);
        }, 300);
      }
    }, 16);

    return () => clearInterval(progressRef.current);
  }, [currentScene, isPlaying]);

  const scene = scenes[currentScene];

  const renderScene = () => {
    switch (currentScene) {
      case 0: return <SceneThreat progress={progress} />;
      case 1: return <SceneConnect key={sceneKey} progress={progress} />;
      case 2: return <SceneMFA key={sceneKey} progress={progress} />;
      case 3: return <SceneAttack key={sceneKey} progress={progress} />;
      case 4: return <ScenePeace key={sceneKey} progress={progress} />;
      default: return null;
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(-1px, 1px); }
          75% { transform: translate(1px, -1px); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-60px); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      {/* Main screen */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${scene.color}30`,
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: `0 0 60px ${scene.color}15`,
        backdropFilter: 'blur(40px)',
        transition: 'border-color 0.5s, box-shadow 0.5s'
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: `1px solid ${scene.color}20`,
          background: 'rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: scene.color, letterSpacing: '2px' }}>
            {scene.icon} {scene.title.toUpperCase()}
          </div>
          <div style={{ fontSize: '12px', color: '#444' }}>AgentAuth Demo</div>
        </div>

        {/* Scene content */}
        <div style={{ height: '320px', position: 'relative', padding: '20px' }}>
          {renderScene()}
        </div>

        {/* Progress bar */}
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${scene.color}, ${scene.color}88)`,
            transition: 'width 0.1s linear',
            boxShadow: `0 0 8px ${scene.color}`
          }} />
        </div>
      </div>

      {/* Scene indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px', alignItems: 'center' }}>
        {scenes.map((s, i) => (
          <button
            key={i}
            onClick={() => { setCurrentScene(i); setSceneKey(prev => prev + 1); setProgress(0); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '20px',
              background: currentScene === i ? `${s.color}15` : 'transparent',
              border: `1px solid ${currentScene === i ? s.color : 'rgba(255,255,255,0.08)'}`,
              color: currentScene === i ? s.color : '#444',
              fontSize: '12px', fontWeight: currentScene === i ? '700' : '400',
              cursor: 'pointer', transition: 'all 0.3s'
            }}
          >
            <span>{s.icon}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Subtitle */}
      <div style={{ textAlign: 'center', marginTop: '16px', color: '#555', fontSize: '14px' }}>
        {scene.subtitle}
      </div>
    </div>
  );
}
