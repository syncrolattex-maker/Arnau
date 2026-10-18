import type {
  SubjectInfo,
  DailyTask,
  ExamCountdown,
  Flashcard,
  FriendPresence,
  SharedIsland,
  StudySessionRecord,
} from '../types';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'FYQ_2ESO',
    name: 'Física i Química',
    code: 'FYQ',
    color: '#7209b7',
    category: 'stem',
    icon: '⚡',
    recommendedMinimumRatio: 0.20,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=412211',
  },
  {
    id: 'MAT_2ESO',
    name: 'Matemàtiques',
    code: 'MAT',
    color: '#e63946',
    category: 'stem',
    icon: '📐',
    recommendedMinimumRatio: 0.20,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=401252',
  },
  {
    id: 'CAS_2ESO',
    name: 'Llengua Castellana i Literatura',
    code: 'CAS',
    color: '#f4a261',
    category: 'language',
    icon: '📖',
    recommendedMinimumRatio: 0.15,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=407618',
  },
  {
    id: 'HIS_2ESO',
    name: 'Geografia i Història',
    code: 'HIS',
    color: '#e76f51',
    category: 'humanities',
    icon: '🌍',
    recommendedMinimumRatio: 0.15,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=410619',
  },
  {
    id: 'VAL_2ESO',
    name: 'Valencià: Llengua i Literatura',
    code: 'VAL',
    color: '#2a9d8f',
    category: 'language',
    icon: '✍️',
    recommendedMinimumRatio: 0.15,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=401813',
  },
  {
    id: 'PLA_2ESO',
    name: 'Educació Plàstica i Visual',
    code: 'PLA',
    color: '#06d6a0',
    category: 'humanities',
    icon: '🎨',
    recommendedMinimumRatio: 0.05,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=402222',
  },
  {
    id: 'EFI_2ESO',
    name: 'Educació Física',
    code: 'EFI',
    color: '#118ab2',
    category: 'stem',
    icon: '🏃',
    recommendedMinimumRatio: 0.05,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=402344',
  },
  {
    id: 'MUS_2ESO',
    name: 'Música',
    code: 'MUS',
    color: '#9b5de5',
    category: 'humanities',
    icon: '🎵',
    recommendedMinimumRatio: 0.05,
    aulesUrl: 'https://aules.edu.gva.es/eso46/course/view.php?id=408204',
  },
];

const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    title: 'Resoldre Problema 6 de Matemàtiques (Full setmanal)',
    timeEstimateMinutes: 25,
    completed: false,
    subjectId: 'MAT_2ESO',
    timeAlert: '17:00',
  },
  {
    id: 'task-2',
    title: 'Repassar 10 fitxes SM-2: Magnituds i unitats SI (Física i Química)',
    timeEstimateMinutes: 15,
    completed: false,
    subjectId: 'FYQ_2ESO',
    timeAlert: '17:30',
  },
  {
    id: 'task-3',
    title: 'Fitxa Aules: Regles de diftongs i hiats (Castellà)',
    timeEstimateMinutes: 20,
    completed: false,
    subjectId: 'CAS_2ESO',
    timeAlert: '18:00',
  },
  {
    id: 'task-4',
    title: 'Llegir Tema 1 Història: Els Visigots i el regne de Toledo',
    timeEstimateMinutes: 25,
    completed: false,
    subjectId: 'HIS_2ESO',
    timeAlert: '18:30',
  },
  {
    id: 'task-5',
    title: 'Dibuix tècnic: Traçar mediatriu i bisectriu (Plàstica)',
    timeEstimateMinutes: 20,
    completed: false,
    subjectId: 'PLA_2ESO',
    timeAlert: '19:00',
  },
];

const INITIAL_EXAMS: ExamCountdown[] = [
  {
    id: 'exam-1',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física i Química',
    examTitle: 'Control Temes 1 i 2: Mètode Científic i Magnituds SI',
    targetDate: '2026-10-22',
    daysRemaining: 4,
    color: '#7209b7',
  },
  {
    id: 'exam-2',
    subjectId: 'MAT_2ESO',
    subjectName: 'Matemàtiques',
    examTitle: 'Avaluació Tema 1: Potències, Fraccions i Problemes',
    targetDate: '2026-10-26',
    daysRemaining: 8,
    color: '#e63946',
  },
  {
    id: 'exam-3',
    subjectId: 'CAS_2ESO',
    subjectName: 'Llengua Castellana',
    examTitle: 'Prova d\'Ortografia: Acentuació, Diftongs i Determinants',
    targetDate: '2026-10-29',
    daysRemaining: 11,
    color: '#f4a261',
  },
  {
    id: 'exam-4',
    subjectId: 'HIS_2ESO',
    subjectName: 'Geografia i Història',
    examTitle: 'Examen Tema 1: Fi de l\'Imperi Romà, Visigots i Bizanci',
    targetDate: '2026-11-04',
    daysRemaining: 17,
    color: '#e76f51',
  },
];

