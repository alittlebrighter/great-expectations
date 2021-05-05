import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClassRunSelect } from "../classRun/ClassRunSelect";
import { StudentProfileSelect } from "../studentProfile/StudentProfileSelect";
import { Registration as TRegistration } from "../api/registration/Registration";
import { RegistrationUpdateInput } from "../api/registration/RegistrationUpdateInput";

export const ViewRegistration = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/registrations/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TRegistration,
    AxiosError,
    [string, string]
  >(["get-/api/registrations", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/registrations"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TRegistration, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/registrations"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//registrations");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TRegistration, AxiosError, RegistrationUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/registrations"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: RegistrationUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["classRun", "paid", "student"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Registration"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
