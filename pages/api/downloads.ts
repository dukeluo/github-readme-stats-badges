import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "../../utils/isEmpty";
import isNil from "../../utils/isNil";
import sum from "../../utils/sum";
import cors from "../../middlewares/cors";
import cache from "../../middlewares/cache";
import middleware from "../../middlewares/middleware";

interface INpmDownload {
  [packageName: string]: {
    [date: string]: number;
  };
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { author } = req.query;

  if (isNil(author)) {
    return res.status(400).send("Bad request");
  }

  const today = new Date();
  const todayOfLastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  const url = `https://npm-stat.com/api/download-counts?author=${author}&from=${formatDate(
    todayOfLastYear
  )}&until=${formatDate(today)}`;

  try {
    const response = await fetch(url);
    const data: INpmDownload = await response.json();

    if (isNil(data) || isEmpty(data)) {
      return res.json({ count: 0 });
    }

    const count = Object.values(data).reduce(
      (count, packageDownloads) => count + sum(Object.values(packageDownloads)),
      0
    );

    return res.json({ count });
  } catch (e) {
    console.error(e);

    return res.status(500).send("Internal Server Error");
  }
}

export default middleware(cors, cache)(handler);
