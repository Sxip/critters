import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateUsers1587068168844 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'nickname',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
          isUnique: false,
        },
        {
          name: 'ticket',
          type: 'varchar',
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'nicknameColor',
          type: 'varchar',
          default: '\'white\'',
          isNullable: true,
        },
        {
          name: 'critterId',
          type: 'varchar',
          default: '\'hamster\'',
          isNullable: true,
        },
        {
          name: 'coins',
          type: 'integer',
          default: 100,
          isNullable: true,
        },
        {
          name: 'gems',
          type: 'integer',
          default: 0,
          isNullable: true,
        },
        {
          name: 'head',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'eyes',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'ears',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'mask',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'body',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'pack',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'hand',
          type: 'bigint',
          isUnique: true,
          isNullable: true,
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

    /**
     * Creates the users items table.
     */
    await queryRunner.createTable(new Table({
      name: 'users_items',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userId',
          type: 'bigint',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'itemId',
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
     * Creates a foreign key for users.
     */
    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        columnNames: ['critterId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'critters',
      }),
      new TableForeignKey({
        columnNames: ['head'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
      new TableForeignKey({
        columnNames: ['eyes'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
      new TableForeignKey({
        columnNames: ['ears'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
      new TableForeignKey({
        columnNames: ['mask'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
      new TableForeignKey({
        columnNames: ['body'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
      new TableForeignKey({
        columnNames: ['pack'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
      new TableForeignKey({
        columnNames: ['hand'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users_items',
      }),
    ])

    /**
     * Creates the foreign key for users items.
     */
    await queryRunner.createForeignKeys('users_items', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
      new TableForeignKey({
        columnNames: ['itemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
    return queryRunner.dropTable('users_items')
  }
}
