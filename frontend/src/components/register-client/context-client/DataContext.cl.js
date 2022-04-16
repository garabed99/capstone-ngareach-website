import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({});

export function DataProvider({ children }) {
  //Account Data
  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [_confirmPassword, setConfirmPassword] = useState("");

  //Personal Data
  const [_firstName, setFirstName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_gender, setGender] = useState("");
  const [_dateOfBirth, setDateOfBirth] = useState(
    new Date("1999-01-14T11:11:11")
  );
  const [_phoneNum, setPhoneNum] = useState("");

  function handleAccountDataSubmit(e) {
    e.preventDefault();

    const accountData = {
      email: _email,
      password: _password,
      confirmPassword: _confirmPassword,
    };
    // console.log(accountData);

    localStorage.setItem("clientData", JSON.stringify(accountData));
    const sessionData = localStorage.getItem("clientData");
    console.log(sessionData);

    axios
      .post("http://localhost:4000/clients", accountData)
      .then((res) => {
        alert("Successfully added Account Data");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePersonalDataSubmit(e) {
    e.preventDefault();

    const personalData = {
      firstName: _firstName,
      lastName: _lastName,
      gender: _gender,
      dateOfBirth: _dateOfBirth,
      phoneNum: _phoneNum,
    };
    console.log(personalData);

    localStorage.setItem("clientData", JSON.stringify(personalData));
    const sessionData = localStorage.getItem("clientData");
    console.log(sessionData);

    axios
      .post("http://localhost:4000/clients", personalData)
      .then((res) => {
        alert("Successfully added Career Data");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}

export default DataContext;
