import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowBusinessHourEntity } from './workflow-business-hour.entity';

@Entity('workflow', {
  synchronize: false,
})
export class WorkflowEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'uuid',
    name: 'id_company',
  })
  companyId: string;

  @Column({
    type: 'uuid',
    name: 'id_workspace',
  })
  workspaceId: string;

  @Column({ nullable: true, width: 25 })
  icon?: string;

  @Column({
    type: 'uuid',
    name: 'id_user_creator',
  })
  creatorUserId: string;

  @Column({ nullable: true, default: false })
  private?: boolean;

  @Column({ nullable: true, type: 'int4' })
  department?: number;

  @Column({ nullable: true, name: 'table_name', type: 'text' })
  tableName?: string;

  @Column({ nullable: true, name: 'column_name', type: 'text' })
  columnName?: string;

  @OneToMany(() => WorkflowBusinessHourEntity, (entity) => entity.workflow)
  workflowBusinessHour: WorkflowBusinessHourEntity;

  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt?: Date;
}
