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
import { Session as TSession } from "../api/session/Session";
import { SessionCreateInput } from "../api/session/SessionCreateInput";

const INITIAL_VALUES = {} as SessionCreateInput;

export const CreateSession = (): React.ReactElement => {
  useBreadcrumbs("/sessions/new", "Create Session");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TSession,
    AxiosError,
    SessionCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/sessions", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/sessions"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: SessionCreateInput) => {
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
            <FormHeader title={"Create Session"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="date" label="End" name="end" />
          </div>
          <div>
            <TextField type="date" label="Start" name="start" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
