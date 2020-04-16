import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { generate6CharacterCode } from '../utils/generator.utils';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ default: false, nullable: false })
  activated!: boolean;

  @Column({ default: generate6CharacterCode(), nullable: false })
  activationCode!: string;
}
