import { Block } from "@src/models/Block";
import { BlockRepository } from "@src/repositories/BlockRepository";
import { Injectable, Service } from "@tsed/di";

@Injectable()
export class BlockService {
  TAG = "[BlockService]";

  constructor(private blockRepository: BlockRepository) {}

  public async getBlockFromDB(blockNumber: number): Promise<Block> {
    const block: Block = await this.blockRepository.getBlockById(blockNumber);
    return block;
  }
}
