import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowEntity } from './workflow.entity';
import { BusinessHourEntity } from './business-hour.entity';

@Entity('workflow_business_hour')
export class WorkflowBusinessHourEntity {
  @PrimaryColumn({
    primaryKeyConstraintName: 'PK_workflow_business_hour_id',
  })
  id: number;

  @Column({
    type: 'uuid',
    name: 'id_workflow',
  })
  workflowId: string;

  @Column({ name: 'id_business_hour' })
  businessHourId: number;

  @ManyToOne(() => BusinessHourEntity, (entity) => entity.workflowBusinessHours)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_workflow_business_hour_id_business_hour',
    name: 'id_business_hour',
  })
  businessHour: BusinessHourEntity;

  @ManyToOne(() => WorkflowEntity, (entity) => entity.workflowBusinessHour)
  @JoinColumn({
    foreignKeyConstraintName: 'FK_workflow_business_hour_id_workflow',
    name: 'id_workflow',
  })
  workflow: WorkflowEntity;

  // @Column({
  //   nullable: true,
  // })
  // createdBy?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt?: Date;

  // @Column({
  //   nullable: true,
  // })
  // updatedBy?: string;
}
