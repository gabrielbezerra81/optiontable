import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "../store/store";

import { GlobalStyle } from "./WrappersStyle";

export const ComponentWrapper = ({ children }) => (
  <Provider store={store}>
    {children}
    <ToastContainer />
    <GlobalStyle />
  </Provider>
);
