import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StudentProfileList } from "./StudentProfileList";
import { CreateStudentProfile } from "./CreateStudentProfile";
import { ViewStudentProfile } from "./ViewStudentProfile";

export const StudentProfileIndex = (): React.ReactElement => {
  useBreadcrumbs("/student-profiles/", "Student Profiles");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/student-profiles/"}
        component={StudentProfileList}
      />
      <PrivateRoute
        path={"/student-profiles/new"}
        component={CreateStudentProfile}
      />
      <PrivateRoute
        path={"/student-profiles/:id"}
        component={ViewStudentProfile}
      />
    </Switch>
  );
};
