import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import dietImage from "./assets/diet.png";
import "./index.css"; // Import Tailwind CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import normal from './assets/normal.png';
import obese from './assets/obesity.png';
import over from './assets/over.png';
import under from './assets/under.png';
import preloaderImage1 from './assets/rock.png';
import preloaderImage2 from './assets/pizza.png';
import preloaderImage3 from './assets/hot.png';
import preloaderImage4 from './assets/carrot.png';
import preloaderImage5 from './assets/fries.png';
import preloaderImage6 from './assets/veg.png';

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [suggestionImage, setSuggestionImage] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showDietPlanModal, setShowDietPlanModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    setShowDietPlanModal(true);
  };

  const handleCloseDietPlanModal = () => setShowDietPlanModal(false);
  const handleShowResultModal = () => setShowResultModal(true);

  const calculateBMI = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show preloader

    // Convert weight and height to numbers
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!heightNum || !weightNum) {
      toast.error("Please enter both weight and height.");
      setIsLoading(false); // Hide preloader
      return;
    }

    setTimeout(() => { // Simulate loading time
      const heightInMeters = heightNum / 100;
      const bmiValue = weightNum / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      if (bmiValue < 18.5) {
        setBmiStatus("Underweight");
        setSuggestion("Consider a nutritious diet to gain weight.");
        setSuggestionImage(under);
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiStatus("Normal");
        setSuggestion("Keep up the good work with a balanced diet and regular exercise.");
        setSuggestionImage(normal);
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiStatus("Overweight");
        setSuggestion("Consider a balanced diet and regular exercise to lose weight.");
        setSuggestionImage(over);
      } else {
        setBmiStatus("Obesity");
        setSuggestion("Consult a healthcare provider for a suitable weight loss plan.");
        setSuggestionImage(obese);
      }

      setIsLoading(false); // Hide preloader
      handleShowResultModal(); // Show the modal with results
    }, 2000); // Adjust this time as needed
  };

  const resetForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setBmiStatus("");
    setSuggestion("");
    setSuggestionImage(null);
  };

  return (
    <>
      <header className="bg-primary text-white p-3 text-center text-4xl">
        <h1>BMI Calculator</h1>
      </header>
      <main className="container mx-auto mt-5 text-lg">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4">
              <div className="row">
                <div className="col-md-6">
                  <img src={dietImage} alt="Diet" className="img-fluid" />
                </div>
                <div className="col-md-6">
                  <form className="mb-4" onSubmit={calculateBMI}>
                    <div className="mb-3">
                      <label htmlFor="weight" className="form-label">
                        <h5>Weight (kg): <span className="inti"> {85}</span></h5>
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        min="1"
                        step="0.01"
                        className="form-control"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="height" className="form-label">
                        <h5>Height (cm): <span className="inti">175 </span></h5>
                      </label>
                      <input
                        type="number"
                        id="height"
                        name="height"
                        min="0.1"
                        step="0.01"
                        className="form-control"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>

                    <div className="d-flex gap-2 result-btn">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        <h4>Calculate</h4>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={resetForm}
                      >
                        <h4>Re-Set</h4>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
      
      {/* Preloader */}
      {isLoading && (
        <div className="preloader-container">
          <div className="preloader">
            <img src={preloaderImage2} alt="pizza" />
            <img src={preloaderImage3} alt="hot" />
            <img src={preloaderImage5} alt="fries" />
            <img src={preloaderImage6} alt="veg" />
            <img src={preloaderImage4} alt="carrot" />
            <img src={preloaderImage1} alt="rock" />
          </div>
        </div>
      )}

      {/* Result Modal */}
      <Modal show={showResultModal} onHide={handleCloseResultModal}>
        <Modal.Header closeButton>
          <Modal.Title>BMI Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h5>Your BMI is: <span className="inti">{bmi}</span> </h5>
              <h5>Status:  <span className="inti">{bmiStatus}</span> </h5>
              <h5>Suggestion:  <span className="inti">{suggestion}</span> </h5>
            </div>
            {suggestionImage && <img src={suggestionImage} alt="Suggestion" className="img-fluid" style={{ maxWidth: '150px' }} />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResultModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Diet Plan Modal */}
      <Modal show={showDietPlanModal} onHide={handleCloseDietPlanModal}>
        <Modal.Header closeButton>
          <Modal.Title>Diet Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="diet-plan">
          {bmiStatus === "Underweight" && (
            <div>
              <h5>Diet Plan for Underweight:</h5>
              <ul className="plan">
                <li>Eat more frequently.</li>
                <li>Choose nutrient-rich foods.</li>
                <li>Drink smoothies and shakes.</li>
                <li>Watch when you drink.</li>
                <li>Make every bite count.</li>
              </ul>
            </div>
          )}
          {bmiStatus === "Normal" && (
            <div>
              <h5>Diet Plan for Normal weight:</h5>
              <ul>
                <li>Maintain a balanced diet.</li>
                <li>Include a variety of foods.</li>
                <li>Stay hydrated.</li>
                <li>Exercise regularly.</li>
                <li>Monitor your weight regularly.</li>
              </ul>
            </div>
          )}
          {bmiStatus === "Overweight" && (
            <div>
              <h5>Diet Plan for Overweight:</h5>
              <ul>
                <li>Reduce sugar and refined carbs.</li>
                <li>Eat more vegetables and fruits.</li>
                <li>Increase protein intake.</li>
                <li>Drink plenty of water.</li>
                <li>Exercise regularly.</li>
              </ul>
            </div>
          )}
          {bmiStatus === "Obesity" && (
            <div>
              <h5>Diet Plan for Obesity:</h5>
              <ul>
                <li>Consult a healthcare provider.</li>
                <li>Reduce calorie intake.</li>
                <li>Focus on nutrient-rich foods.</li>
                <li>Exercise regularly.</li>
                <li>Monitor your progress.</li>
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDietPlanModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
