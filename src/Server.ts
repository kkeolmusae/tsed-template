import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { $log, PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import { DataSource } from "typeorm";
import cors from "cors";

import { config } from "@src/config/index";
import { DefaultDataSource } from "@src/db/DefaultDataSource";
import { InvalidOrigin } from "@src/exceptions/CommonExceptions";

import GlobalErrorHandlerMiddleware from "@src/middlewares/GlobalErrorHandlerMiddleware";

const TAG = "[Server]";
const rootDir = __dirname;

$log.info(`${TAG} rootDir : ${rootDir}`);
$log.debug(join(process.cwd(), "../views"));

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  typeORM: DefaultDataSource as DataSource,
  middlewares: ["cors", "cookie-parser", "compression", "method-override", "json-parser", { use: "urlencoded-parser", options: { extended: true } }],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  public $beforeRoutesInit(): Promise<any> | void {
    const whitelist: string[] = ["https://tsed.io"].concat(process.env.IS_DEV === "true" ? ["http://localhost:8888", "http://0.0.0.0:8888"] : []);

    const corsOptions = {
      origin: function (origin: any, callback: any) {
        // origin is undefined when making requests between servers
        if (whitelist.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new InvalidOrigin(origin));
        }
      },
      credentials: true,
    };

    this.app.use(cors(corsOptions));
  }

  public $onInit(): Promise<any> | void {
    $log.info(`${TAG} Starting Ts.ed template project server`);
    $log.info(`${TAG} Connecting to the following database server:`);
    $log.info(`${TAG} NODE_ENV: ${process.env.NODE_ENV}`);
  }

  $afterRoutesInit() {
    this.app.use(GlobalErrorHandlerMiddleware);
  }
}
