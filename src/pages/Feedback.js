import "./pages_style/Feedback.css";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";

function Feedback() {
  return (
    <>
      <div className="feedback">
        <FeedbackForm />
      </div>
      <Footer />
    </>
  );
}
export default Feedback;
