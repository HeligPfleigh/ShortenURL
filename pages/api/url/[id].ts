import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import dbMiddleware from "../../../src/middlewares/database";
import ShortenURLModel from "../../../src/models/URL.model";

const handler = nextConnect();

handler.use(dbMiddleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  try {
    const data = await ShortenURLModel.findOneAndUpdate(
      { urlCode: id as string },
      { $inc: { clickCount: 1 } }
    );
    res.redirect(data?.originalUrl || "/");
  } catch (error) {
    res.statusCode = 400;
    res.json({ error });
  }
});

export default (req: NextApiRequest, res: NextApiResponse) =>
  handler.apply(req, res);
