import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RegistrationList } from "./RegistrationList";
import { CreateRegistration } from "./CreateRegistration";
import { ViewRegistration } from "./ViewRegistration";

export const RegistrationIndex = (): React.ReactElement => {
  useBreadcrumbs("/registrations/", "Registrations");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/registrations/"}
        component={RegistrationList}
      />
      <PrivateRoute
        path={"/registrations/new"}
        component={CreateRegistration}
      />
      <PrivateRoute path={"/registrations/:id"} component={ViewRegistration} />
    </Switch>
  );
};
