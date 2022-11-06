import { IMiddleware } from "./middleware";

const cache: IMiddleware = (_, res, next) => {
  const t1 = 60 * 60 * 12;
  const t2 = 60 * 60 * 24;

  res.setHeader(
    "Cache-Control",
    `max-age=${t1}, s-maxage=${t1}, stale-while-revalidate=${t2}`
  );
  next();
};

export default cache;
