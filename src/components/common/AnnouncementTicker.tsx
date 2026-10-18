import React from 'react';

export const AnnouncementTicker: React.FC = () => {
  const tickerItems = [
    '✦ FLUX DIGITAL 2n D\'ESO',
    'ARRANCADA D\'ESTUDI EN MENYS DE 5 SEGONS',
    'LA REGLA DE LES 3 QUE ES QUEDEN',
    'ALGORISME SM-2 ANKI ACTIU',
    'BLOQUEIG AUTOMÀTIC DE TIKTOK I INSTAGRAM (LÍMIT 1 MIN)',
    '1 MINUT ENFOCAT = 1 MONEDA VIRTUAL',
    'ILLA COL·LECTIVA NIVELL 4 EN CREIXEMENT',
    'MODE TDAH: DISC VISUAL DISPONIBLE',
  ];

  const fullText = tickerItems.join(' • ') + ' • ' + tickerItems.join(' • ');

  return (
    <div className="ticker-bar" role="region" aria-label="Avisos de Flux de Treball">
      <div className="ticker-fade" />
      <div className="ticker-content font-mono">
        <span>{fullText}</span>
      </div>
    </div>
  );
};
