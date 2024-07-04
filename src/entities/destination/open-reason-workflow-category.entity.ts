import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OpenReasonCategoryEntity } from './open-reason-category.entity';
import { OpenReasonWorkflowEntity } from './open-reason-workflow.entity';

@Entity('open_reason_workflow_category')
export class OpenReasonWorkflowCategoryEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'int4',
    name: 'category_id',
  })
  categoryId: number;

  @Column({
    type: 'int4',
    name: 'workflow_id',
  })
  workflowId: number;

  @ManyToOne(
    () => OpenReasonCategoryEntity,
    (openReasonCategoryEntity) => openReasonCategoryEntity.openReason,
  )
  @JoinColumn({
    foreignKeyConstraintName:
      'FK_open_reason_category_category_id_open_reason_category',
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: OpenReasonCategoryEntity;

  @ManyToOne(
    () => OpenReasonWorkflowEntity,
    (OpenReasonWorkflowEntity) => OpenReasonWorkflowEntity.workFlowCategory,
  )
  @JoinColumn({
    foreignKeyConstraintName:
      'FK_open_reason_category_workflow_id_open_reason_workflow',
    name: 'workflow_id',
    referencedColumnName: 'id',
  })
  workflow: OpenReasonWorkflowEntity;

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
