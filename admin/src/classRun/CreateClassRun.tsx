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
import { ClassSelect } from "../class/ClassSelect";
import { SessionSelect } from "../session/SessionSelect";
import { ClassRun as TClassRun } from "../api/classRun/ClassRun";
import { ClassRunCreateInput } from "../api/classRun/ClassRunCreateInput";

const INITIAL_VALUES = {} as ClassRunCreateInput;

export const CreateClassRun = (): React.ReactElement => {
  useBreadcrumbs("/class-runs/new", "Create Class Run");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TClassRun,
    AxiosError,
    ClassRunCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/class-runs", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/class-runs"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ClassRunCreateInput) => {
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
            <FormHeader title={"Create Class Run"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ClassSelect label="Class" name="class.id" />
          </div>
          <div>
            <TextField type="number" label="Cost" name="cost" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="Max Grade"
              name="maxGrade"
            />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="Min Grade"
              name="minGrade"
            />
          </div>
          <div>
            <SessionSelect label="Session" name="session.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
