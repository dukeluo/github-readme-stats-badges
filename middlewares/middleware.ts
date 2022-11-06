import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

function run(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default function middleware(...middlewares) {
  return (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
      for (const m of middlewares) {
        await run(req, res, m);
      }

      return await handler(req, res);
    };
}
