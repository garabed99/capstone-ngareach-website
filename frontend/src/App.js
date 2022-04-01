import "./App.css";
import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import Reviews from "./components/Reviews";
import Pricing from "./components/Pricing";
import PhotographersList from "./components/PhotographersList";
import Login from "./components/Login";
import RegisterPh from "./components/register-photographer/Register-ph";
import RegisterCl from "./components/register-client/Register-cl";
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
        <Route path="/home" element={<Home />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/photographerslist" element={<PhotographersList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-ph" element={<RegisterPh />} />
        <Route path="/register-cl" element={<RegisterCl />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
