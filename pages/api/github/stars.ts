import { NextApiRequest, NextApiResponse } from "next";
import cache from "../../../middlewares/cache";
import cors from "../../../middlewares/cors";
import middleware from "../../../middlewares/middleware";
import isEmpty from "../../../utils/isEmpty";
import isNil from "../../../utils/isNil";

interface IGitHubRepo {
  stargazers_count: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;

  if (isNil(user)) {
    return res.status(400).send("Bad request");
  }

  const url = `https://api.github.com/users/${user}/repos`;

  try {
    const response = await fetch(url);
    const data: IGitHubRepo[] = await response.json();

    if (isNil(data) || isEmpty(data)) {
      return res.json({ count: 0 });
    }

    const count = data.reduce(
      (count, repo) => count + repo.stargazers_count,
      0
    );

    return res.json({ count });
  } catch (e) {
    console.error(e);

    return res.status(500).send("Internal Server Error");
  }
}

export default middleware(cors, cache)(handler);
