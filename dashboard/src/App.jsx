import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import Types from "./pages/Types";
import AdminPanel from "./pages/AdminPanel";
import CookieConsent from "react-cookie-consent";

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<AdminPanel />} />
                </Routes>
            </Layout>
            <CookieConsent
                location="bottom"
                buttonText="Accept"
                declineButtonText="Decline"
                cookieName="myGeoSearchCookieConsent"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                enableDeclineButton
                onAccept={() => {
                    alert("Cookies accepted!");
                }}
                onDecline={() => {
                    alert("Cookies declined!");
                }}
            >
                This website uses cookies to enhance the user experience. By accepting, you agree to our <a href="/PRIVACY_POLICY.md">Privacy Policy</a>.
            </CookieConsent>
        </Router>
    );
};

export default App;