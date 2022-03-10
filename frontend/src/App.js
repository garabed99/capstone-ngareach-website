import "./App.css";
import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import Reviews from "./components/Reviews";
import Pricing from "./components/Pricing";
import PhotographersList from "./components/PhotographersList";
import Login from "./components/Login";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/PhotographersList" element={<PhotographersList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
