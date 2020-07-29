import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateShops1596045102494 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'shops',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'free',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'next',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'last',
          type: 'varchar',
          isNullable: true,
        },
      ],
    }))

    /**
     * Creates the shop collections items table.
     */
    await queryRunner.createTable(new Table({
      name: 'shops_collections',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'item',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'shop',
          type: 'varchar',
          isNullable: false,
        },
      ],
    }))

    /**
     * Creates a foreign key for shops collection items.
     */
    await queryRunner.createForeignKeys('shops_collections', [
      new TableForeignKey({
        columnNames: ['item'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        columnNames: ['shop'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shops',
      }),
    ])

    /**
     * Creates a foreign key for shops.
     */
    await queryRunner.createForeignKeys('shops', [
      new TableForeignKey({
        columnNames: ['free'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        columnNames: ['next'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        columnNames: ['last'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('shops')
  }
}
