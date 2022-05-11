import "./App.css";
import Home from "./components/Home";
import HowItWorks from "./components/navbar-section/HowItWorks";
import Pricing from "./components/navbar-section/Pricing";
import PhotographersList from "./components/photographersList/PhotographersList";
import ProfilePh from "./components/profile-photographer/Profile-ph";
import EditProfilePh from "./components/profile-photographer/EditProfile-Ph";
import ProfileCl from "./components/profile-client/Profile-cl";
import EditProfileCl from "./components/profile-client/EditProfile-cl";
import Login from "./components/Login";
import SignupPh from "./components/register-photographer/Signup-ph";
import SignupCl from "./components/register-client/Signup-cl";
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
        <div
          className="wrapper"
          style={{
            minHeight: "calc(100vh - 360px)",
            margin: "0px 10px 10px 0px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/photographerslist" element={<PhotographersList />} />
            <Route path="/photographer/:id" element={<ProfilePh />} />
            <Route
              path="/photographer/editprofile-ph/:id"
              element={<EditProfilePh />}
            />
            <Route path="/client/:id" element={<ProfileCl />} />
            <Route
              path="/client/editprofile-cl/:id"
              element={<EditProfileCl />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-cl" element={<SignupCl />} />
            <Route path="/signup-ph" element={<SignupPh />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}
