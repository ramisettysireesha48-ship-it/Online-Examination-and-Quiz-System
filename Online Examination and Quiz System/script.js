const questions = [
    {
        question: "Which language is used to create the structure of a web page?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "C++"],
        answer: "CSS"
    },

    {
        question: "Which language is mainly used to add interactivity to websites?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<p>", "<a>", "<h1>", "<img>"],
        answer: "<a>"
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "$"],
        answer: "#"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: "var"
    },

    {
        question: "Which database language is used to manage relational databases?",
        options: ["HTML", "SQL", "CSS", "XML"],
        answer: "SQL"
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        answer: "Central Processing Unit"
    },

    {
        question: "Which device is used to connect computers in a network?",
        options: ["Router", "Monitor", "Keyboard", "Printer"],
        answer: "Router"
    },

    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue"
    }
];

let currentQuestion = 0;
let score = 0;
let studentName = "";
let userAnswers = [];
let timeLeft = 300;
let timerInterval;

/* Start Exam */

function startExam() {

    studentName = document.getElementById("studentName").value.trim();

    if (studentName === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("examScreen").classList.remove("hidden");

    document.getElementById("welcomeText").textContent =
        "Welcome, " + studentName;

    userAnswers = new Array(questions.length).fill(null);

    showQuestion();

    startTimer();
}

/* Display Question */

function showQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    document.getElementById("question").textContent =
        question.question;

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option) {

        const label = document.createElement("label");

        label.className = "option";

        if (userAnswers[currentQuestion] === option) {
            label.classList.add("selected");
        }

        label.innerHTML = `
            <input 
                type="radio" 
                name="answer"
                value="${option}"
                ${userAnswers[currentQuestion] === option ? "checked" : ""}
            >
            ${option}
        `;

        label.querySelector("input").addEventListener("change", function() {

            userAnswers[currentQuestion] = option;

            document.querySelectorAll(".option").forEach(function(item) {
                item.classList.remove("selected");
            });

            label.classList.add("selected");
        });

        optionsContainer.appendChild(label);
    });

    updateProgress();

    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "block";
    } else {
        document.getElementById("nextBtn").style.display = "block";
        document.getElementById("submitBtn").style.display = "none";
    }
}

/* Next Question */

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

/* Previous Question */

function previousQuestion() {

    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

/* Progress Bar */

function updateProgress() {

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";
}

/* Timer */

function startTimer() {

    timerInterval = setInterval(function() {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            alert("Time is over! Your exam will be submitted.");

            submitExam();
        }

    }, 1000);
}

/* Update Timer */

function updateTimer() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

/* Submit Exam */

function submitExam() {

    clearInterval(timerInterval);

    score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }

    const percentage =
        (score / questions.length) * 100;

    document.getElementById("examScreen")
        .classList.add("hidden");

    document.getElementById("resultScreen")
        .classList.remove("hidden");

    document.getElementById("resultName").textContent =
        "Student: " + studentName;

    document.getElementById("scoreText").textContent =
        score + " / " + questions.length +
        " (" + percentage + "%)";

    if (percentage >= 50) {
        document.getElementById("resultMessage").textContent =
            "Congratulations! You have passed the examination.";
    } else {
        document.getElementById("resultMessage").textContent =
            "You did not pass. Keep practicing and try again.";
    }
}

/* Restart Exam */

function restartExam() {

    currentQuestion = 0;
    score = 0;
    timeLeft = 300;

    document.getElementById("resultScreen")
        .classList.add("hidden");

    document.getElementById("startScreen")
        .classList.remove("hidden");

    document.getElementById("studentName").value = "";

    updateTimer();
}