import "./App.css";
import Home from "./components/Home";
import HowItWorks from "./components/navbar-section/HowItWorks";
import Reviews from "./components/navbar-section/Reviews";
import Pricing from "./components/navbar-section/Pricing";
import PhotographersList from "./components/photographersList/PhotographersList";
import Login from "./components/Login";
import RegisterPh from "./components/register-photographer/Register-ph";
import RegisterCl from "./components/register-client/Register-cl";
import AboutUs from "./components/information-footer/AboutUs";
import ContactUs from "./components/information-footer/ContactUs";
import FAQ from "./components/information-footer/FAQ";
import TermsAndConditions from "./components/information-footer/TermsAndConditions";
import PrivacyPolicy from "./components/information-footer/PrivacyPolicy";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/navbar-section/NavBar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

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
        
        <Footer />
      </BrowserRouter>
    </>
  );
}