const INITIAL_FLASHCARDS: Flashcard[] = [
  // FÍSICA I QUÍMICA 2º ESO - TEMA 1: EL MÈTODE CIENTÍFIC (AULES GVA)
  {
    id: 'aules-fyq-1',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física i Química',
    topicId: 'fyq-t1',
    topicTitle: 'Tema 1: El mètode científic',
    sourceAules: true,
    question: 'Què és la ciència segons el tema d\'Aules?',
    answer: 'Són els coneixements que adquireix l\'ésser humà quan estudia la naturalesa a través d\'un mètode ordenat anomenat mètode científic.',
    cornellKeyIdea: 'Ciència: coneixements mitjançant el mètode científic.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-fyq-2',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física i Química',
    topicId: 'fyq-t1',
    topicTitle: 'Tema 1: El mètode científic',
    sourceAules: true,
    question: 'Quins són els 6 passos ordenats del mètode científic?',
    answer: '1. Identificar el problema (pregunta)\n2. Observació (obtenir informació sense modificar el fenomen)\n3. Hipòtesi (suposició raonada)\n4. Experimentació\n5. Resultats\n6. Conclusions.',
    cornellKeyIdea: '6 passos: Problema -> Observació -> Hipòtesi -> Experimentació -> Resultats -> Conclusions.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-fyq-3',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física i Química',
    topicId: 'fyq-t1',
    topicTitle: 'Tema 1: El mètode científic',
    sourceAules: true,
    question: 'Quina és la diferència entre Química i Física?',
    answer: 'La Química estudia la composició, estructura i canvis de la matèria (reaccions químiques). La Física estudia la relació entre matèria i energia (moviment, forces, calor, llum, electricitat).',
    cornellKeyIdea: 'Química: composició i reaccions. Física: matèria, forces i energia.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // FÍSICA I QUÍMICA 2º ESO - TEMA 2: MAGNITUDS I UNITATS (AULES GVA)
  {
    id: 'aules-fyq-4',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física i Química',
    topicId: 'fyq-t2',
    topicTitle: 'Tema 2: Magnituds i unitats',
    sourceAules: true,
    question: 'Què és una magnitud física i quins exemples NO ho són?',
    answer: 'Magnitud és qualsevol propietat dels cossos que es pot mesurar (massa, longitud, temperatura). No són magnituds propietats no mesurables (color, bellesa, sabor) o valors com el preu en diners.',
    cornellKeyIdea: 'Magnitud: propietat mesurable. Bellesa o preu NO ho són.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-fyq-5',
    subjectId: 'FYQ_2ESO',
    subjectName: 'Física i Química',
    topicId: 'fyq-t2',
    topicTitle: 'Tema 2: Magnituds i unitats',
    sourceAules: true,
    question: 'Quines són les 7 unitats fonamentals del Sistema Internacional (SI)?',
    answer: '1. Longitud: metre (m)\n2. Massa: quilogram (kg)\n3. Temps: segon (s)\n4. Intensitat elèctrica: ampere (A)\n5. Temperatura: kelvin (K)\n6. Quantitat de substància: mol (mol)\n7. Intensitat lluminosa: candela (cd).',
    cornellKeyIdea: '7 SI fonamentals: m, kg, s, A, K, mol, cd.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // LLENGUA CASTELLANA 2º ESO - ORTOGRAFIA I GRAMÀTICA (AULES GVA)
  {
    id: 'aules-cas-1',
    subjectId: 'CAS_2ESO',
    subjectName: 'Llengua Castellana i Literatura',
    topicId: 'cas-t1',
    topicTitle: 'Diftongos i Hiatos',
    sourceAules: true,
    question: '¿Cuáles son las vocales abiertas y cerradas y cómo se forma un diptongo?',
    answer: 'Abiertas (fuertes): A, E, O. Cerradas (débiles): I, U.\nUn diptongo es la unión de dos vocales en una misma sílaba: Abierta + Cerrada átona (ej. aire) o dos Cerradas distintas (ej. ciudad).',
    cornellKeyIdea: 'Abiertas: A,E,O. Cerradas: I,U. Diptongo: 1 sola sílaba.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-cas-2',
    subjectId: 'CAS_2ESO',
    subjectName: 'Llengua Castellana i Literatura',
    topicId: 'cas-t1',
    topicTitle: 'Diftongos i Hiatos',
    sourceAules: true,
    question: '¿Cuándo se produce un hiato y cuándo lleva tilde obligatoria?',
    answer: 'Un hiato son dos vocales seguidas que se pronuncian en sílabas distintas. Cuando se combina Vocal Abierta + Vocal Cerrada TÓNICA (o viceversa), siempre lleva tilde en la cerrada, aunque contradiga las reglas generales (ej. ma-rí-a, sa-lís, ba-úl).',
    cornellKeyIdea: 'Hiato Abierta + Cerrada tónica: SIEMPRE tilde en la cerrada (baúl, María).',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-cas-3',
    subjectId: 'CAS_2ESO',
    subjectName: 'Llengua Castellana i Literatura',
    topicId: 'cas-t2',
    topicTitle: 'Determinants i Pronoms',
    sourceAules: true,
    question: '¿Cómo distinguir con seguridad un Determinante de un Pronombre?',
    answer: 'El determinante SIEMPRE acompaña a un sustantivo y concuerda con él (ej. "este libro"). El pronombre SUSTITUYE al sustantivo y nunca va delante de él (ej. "este es el mío").',
    cornellKeyIdea: 'Determinante: acompaña al nombre. Pronombre: lo sustituye.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // MATEMÀTIQUES 2º ESO - OPERACIONS, POTÈNCIES I FRACCIONS (AULES GVA)
  {
    id: 'aules-mat-1',
    subjectId: 'MAT_2ESO',
    subjectName: 'Matemàtiques',
    topicId: 'mat-t1',
    topicTitle: 'Potències i Fraccions',
    sourceAules: true,
    question: 'Quina és la regla de multiplicació i divisió de potències amb la mateixa base?',
    answer: 'Per a multiplicar potències de la mateixa base, es manté la base i se SUMEN els exponents: a^m · a^n = a^(m+n).\nPer a dividir, es manté la base i es RESTEN els exponents: a^m / a^n = a^(m-n).',
    cornellKeyIdea: 'Mateixa base: multiplicar -> suma exponents. Dividir -> resta exponents.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-mat-2',
    subjectId: 'MAT_2ESO',
    subjectName: 'Matemàtiques',
    topicId: 'mat-t1',
    topicTitle: 'Potències i Fraccions',
    sourceAules: true,
    question: 'Quant val qualsevol nombre elevat a zero (a^0) i què passa amb un exponent negatiu (a^-n)?',
    answer: 'Qualsevol nombre diferent de zero elevat a zero és igual a 1 (a^0 = 1).\nUn exponent negatiu indica l\'invers de la potència: a^-n = 1 / (a^n).',
    cornellKeyIdea: 'a^0 = 1. Exponent negatiu: a^-n = 1 / a^n.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // GEOGRAFIA I HISTÒRIA 2º ESO - TEMA 1: FI DE L'IMPERI ROMÀ I ELS VISIGOTS (AULES GVA)
  {
    id: 'aules-his-1',
    subjectId: 'HIS_2ESO',
    subjectName: 'Geografia i Història',
    topicId: 'his-t1',
    topicTitle: 'Tema 1: La fragmentació del món antic',
    sourceAules: true,
    question: 'Quin poble germànic es va establir a Hispània i quina ciutat van establir com a capital?',
    answer: 'Els Visigots. Després de ser derrotats pels Francs a la batalla de Vouillé (507) i expulsats de Tolosa, es van expandir per Hispània i van fixar la seua capital a Toledo.',
    cornellKeyIdea: 'Visigots a Hispània: Batalla de Vouillé (507) -> Capital a Toledo.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-his-2',
    subjectId: 'HIS_2ESO',
    subjectName: 'Geografia i Història',
    topicId: 'his-t1',
    topicTitle: 'Tema 1: La fragmentació del món antic',
    sourceAules: true,
    question: 'Com s\'organitzava el govern del regne visigot de Toledo?',
    answer: 'La monarquia era forta (primer electiva i després hereditària). El rei es recolzava en l\'Aula Règia (òrgan assessor de nobles) i els Concilis de Toledo (assemblees religioses i civils).',
    cornellKeyIdea: 'Govern visigot: Rei + Aula Règia (assessors) + Concilis de Toledo.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-his-3',
    subjectId: 'HIS_2ESO',
    subjectName: 'Geografia i Història',
    topicId: 'his-t1',
    topicTitle: 'Tema 1: La fragmentació del món antic',
    sourceAules: true,
    question: 'Quin any es va produir la conquesta musulmana que va posar fi al regne visigot?',
    answer: 'L\'any 711. Un exèrcit musulmà del nord d\'Àfrica va derrotar l\'últim rei visigot, Don Rodrigo, a la batalla de Guadalete i va ocupar la major part de la Península.',
    cornellKeyIdea: '711: Derrota de Don Rodrigo i fi del regne visigot a Hispània.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // EDUCACIÓ PLÀSTICA I VISUAL 2º ESO - DIBUIX TÈCNIC (AULES GVA)
  {
    id: 'aules-pla-1',
    subjectId: 'PLA_2ESO',
    subjectName: 'Educació Plàstica i Visual',
    topicId: 'pla-t1',
    topicTitle: 'Geometria: Mediatriu i Bisectriu',
    sourceAules: true,
    question: 'Què és la mediatriu d\'un segment i com es traça amb compàs?',
    answer: 'És la recta perpendicular a un segment que passa pel seu punt mitjà. Es traça obrint el compàs amb radi superior a la meitat del segment des dels dos extrems i unint els punts d\'intersecció dels dos arcs.',
    cornellKeyIdea: 'Mediatriu: perpendicular que talla un segment pel punt mitjà exacte.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-pla-2',
    subjectId: 'PLA_2ESO',
    subjectName: 'Educació Plàstica i Visual',
    topicId: 'pla-t1',
    topicTitle: 'Geometria: Mediatriu i Bisectriu',
    sourceAules: true,
    question: 'Què és la bisectriu d\'un angle?',
    answer: 'És la semirecta que passa pel vèrtex d\'un angle i el divideix en dues parts exactament iguals.',
    cornellKeyIdea: 'Bisectriu: semirecta que divideix un angle en dues meitats iguals.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // EDUCACIÓ FÍSICA 2º ESO - SALUT I PILOTA VALENCIANA (AULES GVA)
  {
    id: 'aules-efi-1',
    subjectId: 'EFI_2ESO',
    subjectName: 'Educació Física',
    topicId: 'efi-t1',
    topicTitle: 'Condició Física i Salut',
    sourceAules: true,
    question: 'Com es calcula la Freqüència Cardíaca Màxima (FCM) i què és la Zona d\'Activitat Saludable (ZAS)?',
    answer: 'FCM teòrica = 220 - edat (per a 14 anys = 206 pulsacions/min). La Zona d\'Activitat Saludable (ZAS) se situa entre el 60% i el 85% de la FCM, on l\'exercici aeròbic millora el cor sense risc.',
    cornellKeyIdea: 'FCM = 220 - edat. ZAS saludable: entre 60% i 85% de la FCM.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-efi-2',
    subjectId: 'EFI_2ESO',
    subjectName: 'Educació Física',
    topicId: 'efi-t2',
    topicTitle: 'Pilota Valenciana',
    sourceAules: true,
    question: 'Quina diferència bàsica hi ha entre la modalitat d\'escala i corda i el raspall?',
    answer: 'En l\'escala i corda la pilota passa per damunt d\'una corda a l\'aire. En el raspall no hi ha corda i la pilota es pot jugar i colpejar arran de terra (raspant el carrer o trinquet).',
    cornellKeyIdea: 'Escala i corda: per damunt de corda. Raspall: sense corda, arran de terra.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // VALENCIÀ: LLENGUA I LITERATURA 2º ESO - ORTOGRAFIA I ACCENTUACIÓ (AULES GVA)
  {
    id: 'aules-val-1',
    subjectId: 'VAL_2ESO',
    subjectName: 'Valencià: Llengua i Literatura',
    topicId: 'val-t1',
    topicTitle: 'Ortografia: Accentuació general i diacrítica',
    sourceAules: true,
    question: 'Quines són les regles generals d\'accentuació en valencià per a paraules agudes, planes i esdrúixoles?',
    answer: 'Agudes: s\'accentuen si acaben en vocal, vocal+s, -en, -in (ex. cantà, aprén, Berlín).\nPlanes: s\'accentuen si NO acaben en les terminacions de les agudes (ex. àgil, cèntims).\nEsdrúixoles: s\'accentuen SEMPRE (ex. música, història, ciència).',
    cornellKeyIdea: 'Agudes: vocal, vocal+s, -en, -in. Planes: el contrari. Esdrúixoles: sempre.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-val-2',
    subjectId: 'VAL_2ESO',
    subjectName: 'Valencià: Llengua i Literatura',
    topicId: 'val-t1',
    topicTitle: 'Ortografia: Accentuació general i diacrítica',
    sourceAules: true,
    question: 'Com s\'accentuen les vocals obertes i tancades en valencià?',
    answer: 'La "a" sempre porta accent obert (à).\nLa "i" i la "u" sempre porten accent tancat (í, ú).\nLa "e" i la "o" poden ser obertes (è, ò) o tancades (é, ó) segons el timbre vocàlic (ex. cafè/café, però, móra).',
    cornellKeyIdea: 'a: obert (à). i, u: tancat (í, ú). e, o: obert o tancat segons timbre.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-val-3',
    subjectId: 'VAL_2ESO',
    subjectName: 'Valencià: Llengua i Literatura',
    topicId: 'val-t1',
    topicTitle: 'Ortografia: Accentuació general i diacrítica',
    sourceAules: true,
    question: 'Què és l\'accent diacrític i quins exemples clau cal dominar en 2n d\'ESO?',
    answer: 'Distingeix paraules d\'igual grafia amb significats diferents:\n- bé (riquesa / adverbi) vs be (lletra b / xai)\n- mà (extremitat) vs ma (possessiu: ma mare)\n- sé (verb saber) vs se (pronom)\n- són (verb ser) vs son (ganes de dormir)\n- pèl (borra/cabell) vs pel (per + el).',
    cornellKeyIdea: 'Accent diacrític: distingeix monosíl·labs (bé/be, mà/ma, sé/se, són/son, pèl/pel).',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },

  // MÚSICA 2º ESO - TEXTURA I MELODIA (AULES GVA)
  {
    id: 'aules-mus-1',
    subjectId: 'MUS_2ESO',
    subjectName: 'Música',
    topicId: 'mus-t1',
    topicTitle: 'Llenguatge musical: Melodia, Textura i Ritme',
    sourceAules: true,
    question: 'Què és la textura musical i quins són els seus tres tipus principals?',
    answer: 'És com es combinen les diferents línies melòdiques i harmòniques:\n1. Monodia: una sola melodia (ex. cant gregorià a l\'uníson).\n2. Homofonia: diverses veus amb el mateix ritme en bloc d\'acords.\n3. Polifonia: diverses línies melòdiques independents que sonen alhora.',
    cornellKeyIdea: 'Textura: Monodia (1 veu), Homofonia (mateix ritme), Polifonia (veus independents).',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
  {
    id: 'aules-mus-2',
    subjectId: 'MUS_2ESO',
    subjectName: 'Música',
    topicId: 'mus-t1',
    topicTitle: 'Llenguatge musical: Melodia, Textura i Ritme',
    sourceAules: true,
    question: 'Què és un interval musical i com es distingeix un interval melòdic d\'un harmònic?',
    answer: 'Un interval és la distància d\'altura entre dues notes musicals.\n- Interval melòdic: les notes sonen successivament (una rere l\'altra, melodia).\n- Interval harmònic: les dues notes sonen simultàniament (alhora, acord).',
    cornellKeyIdea: 'Interval: distància de to. Melòdic: consecutiu. Harmònic: alhora.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: '2026-10-18',
  },
];

const INITIAL_FRIENDS: FriendPresence[] = [
  {
    id: 'f-1',
    name: 'Lucía M.',
    avatar: '🌱',
    currentSubject: 'Física i Química',
    subjectColor: '#7209b7',
    minutesActiveToday: 55,
    isLive: true,
    currentSessionMinutes: 38,
  },
  {
    id: 'f-2',
    name: 'Marc S.',
    avatar: '⚡',
    currentSubject: 'Matemàtiques',
    subjectColor: '#e63946',
    minutesActiveToday: 42,
    isLive: true,
    currentSessionMinutes: 42,
  },
  {
    id: 'f-3',
    name: 'Clara V.',
    avatar: '📐',
    currentSubject: 'Llengua Castellana',
    subjectColor: '#f4a261',
    minutesActiveToday: 60,
    isLive: false,
    currentSessionMinutes: 0,
  },
  {
    id: 'f-4',
    name: 'Hugo R.',
    avatar: '🌍',
    currentSubject: 'Geografia i Història',
    subjectColor: '#e76f51',
    minutesActiveToday: 25,
    isLive: true,
    currentSessionMinutes: 14,
  },
  {
    id: 'f-5',
    name: 'Pau T.',
    avatar: '✍️',
    currentSubject: 'Valencià',
    subjectColor: '#2a9d8f',
    minutesActiveToday: 30,
    isLive: false,
    currentSessionMinutes: 0,
  },
];

const INITIAL_ISLAND: SharedIsland = {
  name: 'Illa 2n ESO C',
  collectiveMinutesToday: 212,
  totalIslandMinutes: 1450,
  level: 4,
  activeBuddiesCount: 3,
  streakDays: 8,
  status: 'flourishing',
};

const INITIAL_SESSIONS: StudySessionRecord[] = [
  {
    id: 's-1',
    student_id: 'arnau-2eso',
    subject_id: 'MAT_2ESO',
    start_timestamp: Date.now() - 3600000 * 2,
    end_timestamp: Date.now() - 3600000 * 1.2,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 48,
    coins_earned: 48,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 's-2',
    student_id: 'arnau-2eso',
    subject_id: 'FYQ_2ESO',
    start_timestamp: Date.now() - 3600000 * 4,
    end_timestamp: Date.now() - 3600000 * 3.3,
    pause_intervals: [],
    device_os: 'Web',
    net_minutes: 42,
    coins_earned: 42,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export function getStoredTasks(): DailyTask[] {
  const data = localStorage.getItem('arnau_tasks_2eso_v2');
  return data ? JSON.parse(data) : INITIAL_TASKS;
}

export function saveStoredTasks(tasks: DailyTask[]) {
  localStorage.setItem('arnau_tasks_2eso_v2', JSON.stringify(tasks));
}

export function getStoredExams(): ExamCountdown[] {
  const data = localStorage.getItem('arnau_exams_2eso_v2');
  return data ? JSON.parse(data) : INITIAL_EXAMS;
}

export function saveStoredExams(exams: ExamCountdown[]) {
  localStorage.setItem('arnau_exams_2eso_v2', JSON.stringify(exams));
}

export function getStoredFlashcards(): Flashcard[] {
  const data = localStorage.getItem('arnau_flashcards_2eso_v2');
  return data ? JSON.parse(data) : INITIAL_FLASHCARDS;
}

export function saveStoredFlashcards(cards: Flashcard[]) {
  localStorage.setItem('arnau_flashcards_2eso_v2', JSON.stringify(cards));
}

export function getStoredCoins(): number {
  const data = localStorage.getItem('arnau_coins_2eso');
  return data ? parseInt(data, 10) : 185;
}

export function saveStoredCoins(coins: number) {
  localStorage.setItem('arnau_coins_2eso', coins.toString());
}

export function getStoredSessions(): StudySessionRecord[] {
  const data = localStorage.getItem('arnau_sessions_2eso');
  return data ? JSON.parse(data) : INITIAL_SESSIONS;
}

export function saveStoredSessions(sessions: StudySessionRecord[]) {
  localStorage.setItem('arnau_sessions_2eso', JSON.stringify(sessions));
}

export function getStoredFriends(): FriendPresence[] {
  return INITIAL_FRIENDS;
}

export function getStoredIsland(): SharedIsland {
  const data = localStorage.getItem('arnau_island_2eso');
  return data ? JSON.parse(data) : INITIAL_ISLAND;
}

export function saveStoredIsland(island: SharedIsland) {
  localStorage.setItem('arnau_island_2eso', JSON.stringify(island));
}

export function getStoredSubjects(): SubjectInfo[] {
  const data = localStorage.getItem('arnau_subjects_2eso_v2');
  return data ? JSON.parse(data) : SUBJECTS;
}

export function saveStoredSubjects(subjects: SubjectInfo[]) {
  localStorage.setItem('arnau_subjects_2eso_v2', JSON.stringify(subjects));
}
