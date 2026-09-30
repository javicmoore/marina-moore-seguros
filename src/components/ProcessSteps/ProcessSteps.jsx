import { processSteps } from "../../config/siteConfig.js";
import "./ProcessSteps.css";

function ProcessSteps() {
  return (
    <ol className="process-steps">
      {processSteps.map((step) => (
        <li key={step.number} className="process-steps__item">
          <span className="process-steps__number">{step.number}</span>
          <h3 className="process-steps__title">{step.title}</h3>
          <p className="process-steps__description">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export default ProcessSteps;
