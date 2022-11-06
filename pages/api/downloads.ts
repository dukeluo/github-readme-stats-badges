import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "../../utils/isEmpty";
import isNil from "../../utils/isNil";
import sum from "../../utils/sum";
import cors from "../../middlewares/cors";
import middleware from "../../middlewares/middleware";

interface INpmDownload {
  [packageName: string]: {
    [date: string]: number;
  };
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { author } = req.query;
  const today = new Date();
  const todayOfLastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  const url = `https://npm-stat.com/api/download-counts?author=${author}&from=${formatDate(
    todayOfLastYear
  )}&until=${formatDate(today)}`;
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
}

export default middleware(cors)(handler);
