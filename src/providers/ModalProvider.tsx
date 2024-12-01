import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeModal } from "../store/reducers/modalSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

function ModalProvider() {
  const { openModals } = useAppSelector((state) => state.modal);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return openModals.map(
    ({ id, title, children, type, onConfirm, onCancel }, index) => (
      <Dialog
        key={`${id}${index}`}
        open={true}
        onClose={
          typeof onCancel === "function"
            ? onCancel
            : () => dispatch(closeModal(id))
        }
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            px: 2,
            gap: 2,
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              flex: 1,
              p: 0,
              textAlign: "left",
            }}
          >
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => dispatch(closeModal(id))}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box sx={{ p: 1 }}>{children}</Box>
        </DialogContent>
        {type === "confirmation" && (
          <DialogActions
            sx={{ p: 2, backgroundColor: theme.palette.background.default }}
          >
            <Button variant="outlined" onClick={onCancel}>
              {"Cancel"}
            </Button>
            <Button variant="contained" onClick={onConfirm}>
              {"Confirm"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    )
  );
}

export default ModalProvider;
