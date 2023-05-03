import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "@src/Server";
import { TestCron } from "@src/services/Cron/TestCron";

const TAG = `[Index]`;
async function bootstrap() {
  try {
    const platform = await PlatformExpress.bootstrap(Server);
    $log.info(`${TAG} start`);

    if (process.env.TEST === "true") {
      platform.addComponents(TestCron);
    }

    await platform.listen();

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({ event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack });
  }
}

bootstrap();
