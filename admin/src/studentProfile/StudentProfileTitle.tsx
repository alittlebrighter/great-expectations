import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { StudentProfile as TStudentProfile } from "../api/studentProfile/StudentProfile";

type Props = { id: string };

export const StudentProfileTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TStudentProfile,
    AxiosError,
    [string, string]
  >(["get-/api/student-profiles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/student-profiles"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/student-profiles"}/${id}`} className="entity-id">
      {data?.firstName && data?.firstName.length ? data.firstName : data?.id}
    </Link>
  );
};
