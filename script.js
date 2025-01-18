// Global variables
let questions = [];             // Initialize empty array for questions
let currentQuestionIndex = 0;   // to keep track of the current question

async function fetchQuestions() {
    try {
        const response = await fetch('https://www.tassell.se/apis/quiz.php?key=5cf19af194310e4f16c1a3b41ae690b3');
        const data = await response.json();
        questions = data.questions;
        populateQuestion(questions[currentQuestionIndex]); // Start the quiz
    } catch (error) {
        console.error("Failed to fetch questions:", error);
        alert("Unable to load questions. Please try again later.");
    }
}
  
function populateQuestion(questionData) {
    // Set the question text
    const questionText = document.getElementById("questionText");
    questionText.textContent = questionData.question;

    // Get all answer buttons
    const buttons = document.querySelectorAll(".answer-button");

    // Populate the text of each answer button
    buttons.forEach((button, index) => {
        button.textContent = questionData.answers[index];

        // Update event listener for the current button
        button.onclick = () => {
            handleAnswerClick(index, questionData.correct);
        };
    });

    // Reset feedback text when a new question is displayed
    document.getElementById("feedbackText").textContent = "";
    document.getElementById("feedbackText").style.color = "darkslategray";
    if (!feedbackText) {
        console.error("Feedback element not found!");
        return;
    }

    // Update the progress display
    const progress = document.getElementById("progress");
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Function to check if answer is correct or not
function handleAnswerClick(clickedIndex, correctIndex) {
    const feedbackText = document.getElementById("feedbackText");

    if (!feedbackText) {
        console.error("Feedback element not found!");
        return;
    }

    // If answer correct, tell user it is correct and move on to the next question
    if (clickedIndex === correctIndex) {
        feedbackText.textContent = "Correct!";
        feedbackText.style.color = "green";

        // Increment index to next question
        currentQuestionIndex++;

        // Check if there even are more questions
        if (currentQuestionIndex < questions.length) {
            populateQuestion(questions[currentQuestionIndex]);
        } else {
            feedbackText.textContent = "You've completed the quiz! Clever bugger.";
        }
    } else {
        feedbackText.textContent = "Try again, sucker.";
        feedbackText.style.color = "red";
    }
}   


// Start by fetching the questions from the API
fetchQuestions();