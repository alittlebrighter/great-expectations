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
import { UserSelect } from "../user/UserSelect";
import { Class as TClass } from "../api/class/Class";
import { ClassCreateInput } from "../api/class/ClassCreateInput";

const INITIAL_VALUES = {} as ClassCreateInput;

export const CreateClass = (): React.ReactElement => {
  useBreadcrumbs("/classes/new", "Create Class");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TClass,
    AxiosError,
    ClassCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/classes", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/classes"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ClassCreateInput) => {
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
            <FormHeader title={"Create Class"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Description" name="description" textarea />
          </div>
          <div>
            <TextField label="Image URL" name="imageURL" />
          </div>
          <div>
            <UserSelect label="Owner" name="owner.id" />
          </div>
          <div>
            <TextField label="Title" name="title" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
