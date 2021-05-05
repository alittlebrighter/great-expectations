import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClassRunSelect } from "../classRun/ClassRunSelect";
import { StudentProfileSelect } from "../studentProfile/StudentProfileSelect";
import { Registration as TRegistration } from "../api/registration/Registration";
import { RegistrationCreateInput } from "../api/registration/RegistrationCreateInput";

const INITIAL_VALUES = {} as RegistrationCreateInput;

export const CreateRegistration = (): React.ReactElement => {
  useBreadcrumbs("/registrations/new", "Create Registration");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TRegistration,
    AxiosError,
    RegistrationCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/registrations", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/registrations"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: RegistrationCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Registration"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ClassRunSelect label="Class Run" name="classRun.id" />
          </div>
          <div>
            <TextField type="number" label="Paid" name="paid" />
          </div>
          <div>
            <StudentProfileSelect label="Student" name="student.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
