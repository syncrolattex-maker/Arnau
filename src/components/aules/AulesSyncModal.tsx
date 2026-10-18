import React, { useState } from 'react';
import { Calendar, Upload, Link, AlertCircle, Check, ExternalLink, X } from 'lucide-react';
import { parseAulesIcs, convertEventsToExams, convertEventsToTasks, type ParsedIcsEvent } from '../../utils/aulesIcs';
import type { ExamCountdown, DailyTask } from '../../types';

interface AulesSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncExamsAndTasks: (newExams: ExamCountdown[], newTasks: DailyTask[]) => void;
}

export const AulesSyncModal: React.FC<AulesSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncExamsAndTasks,
}) => {
  const [calendarUrl, setCalendarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<ParsedIcsEvent[] | null>(null);

  if (!isOpen) return null;

  const handleProcessIcsContent = (icsText: string) => {
    try {
      const events = parseAulesIcs(icsText);
      if (events.length === 0) {
        setErrorMsg('No es van detectar esdeveniments vàlids a l\'arxiu/enllaç de calendari.');
        return;
      }
      setParsedPreview(events);
      setErrorMsg(null);
    } catch {
      setErrorMsg('Error en analitzar el format iCalendar d\'Aules.');
    }
  };

  const handleFetchUrl = async () => {
    if (!calendarUrl.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Normalise webcal:// to https://
      const cleanUrl = calendarUrl.trim().replace(/^webcal:\/\//i, 'https://');
      
      // Use local dev server proxy to avoid CORS
      const proxyUrl = `/api/aules-proxy?url=${encodeURIComponent(cleanUrl)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error HTTP: ${response.status}`);
      }

      const text = await response.text();
      handleProcessIcsContent(text);
      localStorage.setItem('arnau_aules_calendar_url', calendarUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(`No s'ha pogut descarregar automàticament (${message}). Pots descarregar l'arxiu .ics des d'Aules i pujar-lo en l'Opció 2.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        handleProcessIcsContent(content);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Error en llegir l\'arxiu .ics seleccionat.');
    };
    reader.readAsText(file);
  };

  const handleApplySync = () => {
    if (!parsedPreview) return;
    const exams = convertEventsToExams(parsedPreview);
    const tasks = convertEventsToTasks(parsedPreview);
    onSyncExamsAndTasks(exams, tasks);
    setSuccessMsg(`Sincronitzat! S'han importat ${exams.length} dates d'examen i tasques.`);
    setTimeout(() => {
      onClose();
    }, 1500);
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
          maxWidth: '640px',
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
        {/* Close Button */}
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

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            className="round-icon-48"
            style={{
              backgroundColor: '#eef2ff',
              color: 'var(--color-electric-iris)',
              boxShadow: '0 2px 0 0 #111118',
            }}
          >
            <Calendar size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>Sincronitzar Aules GVA</h2>
            <p className="font-mono" style={{ fontSize: '12px', color: '#6e6e80', margin: '4px 0 0 0' }}>
              IMPORTACIÓ AUTOMÀTICA DE PROVES, EXÀMENS I ENTREGUES (.ICS)
            </p>
          </div>
        </div>

        {/* Instructions Banner */}
        <div
          style={{
            backgroundColor: '#f8f9fc',
            border: '1px solid var(--color-frost-blue)',
            borderRadius: 'var(--radius-small)',
            padding: '14px 16px',
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#333344',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <strong>Com obtindre el teu enllaç de calendari d'Aules?</strong>
            <a
              href="https://aules.edu.gva.es/eso46/calendar/export.php"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-electric-iris)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              <span>Anar a Exportar Calendari a Aules</span>
              <ExternalLink size={12} />
            </a>
          </div>
          <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>Inicia sessió a <strong>Aules ESO</strong>.</li>
            <li>A la pàgina d'Exportar Calendari, selecciona <em>"Tots els esdeveniments"</em> i <em>"Recents i pròxims 60 dies"</em>.</li>
            <li>Fes clic en <strong>"Obtindre URL en el calendari"</strong> (o descarrega el fitxer <strong>.ics</strong>).</li>
          </ol>
        </div>

        {/* Input Option A: URL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>
            Opció 1: Apegar URL del Calendari d'Aules
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="url"
                placeholder="https://aules.edu.gva.es/eso46/calendar/export_execute.php?..."
                value={calendarUrl}
                onChange={(e) => setCalendarUrl(e.target.value)}
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
              onClick={handleFetchUrl}
              disabled={isLoading || !calendarUrl.trim()}
              className="btn-primary"
              style={{ padding: '0 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              {isLoading ? 'Carregant...' : 'Obtindre'}
            </button>
          </div>
        </div>

        {/* Input Option B: Direct File Upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>
            Opció 2: Pujar fitxer .ics descarregat
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px',
              border: '2px dashed var(--color-frost-blue)',
              borderRadius: 'var(--radius-small)',
              backgroundColor: '#fafbff',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            <Upload size={18} color="var(--color-electric-iris)" />
            <span style={{ fontSize: '13px', color: '#444455' }}>
              Arrossega o fes clic per a pujar el teu fitxer <strong>.ics</strong>
            </span>
            <input
              type="file"
              accept=".ics,text/calendar"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: '#fff5f5',
              border: '1px solid #ffd4d4',
              borderRadius: 'var(--radius-small)',
              color: '#d63031',
              fontSize: '12px',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: '#e6fffa',
              border: '1px solid #b2f5ea',
              borderRadius: 'var(--radius-small)',
              color: '#234e52',
              fontSize: '13px',
            }}
          >
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Events Preview */}
        {parsedPreview && parsedPreview.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="font-mono" style={{ fontSize: '12px', color: '#555566' }}>
              ESDEVENIMENTS DETECTATS ({parsedPreview.length}):
            </div>
            <div
              style={{
                maxHeight: '180px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                paddingRight: '4px',
              }}
            >
              {parsedPreview.map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#f8f9fa',
                    borderLeft: `4px solid ${ev.color}`,
                    fontSize: '12px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ev.summary}
                    </div>
                    <div style={{ color: '#666677', fontSize: '11px' }}>
                      {ev.subjectName} · {ev.dtstart.toLocaleDateString('ca-ES', { day: '2-digit', month: 'short' })}
                    </div>
                  </div>
                  {ev.isExam && (
                    <span
                      style={{
                        backgroundColor: '#ffe3e3',
                        color: '#c92a2a',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontFamily: 'var(--font-martian-mono)',
                        fontWeight: 600,
                        marginLeft: '8px',
                      }}
                    >
                      PROVA
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleApplySync}
              className="btn-primary"
              style={{ width: '100%', marginTop: '6px', justifyContent: 'center' }}
            >
              Confirmar i Integrar al Calendari D-Day
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
