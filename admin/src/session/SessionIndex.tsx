import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { SessionList } from "./SessionList";
import { CreateSession } from "./CreateSession";
import { ViewSession } from "./ViewSession";

export const SessionIndex = (): React.ReactElement => {
  useBreadcrumbs("/sessions/", "Sessions");

  return (
    <Switch>
      <PrivateRoute exact path={"/sessions/"} component={SessionList} />
      <PrivateRoute path={"/sessions/new"} component={CreateSession} />
      <PrivateRoute path={"/sessions/:id"} component={ViewSession} />
    </Switch>
  );
};
