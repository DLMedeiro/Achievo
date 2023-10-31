import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGoalDetails } from "../features/goalDetails/goalDetailSlice";
import { RootState } from "../app/store";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: true,
  },
  {
    field: "progressChange",
    headerName: "Progress",
    width: 150,
    editable: true,
  },
  {
    field: "notes",
    headerName: "Notes",
    type: "number",
    width: 200,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export default function ActivityChart() {
  interface Goal {
    _id: string;
    user: string;
    activity: string;
    start: Date;
    end: Date;
    target: Number;
    progress: Number;
    details: any;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  }
  interface userState {
    user: any;
  }
  interface goalState {
    goals: Goal[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string | undefined;
  }
  type Detail = {
    progressChange: number;
    date: string;
    detail: string;
    _id: string;
  };
  const { goals, isLoading, isError, message }: goalState = useAppSelector(
    (state: RootState) => state.goals
  );

  const { user }: userState = useAppSelector((state: RootState) => state.auth);

  const [rowData, setRowData] = useState<any[]>([]);

  let localGoal: Goal[];
  let localGoalString: string | null;
  useEffect(() => {
    localGoalString = localStorage.getItem("details");
    if (goals && goals.length == 1 && !localGoalString) {
      localStorage.setItem("details", JSON.stringify(goals[0].details));
      localGoalString = localStorage.getItem("details");
      if (localGoalString) {
        localGoal = JSON.parse(localGoalString);
      }
    } else if (goals && localGoalString)
      if (localGoalString) {
        localGoal = JSON.parse(localGoalString);
      }

    if (localGoal) {
      console.log(localGoal);
      setRowData(
        localGoal.map((detail) => ({
          id: detail._id,
          ...detail,
        }))
      );
    }
  }, [goals]);
  // const details = goals[0];
  // localStorage.setItem("details", details);
  // console.log(localStorage.getItem("details"));
  // console.log(details.details);

  // const columns = [
  //   { field: "progressChange", headerName: "Progress Change", flex: 1 },
  //   { field: "date", headerName: "Date", flex: 1 },
  //   { field: "detail", headerName: "Detail", flex: 1 },
  //   { field: "_id", headerName: "ID", flex: 1 },
  // ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
