import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { importProviders } from "@tsed/components-scan";
import { Server } from "@src/Server";
import * as rest from "@src/controllers/rest/index";

const TAG = `[Index]`;
const rootDir = __dirname;
async function bootstrap() {
  try {
    $log.info(`${TAG} start`);

    const scannedProviders = await importProviders({
      mount: {
        "/rest": process.env.REST === "true" ? [...Object.values(rest)] : [],
      },
      imports: [`${rootDir}/services/*.ts`].concat(process.env.TEST === "true" ? [`${rootDir}/services/Cron/TestCron.ts`] : []),
    });

    const platform = await PlatformExpress.bootstrap(Server, {
      ...scannedProviders,
    });

    await platform.listen();

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({ event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack });
  }
}

bootstrap();
