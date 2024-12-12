import React, { lazy, Suspense } from "react"; // Must be imported for webpack to work
import "./App.css";

const Header = lazy(() => import("HeaderApp/Header"));
const Footer = lazy(() => import("FooterApp/Footer"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
      <div className="container">Demo home page</div>
    </div>
  );
}

export default App;
