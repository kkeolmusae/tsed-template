import { Block } from "@src/models/Block";
import { Injectable, Service } from "@tsed/di";
import { $log } from "@tsed/logger";
import { BlockService } from "./BlockService";
import { ParsedBlock } from "@src/interfaces/Interface";
import CommonUtils from "@src/utils/CommonUtils";

@Injectable()
export class BlockApiService {
  TAG = "[BlockApiService]";

  constructor(private blockSvc: BlockService) {}

  public async getBlockInfo(blockNumber: number) {
    const block: Block = await this.blockSvc.getBlockFromDB(blockNumber);
    return this.parseBlock(block);
  }

  private parseBlock(block: Block): ParsedBlock {
    const parsedBlock: ParsedBlock = {
      id: block.id,
      timestamp: block.timestamp,
      blockHash: CommonUtils.buffer2Hash(block.blockHash),
      parentHash: CommonUtils.buffer2Hash(block.parentHash),
      miner: CommonUtils.buffer2HexAddress(block.miner),
      fee: block.fee && CommonUtils.buffer2NumberString(block.fee),
      gasUsed: block.gasUsed,
      size: block.size,
      txCount: block.transactionCount,
      itxCount: block.internalTransactionCount,
      baseFee: block.baseFee && CommonUtils.buffer2NumberString(block.baseFee),
    };

    return parsedBlock;
  }
}
