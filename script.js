const form = document.getElementById("start-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const categoryButtons = document.querySelectorAll(".category-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("question-timer");
const questionNumber = document.getElementById("question-number");
const resultText = document.getElementById("result-text");
const answerSheetList = document.getElementById("answer-sheet");

let questions = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "Hyper Text Markup Language",
        "Highlevel Text Management Language"
      ],
      correct: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: "<a>"
    },
    {
      question: "Which tag is used to insert an image?",
      options: ["<pic>", "<image>", "<img>", "<src>"],
      correct: "<img>"
    },
    {
      question: "What is the correct tag for the largest heading?",
      options: ["<h6>", "<head>", "<heading>", "<h1>"],
      correct: "<h1>"
    },
    {
      question: "What does the <br> tag do?",
      options: [
        "Bold text",
        "Insert a break line",
        "Insert a border",
        "Change color"
      ],
      correct: "Insert a break line"
    },
    {
      question: "Which attribute sets the image path?",
      options: ["href", "src", "link", "path"],
      correct: "src"
    },
    {
      question: "Which element creates an unordered list?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      correct: "<ul>"
    },
    {
      question: "Which tag defines a table row?",
      options: ["<td>", "<th>", "<tr>", "<row>"],
      correct: "<tr>"
    },
    {
      question: "Where does the <title> tag appear?",
      options: [
        "Inside <body>",
        "Before <html>",
        "Inside <head>",
        "After <footer>"
      ],
      correct: "Inside <head>"
    },
    {
      question: "Which tag is used to collect user input?",
      options: ["<form>", "<input>", "<label>", "<button>"],
      correct: "<input>"
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheet",
        "Cascading Style Sheet",
        "Creative Style System",
        "Colorful Style Syntax"
      ],
      correct: "Cascading Style Sheet"
    },
    {
      question: "Which property is used to change text color?",
      options: ["text-style", "color", "font-color", "text-color"],
      correct: "color"
    },
    {
      question: "Which CSS property sets the background color?",
      options: ["bg-color", "background", "background-color", "color"],
      correct: "background-color"
    },
    {
      question: "Which value makes a border invisible?",
      options: ["none", "0", "transparent", "hidden"],
      correct: "none"
    },
    {
      question: "What does the 'px' unit stand for in CSS?",
      options: ["Pixel", "Percent", "Point", "Padding"],
      correct: "Pixel"
    },
    {
      question: "How do you make text bold in CSS?",
      options: ["font-weight: bold", "text-style: bold", "weight: bold", "bold: true"],
      correct: "font-weight: bold"
    },
    {
      question: "Which property sets space inside an element?",
      options: ["margin", "border", "padding", "spacing"],
      correct: "padding"
    },
    {
      question: "Which property aligns text to the center?",
      options: ["text-align", "align-text", "center", "position"],
      correct: "text-align"
    },
    {
      question: "What is the default position value in CSS?",
      options: ["relative", "absolute", "static", "fixed"],
      correct: "static"
    },
    {
      question: "Which property controls the font size?",
      options: ["font", "text-size", "font-style", "font-size"],
      correct: "font-size"
    }
  ],
  js: [
    {
      question: "What does JS stand for?",
      options: [
        "JavaSyntax",
        "JustScript",
        "JavaScript",
        "JScript"
      ],
      correct: "JavaScript"
    },
    {
      question: "Which keyword declares a variable?",
      options: ["set", "define", "var", "make"],
      correct: "var"
    },
    {
      question: "Which method shows a message box?",
      options: ["alert()", "print()", "show()", "prompt()"],
      correct: "alert()"
    },
    {
      question: "Which symbol is used for comments?",
      options: ["<!-- -->", "//", "**", "##"],
      correct: "//"
    },
    {
      question: "Which method is used to select an element by ID?",
      options: [
        "getElementByName",
        "querySelectorAll",
        "getElementById",
        "selectId"
      ],
      correct: "getElementById"
    },
    {
      question: "What is the output type of `typeof 5`?",
      options: ["integer", "number", "value", "digit"],
      correct: "number"
    },
    {
      question: "Which operator checks value and type?",
      options: ["==", "=", "===", "!="],
      correct: "==="
    },
    {
      question: "How do you define a function in JS?",
      options: [
        "function myFunc() {}",
        "def myFunc()",
        "func myFunc()",
        "create myFunc()"
      ],
      correct: "function myFunc() {}"
    },
    {
      question: "Which loop repeats until false?",
      options: ["for", "do-while", "while", "if"],
      correct: "while"
    },
    {
      question: "Which event runs code when a button is clicked?",
      options: ["onsubmit", "onhover", "onclick", "onload"],
      correct: "onclick"
    }
  ]
};

