const quizData = [
  {
    question: "Which Vikings executive was hired as general manager in 2022, marking a major front office shift?",
    options: ["Rick Spielman", "Kwesi Adofo-Mensah", "George Paton", "Rob Brzezinski"],
    answer: 1
  },
  {
    question: "In the 2022 season, how many regular season games did the Vikings lose?",
    options: ["3", "4", "5", "6"],
    answer: 0
  },
  {
    question: "Who did the Vikings face in the Wild Card playoff game on January 15, 2023?",
    options: ["San Francisco 49ers", "Philadelphia Eagles", "New York Giants", "Dallas Cowboys"],
    answer: 2
  },
  {
    question: "Which Vikings defender recorded a pick-six against Josh Allen in the 2022 overtime thriller vs. the Bills?",
    options: ["Patrick Peterson", "Camryn Bynum", "Harrison Smith", "Eric Kendricks"],
    answer: 0
  },
  {
    question: "What nickname has quarterback Kirk Cousins earned among Vikings fans?",
    options: ["Captain Kirk", "The Viking Cannon", "Purple Rainmaker", "Skol Commander"],
    answer: 0
  },
];

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score-display");
const restartButton = document.getElementById("restart-button");
const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-button");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let correctAnswer;

// ==============================
// Load Start Page
// ==============================
startButton.onclick = () => {
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  loadQuestion();
};

// Hide quiz on load, show start page
quizContainer.classList.add("hidden");
scoreContainer.classList.add("hidden");
startContainer.classList.remove("hidden");

// ==============================
// Load a Question
// ==============================
function loadQuestion() {
  const { question, options, answer } = quizData[currentQuestionIndex];
  questionContainer.textContent = question;
  optionsContainer.innerHTML = "";
  correctAnswer= answer;
  
  // Render choices
  options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectOption(index);
    optionsContainer.appendChild(btn);
  });

  nextButton.classList.add("hidden"); // Hide "Next" until answered
  answered = false; 
}

// ==============================
// Handles Answer Selection
// ==============================
function selectOption(selected) {

  if (answered) return; // Prevent multiple scoring
  answered = true;

  Array.from(optionsContainer.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctAnswer) {
      btn.classList.add("correct"); // Highlight correct
    } else if (i === selected) {
      btn.classList.add("incorrect"); // Highlight wrong choice
    }
  });

  // Update score if correct
  if (selected === correctAnswer) score++;
  nextButton.classList.remove("hidden"); // Show "Next" button
}

// ==============================
// Move to Next Question or Show Score
// ==============================
nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion(); // Load next question
  } else {
    showScore(); // Show final score
  }
};

// ==============================
// Display Final Score
// ==============================
function showScore() {
  quizContainer.classList.add("hidden"); // Hide quiz container
  scoreContainer.classList.remove("hidden"); // Show score container
  scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}`;
}

// ==============================
// Restart Quiz
// ==============================
restartButton.onclick = () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden"); // Hide score container
  quizContainer.classList.remove("hidden"); // Show quiz container
  loadQuestion(); // Restart quiz
};

// ==============================
// Start Quiz
// ==============================

loadQuestion();
