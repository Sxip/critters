import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRooms1587068116213 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
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

    /**
     * Creates the triggers table.
     */
    await queryRunner.createTable(new Table({
      name: 'rooms_triggers',
      columns: [
        {
          name: 'roomId',
          type: 'varchar',
          isPrimary: true,
          isNullable: false,
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['item', 'teleport'],
          default: '\'teleport\'',
          isNullable: true,
        },
        {
          name: 'triggerX',
          type: 'integer',
          default: 100,
          isNullable: true,
        },
        {
          name: 'triggerY',
          type: 'integer',
          default: 100,
          isNullable: true,
        },
        {
          name: 'radius',
          type: 'integer',
          default: 100,
          isNullable: true,
        },
        {
          name: 'action',
          type: 'varchar',
          isNullable: false,
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

    /**
    * Creates the foreign key for room id.
    */
    await queryRunner.createForeignKey('rooms_triggers', new TableForeignKey({
      columnNames: ['roomId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'rooms',
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rooms')
    return queryRunner.dropTable('rooms_triggers')
  }
}
