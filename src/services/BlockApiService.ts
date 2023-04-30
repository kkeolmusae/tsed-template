import { Injectable, Service } from "@tsed/di";
import { $log } from "@tsed/logger";

@Injectable()
export class BlockApiService {
  TAG = "[BlockApiService]";

  constructor() {}

  public getBlockNumber(blockNumber: number) {
    return blockNumber;
  }
}
