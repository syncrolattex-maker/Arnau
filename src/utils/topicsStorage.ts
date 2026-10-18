import type { Topic } from '../types';

export const INITIAL_TOPICS: Topic[] = [
  // FÍSICA I QUÍMICA 2º ESO C
  {
    id: 'fyq-t1',
    subjectId: 'FYQ_2ESO',
    unitNumber: 1,
    title: 'Tema 1: El mètode científic',
    summary: 'Definició de ciència, diferència entre física i química, i els 6 passos del mètode científic.',
    status: 'mastered',
    flashcardCount: 3,
    materials: [
      { id: 'fyq-m1', title: 'Tema 1: El mètode científic (Presentació Aules)', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6414194' },
    ],
  },
  {
    id: 'fyq-t2',
    subjectId: 'FYQ_2ESO',
    unitNumber: 2,
    title: 'Tema 2: Magnituds i la seua mesura',
    summary: 'Propietats mesurables, unitats patró, les 7 magnituds fonamentals del SI i derivades.',
    status: 'in_progress',
    flashcardCount: 2,
    materials: [
      { id: 'fyq-m2', title: 'Tema 2: Magnituds i unitats (Presentació Aules)', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6414196' },
    ],
  },

  // MATEMÀTIQUES 2º ESO C
  {
    id: 'mat-t1',
    subjectId: 'MAT_2ESO',
    unitNumber: 1,
    title: 'Operacions, Potències i Fraccions',
    summary: 'Operacions combinades, càlcul de potències amb mateixa base, exponent zero i negatiu.',
    status: 'in_progress',
    flashcardCount: 2,
    materials: [
      { id: 'mat-m1', title: 'Plantilla de Problema Semanal Aules', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6240866' },
      { id: 'mat-m2', title: 'Solucionari Ficha Potencias Aules', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6410507' },
      { id: 'mat-m3', title: 'Solucions Pàg. 23 (Act. 72-75)', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6410510' },
    ],
  },

  // LLENGUA CASTELLANA I LITERATURA 2º ESO C
  {
    id: 'cas-t1',
    subjectId: 'CAS_2ESO',
    unitNumber: 1,
    title: 'Normas de Ortografía: Acentuación, Diptongos e Hiatos',
    summary: 'Reglas de acentuación de agudas, llanas y esdrújulas. Vocales abiertas/cerradas y tildes en hiatos.',
    status: 'in_progress',
    flashcardCount: 2,
    materials: [
      { id: 'cas-m1', title: 'Normas de Acentuación (Infografía Aules)', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6406995' },
      { id: 'cas-m2', title: 'Diptongos e Hiatos (Infografía Aules)', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6406998' },
    ],
  },
  {
    id: 'cas-t2',
    subjectId: 'CAS_2ESO',
    unitNumber: 2,
    title: 'Morfología: Determinantes, Pronombres y Sustantivos',
    summary: 'Diferencia entre determinante y pronombre. Tipos de sustantivos (común, propio, concreto, abstracto).',
    status: 'in_progress',
    flashcardCount: 1,
    materials: [
      { id: 'cas-m3', title: 'Determinantes y Pronombres (Infografía Aules)', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6331643' },
      { id: 'cas-m4', title: 'Tipos de Sustantivos (Infografía Aules)', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6407136' },
    ],
  },

  // GEOGRAFIA I HISTÒRIA 2º ESO C
  {
    id: 'his-t1',
    subjectId: 'HIS_2ESO',
    unitNumber: 1,
    title: 'Tema 1: La fragmentació del món antic',
    summary: 'Fi de l\'Imperi Romà d\'Occident, els regnes germànics, el regne visigot de Toledo, Bizanci i conquesta musulmana (711).',
    status: 'in_progress',
    flashcardCount: 3,
    materials: [
      { id: 'his-m1', title: 'Document oficial Tema 1 Història Aules (PDF)', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/mod/folder/view.php?id=6378782' },
    ],
  },

  // EDUCACIÓ PLÀSTICA I VISUAL 2º ESO C
  {
    id: 'pla-t1',
    subjectId: 'PLA_2ESO',
    unitNumber: 1,
    title: 'Geometria plana: Paral·leles, Mediatriu i Bisectriu',
    summary: 'Traçat geomètric amb compàs i regle: traçar la mediatriu d\'un segment i la bisectriu d\'un angle.',
    status: 'in_progress',
    flashcardCount: 2,
    materials: [
      { id: 'pla-m1', title: 'Apunts Mediatriu i Bisectriu Aules', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6432088' },
      { id: 'pla-m2', title: 'Fitxa de pràctiques Mediatriu i Bisectriu', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6432089' },
      { id: 'pla-m3', title: 'Vídeo explicatiu Mediatriu i Bisectriu', type: 'notes', url: 'https://aules.edu.gva.es/eso46/mod/url/view.php?id=6432090' },
    ],
  },

  // EDUCACIÓ FÍSICA 2º ESO C
  {
    id: 'efi-t1',
    subjectId: 'EFI_2ESO',
    unitNumber: 1,
    title: 'Condició física i salut: Músculs i Pulsacions (ZAS)',
    summary: 'Anatomia muscular bàsica, estiraments, càlcul de la FCM (220-edat) i Zona d\'Activitat Saludable (60-85%).',
    status: 'in_progress',
    flashcardCount: 1,
    materials: [
      { id: 'efi-m1', title: 'Tasca Aules: Els músculs i com estirar-los', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/assign/view.php?id=6286907' },
      { id: 'efi-m2', title: 'Tasca Aules: Fitxa Zona Activitat Saludable', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/assign/view.php?id=6398258' },
    ],
  },
  {
    id: 'efi-t2',
    subjectId: 'EFI_2ESO',
    unitNumber: 2,
    title: 'Pilota Valenciana: Del Nyago al Raspall',
    summary: 'Regles bàsiques, confecció del guant protector de pilota i modalitats (Escala i corda vs Raspall).',
    status: 'pending',
    flashcardCount: 1,
    materials: [
      { id: 'efi-m3', title: 'Apunts Nyago i Raspall Aules', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/mod/resource/view.php?id=6235512' },
      { id: 'efi-m4', title: 'Vídeo creació guant de pilota', type: 'notes', url: 'https://aules.edu.gva.es/eso46/mod/url/view.php?id=6235510' },
    ],
  },

  // VALENCIÀ: LLENGUA I LITERATURA 2º ESO C
  {
    id: 'val-t1',
    subjectId: 'VAL_2ESO',
    unitNumber: 1,
    title: 'Ortografia: Accentuació general i diacrítica',
    summary: 'Regles d\'accentuació (agudes, planes, esdrúixoles). Accents oberts (`) i tancats (´). Llista de mots amb accent diacrític.',
    status: 'in_progress',
    flashcardCount: 3,
    materials: [
      { id: 'val-m1', title: 'Aules Valencià: Curs i recursos oficials', type: 'aules', url: 'https://aules.edu.gva.es/eso46/course/view.php?id=401813' },
      { id: 'val-m2', title: 'Fitxa de repàs: Accentuació diacrítica', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/course/view.php?id=401813' },
    ],
  },
  {
    id: 'val-t2',
    subjectId: 'VAL_2ESO',
    unitNumber: 2,
    title: 'Morfosintaxi: L\'apòstrof i les contraccions',
    summary: 'Regles d\'apostrofació dels articles el/la i de la preposició de. Contraccions (al, del, pel, cal).',
    status: 'pending',
    flashcardCount: 2,
    materials: [
      { id: 'val-m3', title: 'Guia d\'apostrofació i casos especials', type: 'notes', url: 'https://aules.edu.gva.es/eso46/course/view.php?id=401813' },
    ],
  },

  // MÚSICA 2º ESO C
  {
    id: 'mus-t1',
    subjectId: 'MUS_2ESO',
    unitNumber: 1,
    title: 'Llenguatge musical: Melodia, Textura i Ritme',
    summary: 'Concepte de melodia, tipus de textura musical (monodia, homofonia, polifonia) i jocs de ritme.',
    status: 'in_progress',
    flashcardCount: 2,
    materials: [
      { id: 'mus-m1', title: 'Teoria: La textura musical Aules', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/url/view.php?id=6327749' },
      { id: 'mus-m2', title: 'Teoria: La melodia Aules', type: 'aules', url: 'https://aules.edu.gva.es/eso46/mod/url/view.php?id=6327731' },
      { id: 'mus-m3', title: 'Accés a les partitures de flauta', type: 'pdf', url: 'https://aules.edu.gva.es/eso46/mod/url/view.php?id=6327765' },
    ],
  },
];

export function getStoredTopics(): Topic[] {
  const data = localStorage.getItem('arnau_topics_2eso_v2');
  return data ? JSON.parse(data) : INITIAL_TOPICS;
}

export function saveStoredTopics(topics: Topic[]) {
  localStorage.setItem('arnau_topics_2eso_v2', JSON.stringify(topics));
}
