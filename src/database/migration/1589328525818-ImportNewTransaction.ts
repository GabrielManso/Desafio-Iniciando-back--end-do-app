import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ImportNewTransaction1589328525818
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'newTransaction',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'newTransactions');
  }
}
