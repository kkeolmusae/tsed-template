import { $log } from "@tsed/common";
import { registerProvider } from "@tsed/di";

import { DataSource } from "typeorm";

import * as dotenvFlow from "dotenv-flow";
const TAG = "[DefaultDataSource]";

let rootDir = __dirname + "/..";
dotenvFlow.config();

console.log(`${TAG} rootDir : ${rootDir}`);

export const DefaultDataSource: DataSource = new DataSource({
  name: "default",
  type: "mysql",
  charset: "utf8mb4_unicode_ci",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  logging: process.env.MYSQL_LOG === "true",
  synchronize: false,
  dropSchema: false,
  entities: [`${rootDir}/entities/**/*.{ts,js}`],
  migrations: [`${rootDir}/migrations/**/*.{ts,js}`],
  migrationsTableName: "migrations",
  extra: {
    connectionLimit: 10,
  },
});

registerProvider<DataSource>({
  provide: DefaultDataSource,
  type: "typeorm:datasource",
  async useAsyncFactory() {
    if (!DefaultDataSource.isInitialized) {
      await DefaultDataSource.initialize();
      $log.info(`${TAG} Connected with typeorm to database: MySQL`);
      $log.info(`${TAG} Mysql Host: ${process.env.MYSQL_HOST}`);
    }
    return DefaultDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    },
  },
});
