import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OriginOpenReasonEntity } from './or-reason.entity';
import { OriginOpenReasonWorkflowCategoryEntity } from './or-workflow-category.entity';

@Entity('or_category')
export class OriginOpenReasonCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'bool',
    name: 'active',
  })
  active: boolean;

  @OneToMany(
    () => OriginOpenReasonWorkflowCategoryEntity,
    (entity) => entity.openReasonCategory,
  )
  workFlowCategory: OriginOpenReasonWorkflowCategoryEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt?: Date;

  @OneToMany(
    () => OriginOpenReasonEntity,
    (openReasonEntity) => openReasonEntity.category,
    {
      cascade: true,
    },
  )
  openReason: OriginOpenReasonEntity[];
}
