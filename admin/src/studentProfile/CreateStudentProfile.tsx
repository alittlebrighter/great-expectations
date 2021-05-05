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
import { StudentProfile as TStudentProfile } from "../api/studentProfile/StudentProfile";
import { StudentProfileCreateInput } from "../api/studentProfile/StudentProfileCreateInput";

const INITIAL_VALUES = {} as StudentProfileCreateInput;

export const CreateStudentProfile = (): React.ReactElement => {
  useBreadcrumbs("/student-profiles/new", "Create Student Profile");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TStudentProfile,
    AxiosError,
    StudentProfileCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/student-profiles", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/student-profiles"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StudentProfileCreateInput) => {
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
            <FormHeader title={"Create Student Profile"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
