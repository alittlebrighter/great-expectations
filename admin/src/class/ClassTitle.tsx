import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Class as TClass } from "../api/class/Class";

type Props = { id: string };

export const ClassTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TClass,
    AxiosError,
    [string, string]
  >(["get-/api/classes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/classes"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/classes"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
