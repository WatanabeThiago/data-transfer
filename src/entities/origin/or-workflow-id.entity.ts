import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OriginOpenReasonWorkflowCategoryEntity } from './or-workflow-category.entity';

@Entity('or_workflow_id')
export class OriginOpenReasonWorkflowId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'uuid',
  })
  id_workflow: string;

  @OneToMany(
    () => OriginOpenReasonWorkflowCategoryEntity,
    (openReasonEntity) => openReasonEntity.workflowId,
  )
  workflowCategoryEntity: OriginOpenReasonWorkflowCategoryEntity[];

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
