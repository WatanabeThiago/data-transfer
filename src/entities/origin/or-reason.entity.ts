import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeTime } from '../destination/enums/type-time';
import { OriginOpenReasonCategoryEntity } from './open-reason-category.entity';

@Entity('or_reason')
export class OriginOpenReasonEntity {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_open_reason_id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'int4',
    name: 'time',
  })
  time: number;

  @Column({
    type: 'bool',
    name: 'active',
  })
  active: boolean;

  @Column({
    name: 'id_unit_time',
    enum: TypeTime,
  })
  idUnitTime: TypeTime;

  @Column({
    type: 'int4',
    name: 'id_or_category',
  })
  categoryId: number;

  @ManyToOne(
    () => OriginOpenReasonCategoryEntity,
    (openReasonCategoryEntity) => openReasonCategoryEntity.openReason,
  )
  @JoinColumn({
    name: 'id_or_category',
    referencedColumnName: 'id',
  })
  category: OriginOpenReasonCategoryEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt?: Date;
}
