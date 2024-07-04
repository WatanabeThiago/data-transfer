import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OpenReasonWorkflowCategoryEntity } from './open-reason-workflow-category.entity';

@Entity('open_reason_workflow')
export class OpenReasonWorkflowEntity {
  @PrimaryColumn({
    primaryKeyConstraintName: 'PK_open_reason_workflow_id',
  })
  id: number;

  @Column({
    type: 'uuid',
    name: 'workflow_id',
  })
  workflowId: string;

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
