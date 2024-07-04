import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Destination Database
@Entity('office_hours')
export class OriginOfficeHour {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string; // ? Ok

  @Column()
  message_outside_attendance: string; // ? Ok

  @Column()
  offline_operator_message: string; // ? Ok

  @Column('jsonb')
  days: any; // ? Ok

  @Column('json')
  department: { department: number[] }; // ? Ok

  @Column()
  activated: boolean; // ? Ok

  @Column()
  apply_to_bot: boolean; // ? Ok

  // @Column()
  // created_by: boolean; // ? Ok

  @CreateDateColumn()
  created_at: boolean; // ? ok

  @UpdateDateColumn()
  updated_at: boolean; // ? Ok
}
