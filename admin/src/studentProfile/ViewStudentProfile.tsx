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
import { StudentProfile as TStudentProfile } from "../api/studentProfile/StudentProfile";
import { StudentProfileUpdateInput } from "../api/studentProfile/StudentProfileUpdateInput";

export const ViewStudentProfile = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/student-profiles/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TStudentProfile,
    AxiosError,
    [string, string]
  >(["get-/api/student-profiles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/student-profiles"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TStudentProfile, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/student-profiles"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//student-profiles");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TStudentProfile, AxiosError, StudentProfileUpdateInput>(
    async (data) => {
      const response = await api.patch(
        `${"/api/student-profiles"}/${id}`,
        data
      );
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: StudentProfileUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.firstName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["firstName", "grade", "lastName"]),
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
                title={`${"Student Profile"} ${
                  data?.firstName && data?.firstName.length
                    ? data.firstName
                    : data?.id
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
              <TextField label="First Name" name="firstName" />
            </div>
            <div>
              <TextField type="number" step={1} label="Grade" name="grade" />
            </div>
            <div>
              <TextField label="Last Name" name="lastName" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
