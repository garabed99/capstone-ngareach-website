import {
  Button,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StepOne from "./Register-StepOne";
import StepTwo from "./Register-StepTwo";
import StepThree from "./Register-StepThree";
import StepFour from "./Register-StepFour";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "6rem auto",
    border: "1px solid #999",
    "& .MuiStepIcon-root.MuiStepIcon-active": {},
    "& .MuiStepIcon-root.MuiStepIcon-completed": { color: "green" },
  },
});

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const steps = getSteps();

  function getSteps() {
    return ["ACCOUNT", "PERSONAL", "CAREER", "FINISH"];
  }

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      case 3:
        return <StepFour />;
      default:
        return "Unknow Step";
    }
  }

  return (
    <>
      <Button>
        <Link
          to="/Home"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          Home
        </Link>
      </Button>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Button onClick={handlePrev}>
          {activeStep === 0 ? "" : "PREVIOUS"}
        </Button>
        {activeStep === steps.length ? (
          "The Steps Completed:"
        ) : (
          <>
            {getStepsContent(activeStep)}

            <Button onClick={handleNext}>
              {activeStep === steps.length ? "FINISH" : "NEXT"}
            </Button>
          </>
        )}
      </div>
    </>
  );
}
