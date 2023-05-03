import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
@Index(["timestamp"])
@Index(["miner", "timestamp"])
export class Block {
  @PrimaryColumn({ unsigned: true })
  id: number;

  @Column()
  timestamp: number;

  @Column("binary", { length: 32 })
  blockHash: Buffer;

  @Column("binary", { length: 32 })
  parentHash: Buffer;

  @Column("binary", { length: 20 })
  miner: Buffer;

  @Column("binary", { length: 32 })
  fee: Buffer;

  @Column("bigint", { unsigned: true })
  gasUsed: string;

  @Column("int", { unsigned: true })
  size: number;

  @Column("int", { unsigned: true })
  transactionCount: number;

  @Column("int", { unsigned: true })
  internalTransactionCount: number;

  @Column("binary", { length: 32, nullable: true, default: null })
  baseFee: Buffer;
}
