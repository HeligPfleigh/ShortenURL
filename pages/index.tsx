import React, { useState, useRef } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import {
  TextField,
  Button,
  Theme,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import axios from "axios";

import { server } from "../src/config";

const useStyles = makeStyles((theme: Theme) => ({
  shortenSection: {
    backgroundColor: blue[400],
    color: "white",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Index() {
  const classes = useStyles();
  const [shortendURL, setShortenURL] = useState<string>("");
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const handleShortenURL = async () => {
    try {
      const {
        data: { shortUrl },
      } = await axios.post(`${server}/api/url`, {
        originalUrl,
      });

      setShortenURL(`${server}${shortUrl}`);
    } catch (error) {}
  };

  const handleCloseDialog = () => setShortenURL("");

  const copyToClipboard = () => navigator.clipboard.writeText(shortendURL);

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
      <Dialog
        fullWidth
        open={Boolean(shortendURL)}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
              <IconButton aria-label="copy" onClick={copyToClipboard}>
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
    </Container>
  );
}
