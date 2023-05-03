export interface ParsedBlock {
  id: number;
  timestamp: number;
  blockHash: string;
  parentHash: string;
  miner: string;
  fee: string;
  gasUsed: string;
  size: number;
  txCount: number;
  itxCount: number;
  baseFee: string;
}
