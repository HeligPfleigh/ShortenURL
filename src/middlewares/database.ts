import nextConnect from "next-connect";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type IConnection = {
  isConnected?: boolean;
};

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let connection: IConnection = {}; /* creating connection object*/

async function database(
  _req: NextApiRequest,
  _res: NextApiResponse,
  next: any
) {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return next();
  }
  const db = await mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  );

  connection.isConnected = Boolean(db.connections[0].readyState);

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
