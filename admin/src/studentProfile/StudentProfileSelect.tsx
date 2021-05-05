import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { StudentProfile as TStudentProfile } from "../api/studentProfile/StudentProfile";

type Data = TStudentProfile[];

type Props = Omit<SelectFieldProps, "options">;

export const StudentProfileSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/student-profiles",
    async () => {
      const response = await api.get("/api/student-profiles");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.firstName && item.firstName.length ? item.firstName : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
