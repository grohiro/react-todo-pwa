import { registerSW } from 'virtual:pwa-register';

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { App } from "./App";

//const root = createRoot(document.getElementById("root") as Element);
const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

registerSW();
