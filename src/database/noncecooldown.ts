import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NonceCoolDown extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("timestamp")
	unlockTime: Date;

	@Column("text")
	network: string;
}
