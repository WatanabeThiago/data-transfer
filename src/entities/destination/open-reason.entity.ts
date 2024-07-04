import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeTime } from './enums/type-time';
import { OpenReasonCategoryEntity } from './open-reason-category.entity';

@Entity('open_reason')
export class OpenReasonEntity {
  @PrimaryColumn({
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
    type: 'enum',
    name: 'id_type_time',
    enum: TypeTime,
  })
  typeTime: TypeTime;

  @Column({
    type: 'int4',
    name: 'category_id',
  })
  categoryId: number;

  @ManyToOne(
    () => OpenReasonCategoryEntity,
    (openReasonCategoryEntity) => openReasonCategoryEntity.openReason,
  )
  @JoinColumn({
    foreignKeyConstraintName: 'FK_open_reason_category_id_open_reason_category',
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: OpenReasonCategoryEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt?: Date;

  toMinutes() {
    switch (this.typeTime) {
      case TypeTime.Minutes:
        return this.time;
      case TypeTime.Hours:
        return this.time * 60;
      case TypeTime.Days:
        return this.time * 24 * 60;
      case TypeTime.Months:
        return this.time * 30 * 24 * 60;
      case TypeTime.Years:
        return this.time * 365 * 24 * 60;
      default:
        this.time;
    }
  }
}
