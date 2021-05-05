import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { ClassTitle } from "../class/ClassTitle";
import { SessionTitle } from "../session/SessionTitle";
import { ClassRun as TClassRun } from "../api/classRun/ClassRun";

type Data = TClassRun[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "class",
    title: "Class",
    sortable: false,
  },
  {
    name: "cost",
    title: "Cost",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "maxGrade",
    title: "Max Grade",
    sortable: false,
  },
  {
    name: "minGrade",
    title: "Min Grade",
    sortable: false,
  },
  {
    name: "session",
    title: "Session",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const ClassRunList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/class-runs",
    async () => {
      const response = await api.get("/api/class-runs");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Class Runs"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/class-runs/new"}>
            <Button>Create Class Run </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TClassRun) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/class-runs"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <ClassTitle id={item.class?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.cost}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.maxGrade}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.minGrade}</>
                </DataGridCell>
                <DataGridCell>
                  <SessionTitle id={item.session?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
