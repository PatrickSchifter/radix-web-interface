import { Box, Typography } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface IModalProps {
  id: string;
  title: string;
  children: ReactNode;
  type?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface IState {
  openModals: IModalProps[];
}

const initialState = {
  openModals: [],
} as IState;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { id, title, children, type, onConfirm, onCancel } =
        action.payload as IModalProps;

      state.openModals.push({
        id,
        title,
        children,
        type,
        onConfirm,
        onCancel,
      });
    },
    closeModal: (state, action) => {
      const id = action.payload;
      state.openModals = state.openModals.filter((modal) => modal.id !== id);
    },
    closeModals: (state, action) => {
      const ids = action.payload as string[];
      state.openModals = state.openModals.filter(
        (modal) => !ids.includes(modal.id)
      );
    },
    openErrorHandlerModal: (state, action) => {
      const { title = "Error", children, error } = action.payload;

      const content = children ||
        error?.response?.data?.message ||
        error?.reason ||
        error?.message || <pre>{JSON.stringify(error, null, 2)}</pre>;

      const validationErrors = error?.response?.data?.errors || [];

      state.openModals.push({
        id: "error-handler-modal",
        title,
        children: (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {content && <div>{content}</div>}
            {validationErrors.length > 0 && (
              <Box>
                {validationErrors.map(
                  ({ msg }: { msg: string }, index: number) => {
                    if (!msg) return <Box key={index} />;
                    return (
                      <Typography key={index} variant="body2">
                        {msg}
                      </Typography>
                    );
                  }
                )}
              </Box>
            )}
          </Box>
        ),
      });
    },
    openSuccessHandlerModal: (state, action) => {
      const { title = "Success", children, message } = action.payload;

      const content = children || message;

      state.openModals.push({
        id: "success-handler-modal",
        title,
        children: (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2">{content}</Typography>
          </Box>
        ),
      });
    },
  },
});

export const {
  openModal,
  closeModal,
  closeModals,
  openErrorHandlerModal,
  openSuccessHandlerModal,
} = modalSlice.actions;

export default modalSlice.reducer;
