import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OriginOpenReasonCategoryEntity } from './open-reason-category.entity';
import { OriginOpenReasonWorkflowId } from './or-workflow-id.entity';

@Entity('or_workflow_category')
export class OriginOpenReasonWorkflowCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int4',
  })
  id_or_category: number;

  @Column({
    type: 'int4',
  })
  id_or_workflow_id: number;

  @ManyToOne(
    () => OriginOpenReasonCategoryEntity,
    (entity) => entity.workFlowCategory,
  )
  @JoinColumn({
    name: 'id_or_category',
    referencedColumnName: 'id',
  })
  openReasonCategory: OriginOpenReasonCategoryEntity;

  @ManyToOne(
    () => OriginOpenReasonWorkflowId,
    (entity) => entity.workflowCategoryEntity,
  )
  @JoinColumn({
    name: 'id_or_workflow_id',
    referencedColumnName: 'id',
  })
  workflowId: OriginOpenReasonWorkflowId;

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
