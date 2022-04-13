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
import StepOne from "./Register-StepOne-cl";
import StepTwo from "./Register-StepTwo-cl";
import StepThree from "./Register-StepThree-cl";

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
  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [_confirmPassword, setConfirmPassword] = useState("");
  const [_firstName, setFirstName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_gender, setGender] = useState("");
  const [_dateOfBirth, setDateOfBirth] = useState(
    new Date("1999-01-14T11:11:11")
  );
  const [_phoneNum, setPhoneNum] = useState("");

  const handleEmail = (value) => setEmail(value);
  const handlePassword = (value) => setPassword(value);
  const handleConfirmPassword = (value) => setConfirmPassword(value);
  const handleFirstName = (value) => setFirstName(value);
  const handleLastName = (value) => setLastName(value);
  const handleGender = (value) => setGender(value);
  const handleDateOfBirth = (value) => setDateOfBirth(value);
  const handlePhoneNum = (value) => setPhoneNum(value);

  function getSteps() {
    return ["ACCOUNT", "PERSONAL", "FINISH"];
  }

  const handlePrev = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        return "Unknow Step";
    }
  }

  return (
    <>
      <Button>
        <Link
          to="/home"
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
          "Unauthorized step"
        ) : (
          // <>
          // <div>

          // </div>
          // </>
          <>
            {getStepsContent(activeStep)}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? (
                // <Link
                //   to="/home"
                //   style={{ color: "inherit", textDecoration: "inherit" }}
                // ></Link>
                ""
              ) : (
                "NEXT"
              )}
              <Link
                to="/home"
                style={{ color: "inherit", textDecoration: "inherit" }}
              ></Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
}
