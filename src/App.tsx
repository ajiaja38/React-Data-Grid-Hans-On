import { useEffect, useState } from "react";
import { IResPresence } from "./types/interface/IResPresence.interface";
import axios from "axios";
import { IResWrap } from "./types/interface/IResWrap.interface";

const App: React.FC = (): JSX.Element => {
  const [presences, setPresences] = useState<IResPresence[]>([]);

  const getAllPresences = async (): Promise<void> => {
    const response: IResWrap<IResPresence[]> = await axios
      .get("/api/v1/presence", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWlkIjoidXNlci0yY2Y3MDRjMS0zMDEwLTRiNDEtYjY5ZS00MmFjYzllNWIwNzUiLCJlbWFpbCI6ImVsaW4zOEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJndWlkSW5zdGl0dXRpb24iOiJTQ2Q3NDkiLCJpYXQiOjE3MTk4Mzk1MDIsImV4cCI6MTcxOTkyNTkwMn0.f8AjX0a0bWWlXJusS7GCWR5GcWzQq8YyzXMS3JISNXI",
        },
        params: {
          year: 2024,
        },
        baseURL: "https://lab1.smartsystem.id",
      })
      .then((res) => res.data);

    console.log(response.data);
    setPresences(response.data);
  };

  useEffect(() => {
    getAllPresences();
  }, []);

  return (
    <div className="p-4 mx-auto w-full">
      <h1 className="text-3xl font-bold text-center">
        React Data Grid Handson
      </h1>
    </div>
  );
};

export default App;
