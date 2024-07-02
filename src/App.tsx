import { useEffect, useState } from "react";
import { IResPresence } from "./types/interface/IResPresence.interface";
import axios from "axios";
import { IResWrap } from "./types/interface/IResWrap.interface";
import { EPresenceStatus } from "./types/enum/EPresenceStatus.enum";
import { EDevice } from "./types/enum/EDevice.enum";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import "./index.css";

interface IDataTable {
  id: string;
  no: number;
  identity: string;
  name: string;
  unit: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: EPresenceStatus;
  presenceType: EDevice | string;
}

const App: React.FC = (): JSX.Element => {
  const [presences, setPresences] = useState<IDataTable[]>([]);

  const columns: GridColDef<(typeof presences)[number]>[] = [
    { field: "no", headerName: "No" },
    { field: "identity", headerName: "Identity", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "unit", headerName: "Unit" },
    { field: "date", headerName: "Date" },
    { field: "checkIn", headerName: "Waktu Masuk" },
    { field: "checkOut", headerName: "Waktu Keluar" },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.value === EPresenceStatus.ALPHA ? "error" : "primary"}
          disableElevation
          size="small"
          onClick={() => handleDetailClick(params.row.id)}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "presenceType", headerName: "Presence Type", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDetailClick(params.row.id)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const handleDetailClick = (id: string) => {
    console.log(`Detail untuk ID: ${id}`);
  };

  const getAllPresences = async (): Promise<void> => {
    const response: IResWrap<IResPresence[]> = await axios
      .get("/api/v1/presence", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlkIjoidXNlci0yY2Y3MDRjMS0zMDEwLTRiNDEtYjY5ZS00MmFjYzllNWIwNzUiLCJlbWFpbCI6ImVsaW4zOEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJndWlkSW5zdGl0dXRpb24iOiJTQ2Q3NDkiLCJpYXQiOjE3MTk4ODMwOTcsImV4cCI6MTcxOTk2OTQ5N30.VSftegAIiYw5dAh0dyXtvAbUCvhB4aIuY7cpDkoSFx0",
        },
        params: {
          year: 2024,
        },
        baseURL: "https://lab1.smartsystem.id",
      })
      .then((res) => res.data);

    setPresences(
      response.data.map((data: IResPresence, index: number) => ({
        id: data.guid,
        no: index + 1,
        identity: data.identity,
        name: data.name,
        unit: data.unit,
        date: data.createdAt.split("T")[0],
        checkIn: data.checkIn ?? "-",
        checkOut: data.checkOut ?? "-",
        status: data.status,
        presenceType:
          data.presenceType === EDevice.DEFAULT ? "-" : data.presenceType,
      }))
    );
  };

  useEffect(() => {
    getAllPresences();
  }, []);

  return (
    <div className="p-4 mx-auto w-full">
      <h1 className="text-3xl font-bold text-center">
        React Data Grid Handson
      </h1>
      <div className="w-full h-full my-4">
        <DataGrid
          columns={columns}
          rows={presences}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          autoHeight
          getRowClassName={() => "striped-row"}
        />
      </div>
    </div>
  );
};

export default App;
