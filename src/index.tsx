import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Desktop } from "./Desktop";
import { Registration } from "./Registration";
import { Login } from "./Login";
import { AuthChoice } from "./AuthChoice";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/auth-choice" element={<AuthChoice />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
