import { BlockApiService } from "@src/services/Block/BlockApiService";
import { PathParams } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/block")
export class BlockController {
  constructor(private blockApiService: BlockApiService) {}

  @Get("/")
  default() {
    return "block";
  }

  @Get("/:blockNumber")
  getBlock(@PathParams("blockNumber") blockNumber: number) {
    return this.blockApiService.getBlockInfo(blockNumber);
  }
}
