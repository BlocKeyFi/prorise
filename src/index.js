import React, { Suspense } from "react";
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
import { GoogleOAuthProvider } from "@react-oauth/google";
import Loader from "components/fixedPlugin/spinner";

// Wrap the lazy-loaded components with React.lazy
const LazyAuthLayout = React.lazy(() => import("layouts/auth"));
const LazyAdminLayout = React.lazy(() => import("layouts/admin"));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider clientId="589699786468-pgervv2cd4bk71hkj5h4j9f58an4j6gi.apps.googleusercontent.com">
          <React.StrictMode>
            <BrowserRouter>
              <Suspense fallback={<Loader />}>
                <Switch>
                  {/* Use the lazy-loaded components */}
                  <Route path={`/auth`} component={LazyAuthLayout} />
                  <Route path={`/admin`} component={LazyAdminLayout} />
                  <Redirect from="/" to="/auth" />
                </Switch>
              </Suspense>
            </BrowserRouter>
          </React.StrictMode>
        </GoogleOAuthProvider>
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
