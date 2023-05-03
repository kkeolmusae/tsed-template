import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683103642928 implements MigrationInterface {
    name = 'Init1683103642928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`block\` (\`id\` int UNSIGNED NOT NULL, \`timestamp\` int NOT NULL, \`blockHash\` binary(32) NOT NULL, \`parentHash\` binary(32) NOT NULL, \`miner\` binary(20) NOT NULL, \`fee\` binary(32) NOT NULL, \`gasUsed\` bigint UNSIGNED NOT NULL, \`size\` int UNSIGNED NOT NULL, \`transactionCount\` int UNSIGNED NOT NULL, \`internalTransactionCount\` int UNSIGNED NOT NULL, \`baseFee\` binary(32) NULL, INDEX \`IDX_25a11b53ccc7546865151d101a\` (\`miner\`, \`timestamp\`), INDEX \`IDX_5c67cbcf4960c1a39e5fe25e87\` (\`timestamp\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5c67cbcf4960c1a39e5fe25e87\` ON \`block\``);
        await queryRunner.query(`DROP INDEX \`IDX_25a11b53ccc7546865151d101a\` ON \`block\``);
        await queryRunner.query(`DROP TABLE \`block\``);
    }

}
