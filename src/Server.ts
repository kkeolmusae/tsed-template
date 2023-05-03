import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { $log, PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import { DataSource } from "typeorm";

import { config } from "@src/config/index";
import * as rest from "@src/controllers/rest/index";
import { DefaultDataSource } from "@src/db/DefaultDataSource";

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
  mount: {
    "/rest": process.env.REST === "true" ? [...Object.values(rest)] : [],
  },
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

  public $onInit(): Promise<any> | void {
    $log.info(`${TAG} Starting Ts.ed template project server`);
    $log.info(`${TAG} Connecting to the following database server:`);
    $log.info(`${TAG} NODE_ENV: ${process.env.NODE_ENV}`);
  }
}
