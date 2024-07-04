import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OpenReasonEntity } from './open-reason.entity';
import { OpenReasonWorkflowCategoryEntity } from './open-reason-workflow-category.entity';

@Entity('open_reason_category')
export class OpenReasonCategoryEntity {
  @PrimaryColumn({
    primaryKeyConstraintName: 'PK_open_reason_category_id',
  })
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
    () => OpenReasonEntity,
    (openReasonEntity) => openReasonEntity.category,
    {
      cascade: true,
    },
  )
  openReason: OpenReasonEntity[];

  @OneToMany(
    () => OpenReasonWorkflowCategoryEntity,
    (workflowCategory) => workflowCategory.category,
  )
  workFlowCategory: OpenReasonWorkflowCategoryEntity[];

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
