import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import isEmpty from "../../utils/isEmpty";
import isNil from "../../utils/isNil";
import sum from "../../utils/sum";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

interface INpmDownload {
  [packageName: string | null]: {
    [date: string]: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  // await runMiddleware(req, res, cors)

  // Rest of the API logic
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
