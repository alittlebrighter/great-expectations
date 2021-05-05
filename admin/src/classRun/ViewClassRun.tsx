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
import { ClassSelect } from "../class/ClassSelect";
import { SessionSelect } from "../session/SessionSelect";
import { ClassRun as TClassRun } from "../api/classRun/ClassRun";
import { ClassRunUpdateInput } from "../api/classRun/ClassRunUpdateInput";

export const ViewClassRun = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/class-runs/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TClassRun,
    AxiosError,
    [string, string]
  >(["get-/api/class-runs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/class-runs"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TClassRun, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/class-runs"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//class-runs");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TClassRun, AxiosError, ClassRunUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/class-runs"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ClassRunUpdateInput) => {
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
    () => pick(data, ["class", "cost", "maxGrade", "minGrade", "session"]),
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
                title={`${"Class Run"} ${
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
