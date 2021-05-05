import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClassRunList } from "./ClassRunList";
import { CreateClassRun } from "./CreateClassRun";
import { ViewClassRun } from "./ViewClassRun";

export const ClassRunIndex = (): React.ReactElement => {
  useBreadcrumbs("/class-runs/", "Class Runs");

  return (
    <Switch>
      <PrivateRoute exact path={"/class-runs/"} component={ClassRunList} />
      <PrivateRoute path={"/class-runs/new"} component={CreateClassRun} />
      <PrivateRoute path={"/class-runs/:id"} component={ViewClassRun} />
    </Switch>
  );
};
