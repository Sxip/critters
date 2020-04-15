import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRooms1586907581504 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
      name: 'rooms',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
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
    return queryRunner.dropTable('rooms')
  }
}
