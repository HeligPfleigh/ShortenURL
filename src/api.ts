import axios from "axios";
import { server } from "./config";
// import { IShortenURL } from "./models/URL.model";

const instance = axios.create({
  baseURL: server,
});

export const shortenLink = (originalUrl: string) =>
  instance.post("/api/url", { originalUrl });

export const getLinks = () => instance.get("/api/url");
