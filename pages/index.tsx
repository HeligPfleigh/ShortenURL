import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
import { mutate } from "swr";

import { server } from "../src/config";
import URLTable from "../src/components/URLTable";
import { shortenLink } from "../src/api";

interface ISnackInfo {
  severity?: AlertProps["severity"];
  message?: string;
}

export default function Index() {
  const [shortendURL, setShortenURL] = useState<string>("");
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [snack, setSnack] = useState<ISnackInfo>({});

  const handleShortenURL = async () => {
    try {
      const {
        data: { shortUrl },
      } = await shortenLink(originalUrl);
      mutate("/api/user");
      setShortenURL(`${server}${shortUrl}`);
    } catch (error) {
      setSnack({
        severity: "error",
        message: "Fail to shorten your URL!",
      });
    }
  };

  const handleCloseDialog = () => setShortenURL("");

  const copyURLToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setSnack({
      severity: "info",
      message: "URL copied!",
    });
  };

  const handleCloseSnackbar = () => setSnack({});

  return (
    <Container>
      <Box py={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Simplify your link
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            fullWidth
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            id="filled-helperText"
            label="Your origin URL here"
            helperText="All links here are public and can be accessed by anyone"
          />
        </Grid>
        <Grid item xs={3}>
          <Button onClick={handleShortenURL}>Shorten URL</Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <URLTable onCopy={(url: string) => copyURLToClipboard(url)} />
      </Box>
      <Dialog fullWidth open={Boolean(shortendURL)} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">Your shorten URL</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={11}>
              <TextField
                id="input-with-icon-grid"
                disabled
                fullWidth
                value={shortendURL}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="copy"
                onClick={() => copyURLToClipboard(shortendURL)}
              >
                <FileCopyTwoToneIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(snack.severity)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  );
}
