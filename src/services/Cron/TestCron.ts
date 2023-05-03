import { $log, OnReady } from "@tsed/common";
import { Service } from "@tsed/di";

@Service()
export class TestCron implements OnReady {
  TAG = "[Test]";

  constructor() {}

  $onReady(): any {
    $log.info(`${this.TAG} start`);
    this.runTest();
  }

  private runTest() {
    $log.info("test");
  }
}
