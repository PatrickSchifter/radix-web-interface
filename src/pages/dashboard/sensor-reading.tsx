import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { IAuthenticationState } from "@/store/reducers/authenticationSlice";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

interface ISensorReading {
  _avg: {
    value: number;
  };
  equipmentId: string;
}
const SensorReadingChart = () => {
  const [timestamp, setTimestamp] = useState<
    "24hours" | "48hours" | "1week" | "1month"
  >("24hours");
  const [data, setData] = useState<ISensorReading[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useAppSelector(
    (state) => state.authentication as IAuthenticationState
  );

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/sensor-reading", {
        params: {
          timestamp,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Error fetching sensor data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp]);

  const chartData = {
    labels: data.map((item) => item.equipmentId),
    datasets: [
      {
        label: "Sensor Value",
        data: data.map((item) => item._avg.value),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2>Sensor Readings</h2>

      {/* Botões com MUI */}
      <ButtonGroup
        variant="outlined"
        aria-label="time period filter"
        sx={{ mb: 3 }}
      >
        <Button
          className={timestamp === "24hours" ? "active" : ""}
          onClick={() => {
            setTimestamp("24hours");
            fetchData();
          }}
        >
          Last 24 hours
        </Button>
        <Button
          className={timestamp === "48hours" ? "active" : ""}
          onClick={() => {
            setTimestamp("48hours");
            fetchData();
          }}
        >
          Last 48 hours
        </Button>
        <Button
          className={timestamp === "1week" ? "active" : ""}
          onClick={() => {
            setTimestamp("1week");
            fetchData();
          }}
        >
          Last week
        </Button>
        <Button
          className={timestamp === "1month" ? "active" : ""}
          onClick={() => {
            setTimestamp("1month");
            fetchData();
          }}
        >
          Last month
        </Button>
      </ButtonGroup>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Gráfico */}
      <Line data={chartData} />
    </div>
  );
};

export default SensorReadingChart;
