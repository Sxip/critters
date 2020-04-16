import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRooms1587068116213 implements MigrationInterface {
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
          name: 'name',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'height',
          type: 'integer',
          default: 480,
          isNullable: true,
        },
        {
          name: 'width',
          type: 'integer',
          default: 850,
          isNullable: true,
        },
        {
          name: 'startX',
          type: 'integer',
          default: 440,
          isNullable: true,
        },
        {
          name: 'startY',
          type: 'integer',
          default: 190,
          isNullable: true,
        },
        {
          name: 'startR',
          type: 'integer',
          default: 180,
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: true,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: true,
        },
      ],
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('rooms')
  }
}
