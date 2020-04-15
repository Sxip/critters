import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateUsers1586889834768 implements MigrationInterface {
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
     * Creates a foreign key for critters.
     */
    const foreignKey = new TableForeignKey({
      columnNames: ['critterId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'critters',
    })

    return queryRunner.createForeignKey('users', foreignKey)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users')
  }
}
