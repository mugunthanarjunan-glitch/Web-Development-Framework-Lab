import { useState } from "react";
import "./index.css";

function App() {
  const [casualLeaves, setCasualLeaves] = useState(10);
  const [medicalLeaves, setMedicalLeaves] = useState(5);

  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");

  const [applications, setApplications] = useState([]);

  const handleApply = (e) => {
    e.preventDefault();

    const numDays = Number(days);

    if (!leaveType) {
      alert("Please select a leave type.");
      return;
    }

    if (!numDays || numDays <= 0) {
      alert("Please enter a valid number of days.");
      return;
    }

    if (leaveType === "casual") {
      if (numDays <= casualLeaves) {
        setCasualLeaves(casualLeaves - numDays);

        addApplication("Casual Leave", numDays);

        alert(
          `Casual leave approved for ${numDays} day(s).`
        );
      } else {
        alert("Not enough casual leave days left.");
        return;
      }
    }

    if (leaveType === "medical") {
      if (numDays <= medicalLeaves) {
        setMedicalLeaves(medicalLeaves - numDays);

        addApplication("Medical Leave", numDays);

        alert(
          `Medical leave approved for ${numDays} day(s).`
        );
      } else {
        alert("Not enough medical leave days left.");
        return;
      }
    }

    setLeaveType("");
    setDays("");
  };

  const addApplication = (type, numberOfDays) => {
    const newApplication = {
      id: Date.now(),
      type,
      days: numberOfDays,
      date: new Date().toLocaleDateString(),
    };

    setApplications((current) => [
      newApplication,
      ...current,
    ]);
  };

  const handleReset = () => {
    setLeaveType("");
    setDays("");
  };

  const totalRemaining =
    casualLeaves + medicalLeaves;

  return (
    <div className="app">

      {/* Header */}

      <header className="header">

        <div className="header-content">

          <div className="logo">
            <span>◆</span>
            LeaveDesk
          </div>

          <p>
            Employee Leave Management
          </p>

        </div>

      </header>


      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            EMPLOYEE PORTAL
          </p>

          <h1>
            Manage your
            <br />
            leave with ease.
          </h1>

          <p className="hero-description">
            Apply for leave, check your available
            balance and keep track of your recent
            applications.
          </p>

        </div>

      </section>


      {/* Main */}

      <main className="container">


        {/* Leave Balance */}

        <section className="balance-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                YOUR BALANCE
              </p>

              <h2>
                Leave Balance
              </h2>

            </div>

            <div className="total-balance">

              <span>
                Total Remaining
              </span>

              <strong>
                {totalRemaining} days
              </strong>

            </div>

          </div>


          <div className="balance-grid">


            {/* Casual */}

            <div className="balance-card casual">

              <div className="balance-icon">
                ☀
              </div>

              <div>

                <p>
                  Casual Leave
                </p>

                <strong>
                  {casualLeaves}
                </strong>

                <span>
                  days remaining
                </span>

              </div>

            </div>


            {/* Medical */}

            <div className="balance-card medical">

              <div className="balance-icon">
                +
              </div>

              <div>

                <p>
                  Medical Leave
                </p>

                <strong>
                  {medicalLeaves}
                </strong>

                <span>
                  days remaining
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* Apply Leave */}

        <section className="apply-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                REQUEST LEAVE
              </p>

              <h2>
                Apply for Leave
              </h2>

            </div>

          </div>


          <form
            className="leave-form"
            onSubmit={handleApply}
          >

            <div className="form-group">

              <label>
                Leave Type
              </label>

              <select
                value={leaveType}
                onChange={(e) =>
                  setLeaveType(e.target.value)
                }
                required
              >

                <option value="">
                  Select Leave Type
                </option>

                <option value="casual">
                  Casual Leave
                </option>

                <option value="medical">
                  Medical Leave
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>
                Number of Days
              </label>

              <input
                type="number"
                min="1"
                placeholder="Enter number of days"
                value={days}
                onChange={(e) =>
                  setDays(e.target.value)
                }
                required
              />

            </div>


            <div className="form-actions">

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="apply-btn"
              >
                Apply Leave →
              </button>

            </div>

          </form>

        </section>


        {/* Applications */}

        <section className="history-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                ACTIVITY
              </p>

              <h2>
                Recent Applications
              </h2>

            </div>

            <span className="application-count">
              {applications.length} applications
            </span>

          </div>


          {applications.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                No leave applications yet
              </h3>

              <p>
                Your recent leave requests will
                appear here.
              </p>

            </div>

          ) : (

            <div className="application-list">

              {applications.map((application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  <div className="application-icon">
                    {application.type ===
                    "Casual Leave"
                      ? "☀"
                      : "+"}
                  </div>


                  <div className="application-info">

                    <strong>
                      {application.type}
                    </strong>

                    <span>
                      Applied on {application.date}
                    </span>

                  </div>


                  <div className="application-days">

                    <strong>
                      {application.days}
                    </strong>

                    <span>
                      {application.days === 1
                        ? "day"
                        : "days"}
                    </span>

                  </div>


                  <span className="approved">
                    Approved
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* Footer */}

      <footer>

        <p>
          LeaveDesk • Experiment 06
        </p>

      </footer>

    </div>
  );
}

export default App;