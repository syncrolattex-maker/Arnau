export interface AulesAnnouncement {
  id: string;
  title: string;
  author: string;
  date: string;
  subjectName: string;
  subjectColor: string;
  content: string;
  url?: string;
}

export function parseAulesRss(xmlText: string): AulesAnnouncement[] {
  const items: AulesAnnouncement[] = [];
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const itemNodes = xmlDoc.querySelectorAll('item');

    itemNodes.forEach((node, index) => {
      const title = node.querySelector('title')?.textContent || 'Aviso';
      const link = node.querySelector('link')?.textContent || '';
      const description = node.querySelector('description')?.textContent || '';
      const author = node.querySelector('author')?.textContent || node.querySelector('dc\\:creator')?.textContent || 'Profesorado';
      const pubDate = node.querySelector('pubDate')?.textContent || '';

      // Clean HTML from description
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const cleanContent = tempDiv.textContent || tempDiv.innerText || '';

      items.push({
        id: 'rss-' + index + '-' + Date.now(),
        title: title.trim(),
        author: author.trim(),
        date: pubDate ? new Date(pubDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : 'Hoy',
        subjectName: 'Aules ESO',
        subjectColor: '#2727e6',
        content: cleanContent.slice(0, 150) + (cleanContent.length > 150 ? '...' : ''),
        url: link.trim(),
      });
    });
  } catch {
    // Parser fallback
  }

  return items;
}

export const INITIAL_ANNOUNCEMENTS: AulesAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Pautas para el examen de la Unidad 3 de Biología',
    author: 'Prof. García',
    date: 'Ayer',
    subjectName: 'Biología',
    subjectColor: '#2a9d8f',
    content: 'Recordad repasar especialmente los orgánulos de la célula vegetal y el proceso fotosintético. Se permitirá el uso de regla para los esquemas.',
    url: 'https://aules.edu.gva.es/eso46/my/',
  },
  {
    id: 'ann-2',
    title: 'Nueva relación de problemas de ecuaciones de 1º grado',
    author: 'Prof. Martínez',
    date: '15 Oct',
    subjectName: 'Matemáticas',
    subjectColor: '#e63946',
    content: 'Se han subido las soluciones paso a paso de los ejercicios 1 al 15 para autoevaluación previa a la sesión de dudas del jueves.',
    url: 'https://aules.edu.gva.es/eso46/my/',
  },
  {
    id: 'ann-3',
    title: 'Entrega voluntaria del trabajo de los Estados de la Materia',
    author: 'Prof. Ruiz',
    date: '14 Oct',
    subjectName: 'Física y Química',
    subjectColor: '#7209b7',
    content: 'Podéis subir el informe en formato PDF hasta las 23:59 del domingo en la sección de tareas.',
    url: 'https://aules.edu.gva.es/eso46/my/',
  },
];