function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getRandomQuestions(category) {
  let all = category === "random"
    ? [...questions.html, ...questions.css, ...questions.js]
    : [...questions[category]];
  return all.sort(() => 0.5 - Math.random()).slice(0, 10);
}

let quizData = [], userAnswers = [], currentIndex = 0, timer;

form.onsubmit = e => {
  e.preventDefault();
  document.getElementById("home-page").classList.add("hide");
  document.getElementById("category-page").classList.remove("hide");
};

categoryButtons.forEach(btn => {
  btn.onclick = () => {
    quizData = getRandomQuestions(btn.dataset.category);
    userAnswers = Array(10).fill(null);
    currentIndex = 0;
    document.getElementById("category-page").classList.add("hide");
    document.getElementById("quiz-page").classList.remove("hide");
    loadQuestion();
  };
});

function loadQuestion() {
  clearInterval(timer);
  const q = quizData[currentIndex];
  questionText.textContent = q.question;
  questionNumber.textContent = `Question ${currentIndex + 1}/10`;
  optionsList.innerHTML = "";
  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => {
      userAnswers[currentIndex] = i;
      [...optionsList.children].forEach(l => l.style.borderColor = "transparent");
      li.style.borderColor = "#9b83ff";
    };
    optionsList.appendChild(li);
  });
  startTimer();
}

function startTimer() {
  let time = 30;
  timerEl.textContent = `Time: ${time}s`;
  timer = setInterval(() => {
    time--;
    timerEl.textContent = `Time: ${time}s`;
    if (time <= 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

nextBtn.onclick = () => {
  if (currentIndex < 9) {
    currentIndex++;
    loadQuestion();
  } else {
    showResult();
  }
};

backBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
};

function showResult() {
  clearInterval(timer);
  document.getElementById("quiz-page").classList.add("hide");
  document.getElementById("result-page").classList.remove("hide");

  let score = 0;
  quizData.forEach((q, i) => {
    if (q.options[userAnswers[i]] === q.correct) score++;
  });

  let percentage = Math.round((score / quizData.length) * 100);

  resultText.innerHTML = `
  <div class="result-summary">
    <span><strong>Name:</strong> ${username.value}</span>
    <span><strong>Score:</strong> ${score}/10</span>
    <span><strong>Percentage:</strong> ${percentage}%</span>
    <span><strong>Total Time:</strong> ${10 * 30} seconds</span>
  </div>
`;


  const buttonsDiv = document.querySelector(".result-buttons");
  buttonsDiv.innerHTML = `
    <button class="btn" id="view-answers">View Answer Sheet</button>
    <button class="btn" onclick="location.reload()">Go to Home Page</button>
  `;

  document.getElementById("view-answers").onclick = showAnswerSheet;
}

function showAnswerSheet() {
  document.getElementById("result-page").classList.add("hide");
  document.getElementById("answer-sheet-page").classList.remove("hide");
  answerSheetList.innerHTML = quizData.map((q, i) => {
    const userIndex = userAnswers[i];
    const isCorrect = q.options[userIndex] === q.correct;
    const userAnswerText = userIndex !== null ? escapeHTML(q.options[userIndex]) : "No Answer";
    const correctAnswerText = escapeHTML(q.correct);
    return `
      <li class="${isCorrect ? 'correct' : 'wrong'}">
        <strong>Q${i + 1}:</strong> ${escapeHTML(q.question)}<br>
        <strong>Your Answer:</strong> ${userAnswerText}<br>
        <strong>Correct Answer:</strong> ${correctAnswerText}
      </li>
    `;
  }).join("");
}
