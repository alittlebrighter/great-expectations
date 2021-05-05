import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Session as TSession } from "../api/session/Session";

type Props = { id: string };

export const SessionTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TSession,
    AxiosError,
    [string, string]
  >(["get-/api/sessions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/sessions"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/sessions"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
