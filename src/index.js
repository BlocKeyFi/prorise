import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <BrowserRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Redirect from="/" to="/auth" />
            </Switch>
          </BrowserRouter>
        </React.StrictMode>
        <Toaster
          position="top-center"
          toastOptions={{
            // Define default options
            className: "",
            style: {
              background: "rgba(0, 0, 0, 0.2)",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
