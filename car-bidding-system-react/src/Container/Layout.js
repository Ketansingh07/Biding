import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import GlobalErrorBoundary from "../Components/ErrorBoundaries/GlobalErrorBoundary";
import ThemedSuspense from "../Components/ThemedSuspense";
import Container from "./Container";
import routes from "../routes";
import Header from "../Components/Header";

const Page404 = lazy(() => import("../Pages/404"));

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <GlobalErrorBoundary>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact
                    path={route.path}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/" to="/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </GlobalErrorBoundary>
      </Container>
    </React.Fragment>
  );
}

export default Layout;
