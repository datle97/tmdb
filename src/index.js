import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// quay về đầu trang mỗi khi pathname thay đổi (component Link)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
