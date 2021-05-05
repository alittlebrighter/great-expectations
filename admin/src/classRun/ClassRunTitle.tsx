import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { ClassRun as TClassRun } from "../api/classRun/ClassRun";

type Props = { id: string };

export const ClassRunTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TClassRun,
    AxiosError,
    [string, string]
  >(["get-/api/class-runs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/class-runs"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/class-runs"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
