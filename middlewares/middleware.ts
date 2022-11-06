import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

interface INextFunction {
  (err?: any): void;
}

interface IMiddleware {
  (req: NextApiRequest, res: NextApiResponse, next: INextFunction): any;
}

function run(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: IMiddleware
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default function middleware(...middlewares: IMiddleware[]) {
  return (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
      for (const m of middlewares) {
        try {
          await run(req, res, m);
        } catch (e) {
          console.error(e);

          return res.status(500).send("Internal Server Error");
        }
      }

      return await handler(req, res);
    };
}
