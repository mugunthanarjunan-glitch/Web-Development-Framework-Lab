import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const questionsBank = [
    "What is your favorite color?",
    "What is your hobby?",
    "Where do you see yourself in 5 years?",
    "What motivates you every day?",
    "What is your dream job?",
    "What is your favorite food?",
    "If you could travel anywhere, where would it be?",
    "What is your biggest strength?",
    "What is one skill you wish to learn?",
    "Describe your ideal weekend.",
  ];

  const [randomQuestions, setRandomQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Select 5 random questions when the app loads
  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const shuffled = [...questionsBank].sort(() => 0.5 - Math.random());

    setRandomQuestions(shuffled.slice(0, 5));
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
  };

  const handleChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value,
    });
  };

  const handleNext = () => {
    if (!answers[currentQuestion]?.trim()) {
      alert("Please answer this question before continuing.");
      return;
    }

    if (currentQuestion < randomQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!answers[currentQuestion]?.trim()) {
      alert("Please answer this question before submitting.");
      return;
    }

    const unanswered = randomQuestions.some(
      (_, index) => !answers[index]?.trim()
    );

    if (unanswered) {
      alert("Please answer all 5 questions before submitting.");
      return;
    }

    console.log("Survey Answers:", answers);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="app">
        <div className="survey-container thank-you">
          <div className="success-icon">✓</div>

          <h1>Thank You!</h1>

          <p>
            Your survey has been submitted successfully.
            <br />
            We appreciate your time and feedback.
          </p>

          <div className="result-box">
            <strong>Survey Completed</strong>
            <span>5 / 5 Questions Answered</span>
          </div>

          <button className="primary-btn" onClick={generateQuestions}>
            Take Another Survey
          </button>
        </div>
      </div>
    );
  }

  if (randomQuestions.length === 0) {
    return <div className="loading">Loading survey...</div>;
  }

  const progress = ((currentQuestion + 1) / randomQuestions.length) * 100;

  return (
    <div className="app">
      <header className="header">
        <div>
          <span className="badge">ONLINE SURVEY</span>

          <h1>Quick Feedback</h1>

          <p>
            Answer 5 randomly selected questions and share your thoughts.
          </p>
        </div>

        <div className="question-count">
          <strong>{currentQuestion + 1}</strong>
          <span>/ 5</span>
        </div>
      </header>

      <main className="survey-container">
        <div className="progress-section">
          <div className="progress-info">
            <span>Survey Progress</span>
            <strong>{Math.round(progress)}%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="question-card">
            <div className="question-number">
              QUESTION {currentQuestion + 1}
            </div>

            <h2>{randomQuestions[currentQuestion]}</h2>

            <textarea
              value={answers[currentQuestion] || ""}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Type your answer here..."
              rows="6"
            ></textarea>

            <div className="character-count">
              {(answers[currentQuestion] || "").length} characters
            </div>
          </div>

          <div className="navigation">
            <button
              type="button"
              className="secondary-btn"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>

            {currentQuestion < randomQuestions.length - 1 ? (
              <button
                type="button"
                className="primary-btn"
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button type="submit" className="primary-btn">
                Submit Survey ✓
              </button>
            )}
          </div>
        </form>

        <div className="question-dots">
          {randomQuestions.map((_, index) => (
            <button
              key={index}
              className={`dot ${
                currentQuestion === index ? "active" : ""
              } ${answers[index] ? "answered" : ""}`}
              onClick={() => setCurrentQuestion(index)}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>

      <footer>
        <span>5 random questions • Quick & simple feedback</span>
      </footer>
    </div>
  );
}

export default App;