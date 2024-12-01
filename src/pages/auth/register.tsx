"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import axios from "axios";
import { useAppDispatch } from "@/lib/hooks";
import { openSuccessHandlerModal } from "@/store/reducers/modalSlice";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";

export interface IRegister {
  email: string;
  name: string;
  password: string;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Required"),
    name: yup.string().required("Required"),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleRegister(values);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (values: IRegister) => {
    setLoading(true);
    setError(null);

    const sanitizedEmail = values.email.trim();
    const sanitizedName = values.name.trim();

    const payload: IRegister = {
      email: sanitizedEmail,
      name: sanitizedName,
      password: values.password,
    };

    try {
      const response = await axios.post("/api/auth/register", payload);

      if (response.status === 201) {
        dispatch(
          openSuccessHandlerModal({
            id: "register-success",
            message: "Registration successful",
            type: "success",
          })
        );
        router.push("/auth/login");
      } else {
        setError("Registration failed. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "An error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Register
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                disabled={loading}
              >
                Register
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" align="center">
                Already have an account?{" "}
                <Link href="/auth/login" passHref>
                  <Typography
                    component="span"
                    color="secondary"
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
