import { DataSource, Repository } from "typeorm";
import { Block } from "@src/models/Block";
import { Injectable } from "@tsed/di";

@Injectable()
export class BlockRepository extends Repository<Block> {
  constructor(private dataSource: DataSource) {
    super(Block, dataSource.createEntityManager());
  }

  public async getBlockById(id: number): Promise<Block> {
    return (await this.dataSource.createQueryBuilder().select("*").from(Block, "block").where("id = :id", { id }).limit(1).getRawOne()) as Block;
  }
}
