import React from 'react';

export const AnnouncementTicker: React.FC = () => {
  const tickerItems = [
    '✦ FLUJO DIGITAL 2º DE LA ESO',
    'ARRANQUE DE ESTUDIO EN MENOS DE 5 SEGUNDOS',
    'LA REGLA DE LAS 3 QUE SE QUEDAN',
    'ALGORITMO SM-2 ANKI ACTIVO',
    'BLOQUEO AUTOMÁTICO DE TIKTOK E INSTAGRAM (LÍMITE 1 MIN)',
    '1 MINUTO ENFOCADO = 1 MONEDA VIRTUAL',
    'ISLA COLECTIVA NIVEL 4 EN CRECIMIENTO',
    'MODO TDAH: DISCO VISUAL DISPONIBLE',
  ];

  const fullText = tickerItems.join(' • ') + ' • ' + tickerItems.join(' • ');

  return (
    <div className="ticker-bar" role="region" aria-label="Anuncios de Flujo de Trabajo">
      <div className="ticker-fade" />
      <div className="ticker-content font-mono">
        <span>{fullText}</span>
      </div>
    </div>
  );
};
