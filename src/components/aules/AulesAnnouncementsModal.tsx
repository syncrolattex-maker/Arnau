import React, { useState } from 'react';
import { Bell, ExternalLink, RefreshCw, X, Check, Link } from 'lucide-react';
import { type AulesAnnouncement, INITIAL_ANNOUNCEMENTS, parseAulesRss } from '../../utils/aulesRss';

interface AulesAnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AulesAnnouncementsModal: React.FC<AulesAnnouncementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [announcements, setAnnouncements] = useState<AulesAnnouncement[]>(() => {
    const saved = localStorage.getItem('arnau_aules_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });
  const [rssUrl, setRssUrl] = useState<string>(() => {
    return localStorage.getItem('arnau_aules_rss_url') || '';
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFetchRss = async () => {
    if (!rssUrl.trim()) return;
    setIsFetching(true);
    setStatusMsg(null);

    try {
      const proxyUrl = `/api/aules-proxy?url=${encodeURIComponent(rssUrl.trim())}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const parsed = parseAulesRss(xml);
      if (parsed.length === 0) {
        setStatusMsg('El canal RSS no contenia nous comunicats o el format no ha coincidit.');
      } else {
        setAnnouncements(parsed);
        localStorage.setItem('arnau_aules_announcements', JSON.stringify(parsed));
        localStorage.setItem('arnau_aules_rss_url', rssUrl);
        setStatusMsg(`Sincronitzat! S'han carregat ${parsed.length} avisos de professors.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setStatusMsg(`Error en obtindre avisos: ${message}`);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(17, 17, 24, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="superhi-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          position: 'relative',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6e6e80',
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            className="round-icon-48"
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              boxShadow: '0 2px 0 0 #111118',
            }}
          >
            <Bell size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', margin: 0 }}>Tauler de Comunicats i Avisos d'Aules</h2>
            <p className="font-mono" style={{ fontSize: '12px', color: '#6e6e80', margin: '4px 0 0 0' }}>
              NOTIFICACIONS DIRECTES DEL PROFESSORAT SENSE DISPERSIÓ
            </p>
          </div>
        </div>

        {/* RSS Feed input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '13px', color: '#555566' }}>
            Pots connectar l'enllaç RSS dels fòrums de novetats d'Aules (o consultar les novetats sincronitzades):
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="url"
                placeholder="https://aules.edu.gva.es/eso46/rss/file.php/..."
                value={rssUrl}
                onChange={(e) => setRssUrl(e.target.value)}
                className="superhi-input"
                style={{ width: '100%', fontSize: '13px', padding: '10px 12px 10px 36px' }}
              />
              <Link
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#888899',
                }}
              />
            </div>
            <button
              onClick={handleFetchRss}
              disabled={isFetching || !rssUrl.trim()}
              className="btn-primary"
              style={{ padding: '0 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              {isFetching ? 'Actualitzant...' : 'Connectar RSS'}
            </button>
          </div>
          {statusMsg && (
            <div style={{ fontSize: '12px', color: statusMsg.startsWith('S') ? '#15803d' : '#b91c1c' }}>
              {statusMsg}
            </div>
          )}
        </div>

        {/* Announcements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
            ÚLTIMS COMUNICATS:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {announcements.map((ann) => (
              <div
                key={ann.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-small)',
                  border: '1px solid var(--color-frost-blue)',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 0 0 #111118',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: ann.subjectColor + '20',
                        color: ann.subjectColor,
                        fontFamily: 'var(--font-martian-mono)',
                        fontWeight: 600,
                      }}
                    >
                      {ann.subjectName}
                    </span>
                    <span style={{ fontSize: '12px', color: '#777788' }}>
                      {ann.author} · {ann.date}
                    </span>
                  </div>

                  {ann.url && (
                    <a
                      href={ann.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--color-electric-iris)',
                        fontSize: '12px',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      <span>Veure en Aules</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-ink-black)' }}>
                  {ann.title}
                </div>

                <div style={{ fontSize: '13px', color: '#444455', lineHeight: 1.4 }}>
                  {ann.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
