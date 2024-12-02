import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Tooltip,
  IconButton,
  Pagination,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { IAuthenticationState } from "@/store/reducers/authenticationSlice";

const EquipmentPage: React.FC = () => {
  const [equipments, setEquipments] = useState<
    { id: string; api_key: string }[]
  >([]);
  const [newEquipmentId, setNewEquipmentId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { access_token } = useAppSelector(
    (state) => state.authentication as IAuthenticationState
  );

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updateEquipments, setUpdateEquipments] = useState(false);

  const handleCopy = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    alert("API Key copied to clipboard!");
  };

  const handleAddEquipment = async () => {
    if (!newEquipmentId.trim()) {
      setError("Equipment ID is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/api/equipment",
        {
          id: newEquipmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 201) {
        setUpdateEquipments((old) => !old);
        setNewEquipmentId("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Error adding equipment.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEquipments = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: {
        id?: string;
        limit: number;
        page: number;
        api_key?: string;
      } = {
        limit,
        page,
      };

      if (searchQuery.trim()) {
        params.id = searchQuery;
      }

      const response = await axios.get("/api/equipment", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params,
      });

      setEquipments(response.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching equipments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchQuery, updateEquipments]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "primary.main" }}>
        Equipment Management
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Equipment
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <TextField
                label="Equipment ID"
                variant="outlined"
                fullWidth
                value={newEquipmentId}
                onChange={(e) => setNewEquipmentId(e.target.value)}
                error={!!error}
                helperText={error}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddEquipment}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search Equipment by ID
          </Typography>
          <TextField
            label="Search by Equipment ID"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        {equipments.map((equipment) => (
          <Grid item xs={12} md={6} key={equipment.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  ID: {equipment.id}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  API Key: {equipment.api_key}
                </Typography>
                <Tooltip title="Copy API Key">
                  <IconButton onClick={() => handleCopy(equipment.api_key)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={1} // Defina o número de páginas com base na resposta da API
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default EquipmentPage;
