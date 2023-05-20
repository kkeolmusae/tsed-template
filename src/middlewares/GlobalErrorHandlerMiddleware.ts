import { Err, Middleware, Req, Res, Next } from "@tsed/common";
import { NextFunction as ExpressNext } from "connect";
import { BadRequest, Forbidden } from "@tsed/exceptions";
import { $log } from "@tsed/logger";

@Middleware()
export default class GlobalErrorHandlerMiddleware {
  TAG = "[GlobalErrorHandlerMiddleware]";
  async use(@Err() error: any, @Res() response: Res, @Next() next: ExpressNext): Promise<any> {
    if (response.headersSent) {
      return next(error);
    }

    if (error instanceof BadRequest || error instanceof Forbidden) {
      $log.warn(`${this.TAG}`, error);
      response.status(error.status).json(error.data || { message: error.toString() });
      return next();
    }

    if (typeof error === "string") {
      response.status(404).json(error);
      return next();
    }

    $log.error(`${this.TAG}`, error);
    response.status(error.status || 500).json({ message: "Internal Error" });
    return next();
  }
}
