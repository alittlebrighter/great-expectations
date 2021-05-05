import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Registration as TRegistration } from "../api/registration/Registration";

type Props = { id: string };

export const RegistrationTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TRegistration,
    AxiosError,
    [string, string]
  >(["get-/api/registrations", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/registrations"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/registrations"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
