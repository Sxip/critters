import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1586889834768 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
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
          default: 'uuid_generate_v4()',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'nicknameColor',
          type: 'varchar',
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
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users')
  }
}
