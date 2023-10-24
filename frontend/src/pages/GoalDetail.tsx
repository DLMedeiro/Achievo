import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import ActivityChart from "../components/ActivityChart";

export default function GoalDetail() {
  return (
    <Paper elevation={14} className="form-container">
      <Typography variant="h5" component="h5" align="center">
        Goal Details
      </Typography>
      <ActivityChart />
    </Paper>
  );
}
