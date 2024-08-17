import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div>123</div>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
