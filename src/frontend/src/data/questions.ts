export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}

export type Category = "Math" | "Science" | "Literacy" | "Global Education";

export const CATEGORIES: {
  id: Category;
  emoji: string;
  color: string;
  buttonColor: string;
  description: string;
}[] = [
  {
    id: "Math",
    emoji: "📐",
    color: "from-blue-400 to-edu-blue",
    buttonColor: "bg-edu-blue hover:bg-edu-blue/80",
    description:
      "Numbers, geometry, algebra and more. Sharpen your math skills!",
  },
  {
    id: "Science",
    emoji: "🔬",
    color: "from-edu-green to-teal-500",
    buttonColor: "bg-edu-green hover:bg-edu-green/80",
    description: "Explore physics, biology, chemistry and the natural world!",
  },
  {
    id: "Literacy",
    emoji: "📚",
    color: "from-edu-purple to-violet-500",
    buttonColor: "bg-edu-purple hover:bg-edu-purple/80",
    description: "Words, grammar, literature and language arts adventures!",
  },
  {
    id: "Global Education",
    emoji: "🌍",
    color: "from-edu-orange to-edu-yellow",
    buttonColor: "bg-edu-orange hover:bg-edu-orange/80",
    description:
      "Learn about SDG4, global goals, and quality education for all!",
  },
];

export const QUESTIONS: Record<Category, Question[]> = {
  Math: [
    {
      id: 1,
      question: "What is 15 × 8?",
      options: ["110", "120", "130", "115"],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "What is the square root of 144?",
      options: ["11", "13", "12", "14"],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "If a rectangle has width 6 and length 9, what is its area?",
      options: ["30", "54", "45", "48"],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "What is 25% of 200?",
      options: ["40", "50", "45", "55"],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "What is 7³?",
      options: ["21", "343", "147", "49"],
      correctIndex: 1,
    },
    {
      id: 6,
      question: "Solve: 3x + 6 = 21. What is x?",
      options: ["4", "6", "5", "7"],
      correctIndex: 2,
    },
    {
      id: 7,
      question: "What is the perimeter of a square with side 7?",
      options: ["28", "49", "14", "21"],
      correctIndex: 0,
    },
    {
      id: 8,
      question: "What is 1/4 + 1/2?",
      options: ["2/3", "3/4", "1/3", "2/4"],
      correctIndex: 1,
    },
    {
      id: 9,
      question: "How many degrees are in a triangle?",
      options: ["270", "360", "180", "90"],
      correctIndex: 2,
    },
    {
      id: 10,
      question: "What is 5! (5 factorial)?",
      options: ["25", "60", "120", "100"],
      correctIndex: 2,
    },
  ],
  Science: [
    {
      id: 1,
      question: "What planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      correctIndex: 2,
    },
    {
      id: 2,
      question: "What gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "What is the chemical symbol for water?",
      options: ["WO", "H₂O", "HO", "W₂O"],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "How many bones are in the adult human body?",
      options: ["196", "206", "216", "186"],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "What force keeps us on Earth?",
      options: ["Magnetism", "Friction", "Gravity", "Inertia"],
      correctIndex: 2,
    },
    {
      id: 6,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"],
      correctIndex: 1,
    },
    {
      id: 7,
      question: "What is the approximate speed of light?",
      options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
      correctIndex: 0,
    },
    {
      id: 8,
      question: "What type of rock is formed by cooling lava?",
      options: ["Sedimentary", "Metamorphic", "Igneous", "Limestone"],
      correctIndex: 2,
    },
    {
      id: 9,
      question: "What is the largest organ in the human body?",
      options: ["Liver", "Lungs", "Skin", "Brain"],
      correctIndex: 2,
    },
    {
      id: 10,
      question: "How many chromosomes do humans normally have?",
      options: ["23", "36", "46", "48"],
      correctIndex: 2,
    },
  ],
  Literacy: [
    {
      id: 1,
      question: "What is a synonym for 'happy'?",
      options: ["Sad", "Joyful", "Angry", "Tired"],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "What punctuation mark ends a question?",
      options: ["Period", "Comma", "Question Mark", "Exclamation"],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "Who wrote Romeo and Juliet?",
      options: ["Dickens", "Austen", "Shakespeare", "Hemingway"],
      correctIndex: 2,
    },
    {
      id: 4,
      question: "What is a 'metaphor'?",
      options: [
        "A type of poem",
        "Comparing without like/as",
        "A rhyme",
        "A story",
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "What is the antonym of 'ancient'?",
      options: ["Old", "Modern", "Historic", "Classic"],
      correctIndex: 1,
    },
    {
      id: 6,
      question: "How many letters are in the English alphabet?",
      options: ["24", "25", "26", "27"],
      correctIndex: 2,
    },
    {
      id: 7,
      question: "What is the main character in a story called?",
      options: ["Narrator", "Antagonist", "Protagonist", "Author"],
      correctIndex: 2,
    },
    {
      id: 8,
      question: "Which of these is a vowel?",
      options: ["B", "C", "D", "E"],
      correctIndex: 3,
    },
    {
      id: 9,
      question: "What does 'autobiography' mean?",
      options: [
        "Story about cars",
        "Story about nature",
        "Story written about oneself",
        "Story about the future",
      ],
      correctIndex: 2,
    },
    {
      id: 10,
      question: "What literary device is 'the wind whispered'?",
      options: ["Simile", "Metaphor", "Personification", "Alliteration"],
      correctIndex: 2,
    },
  ],
  "Global Education": [
    {
      id: 1,
      question: "What does SDG stand for?",
      options: [
        "Special Development Goals",
        "Sustainable Development Goals",
        "Social Development Goals",
        "Student Development Groups",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Which UN Goal focuses on quality education?",
      options: ["SDG 2", "SDG 3", "SDG 4", "SDG 5"],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "Approximately how many children are out of school globally?",
      options: ["50 million", "100 million", "244 million", "500 million"],
      correctIndex: 2,
    },
    {
      id: 4,
      question: "What year did the Sustainable Development Goals begin?",
      options: ["2010", "2013", "2015", "2018"],
      correctIndex: 2,
    },
    {
      id: 5,
      question:
        "Which continent has the highest rate of out-of-school children?",
      options: ["Asia", "Africa", "Europe", "Americas"],
      correctIndex: 1,
    },
    {
      id: 6,
      question: "What does 'literacy' mean?",
      options: [
        "Being smart",
        "Ability to read and write",
        "Going to school",
        "Passing exams",
      ],
      correctIndex: 1,
    },
    {
      id: 7,
      question: "How many SDGs are there in total?",
      options: ["10", "15", "17", "20"],
      correctIndex: 2,
    },
    {
      id: 8,
      question: "What organization leads global education initiatives?",
      options: ["WHO", "UNESCO", "UNICEF", "WTO"],
      correctIndex: 1,
    },
    {
      id: 9,
      question: "By what year do SDGs aim to be achieved?",
      options: ["2025", "2030", "2035", "2040"],
      correctIndex: 1,
    },
    {
      id: 10,
      question: "What does 'inclusive education' mean?",
      options: [
        "Only gifted students",
        "Online learning",
        "Education for all regardless of differences",
        "Private schooling",
      ],
      correctIndex: 2,
    },
  ],
};
