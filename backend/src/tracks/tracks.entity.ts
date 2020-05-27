import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { User } from "../users/users.entity";

@Entity()
export class Track extends BaseEntity {
  @Column({ nullable: false })
  name!: string;

  @ManyToOne((_type) => User)
  owner!: User["id"];
}
