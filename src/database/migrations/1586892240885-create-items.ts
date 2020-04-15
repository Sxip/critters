import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateItems1586892240885 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
      name: 'items',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'theme',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'slot',
          type: 'enum',
          enum: ['head', 'body', 'ears', 'mask', 'cape'],
          isNullable: false,
        },
        {
          name: 'cost',
          type: 'integer',
          default: 0,
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
      ],
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('items')
  }
}
