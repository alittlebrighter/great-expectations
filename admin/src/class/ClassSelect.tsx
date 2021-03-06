import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Class as TClass } from "../api/class/Class";

type Data = TClass[];

type Props = Omit<SelectFieldProps, "options">;

export const ClassSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/classes",
    async () => {
      const response = await api.get("/api/classes");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.title && item.title.length ? item.title : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
