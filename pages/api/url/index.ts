import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { nanoid } from "nanoid";

import dbMiddleware from "../../../src/middlewares/database";
import ShortenURLModel from "../../../src/models/URL.model";

const handler = nextConnect();

handler.use(dbMiddleware);

let schema = yup.object().shape({
  originalUrl: yup.string().url().required(),
});

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await ShortenURLModel.find();
    res.statusCode = 200;
    res.json(data);
  } catch (error) {
    res.statusCode = 400;
    res.json({ error });
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await schema.validate(req.body);
    const urlCode = nanoid(10);
    const { originalUrl } = req.body;
    const newShortenURL = new ShortenURLModel({
      urlCode,
      originalUrl,
      shortUrl: `/api/url/${urlCode}`,
    });
    await newShortenURL.save();
    res.statusCode = 200;
    res.json(newShortenURL.toJSON());
  } catch (error) {
    res.statusCode = 400;
    res.json({ error });
  }
});

export default (req: NextApiRequest, res: NextApiResponse) =>
  handler.apply(req, res);
