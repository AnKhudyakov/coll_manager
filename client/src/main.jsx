import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import { store } from "./app/store";
import "@/styles/index.scss";
import { Provider } from "react-redux";
import "@/languages/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
