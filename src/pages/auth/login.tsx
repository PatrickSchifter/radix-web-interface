"use client";

import { useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  CssBaseline,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import theme from "../../config/theme";
import { useAppDispatch } from "@/lib/hooks";
import { openErrorHandlerModal } from "@/store/reducers/modalSlice";
import { setAccessToken } from "@/store/reducers/authenticationSlice";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export interface ILogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validateForm = () => {
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    return false;
  };

  const error = useMemo(validateForm, [email, password]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formError = validateForm();
    if (formError) {
      return dispatch(openErrorHandlerModal({ error: { message: formError } }));
    }

    setIsLoading(true);

    try {
      //for some reason with one trycatch there-is a bug and I dont know why
      try {
        const response = await axios.post("/api/auth/login", {
          email,
          password,
        });

        if (response.status === 200) {
          const data = response.data;

          dispatch(
            setAccessToken({
              user_id: data.user_id,
              access_token: data.access_token,
              expires_at: new Date(data.expires_at).getTime(),
            })
          );

          router.push("/dashboard");
        }
      } catch (error) {
        dispatch(openErrorHandlerModal({ error }));
      }
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle enter key press to submit form
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !error) {
      handleSubmit(event);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          px: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Doesn’t have an account?{" "}
                  <Link href="/auth/register" passHref>
                    <Typography
                      component="span"
                      color="secondary"
                      sx={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                      Register
                    </Typography>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
