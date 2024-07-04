import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowBusinessHourEntity } from './workflow-business-hour.entity';

export class DayType {
  static create(partial: Partial<DayType>) {
    const it = new DayType();
    Object.assign(it, partial);
    return it;
  }

  day:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  start: string;
  end: string;

  toJsDay() {
    switch (this.day) {
      case 'Sunday':
        return 0;
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thursday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
    }
  }
}

export class DaysType {
  static create(partial: Partial<DaysType>) {
    const it = new DaysType();
    Object.assign(it, partial);
    return it;
  }

  days: DayType[];

  private _dictionary: { [key: string]: DayType };

  toDictionary() {
    this._dictionary = (this.days || []).reduce((acc, item) => {
      acc[item.day] = item;
      return acc;
    }, {});
    return this._dictionary;
  }

  getFromDictionary(day: string) {
    if (!this._dictionary) {
      this.toDictionary();
    }

    return this._dictionary[day];
  }
}

@Entity('business_hour')
export class BusinessHourEntity {
  static create(partial: Partial<BusinessHourEntity>) {
    const it = new BusinessHourEntity();
    Object.assign(it, partial);
    return it;
  }

  @PrimaryColumn({
    primaryKeyConstraintName: 'PK_business_hour_id',
  })
  id: number;

  @Column({ nullable: true })
  description?: string;

  @Column({
    name: 'message_outside_attendance',
  })
  messageOutsideAttendance?: string;

  @Column({
    name: 'offline_operator_message',
  })
  offlineOperatorMessage?: string;

  @Column({ default: true })
  activated: boolean;

  @Column({
    type: 'json',
  })
  days: DaysType;

  @OneToMany(() => WorkflowBusinessHourEntity, (entity) => entity.businessHour)
  workflowBusinessHours: WorkflowBusinessHourEntity[];

  @Column({ name: 'apply_to_bot', default: false })
  applyToBot: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'created_by',
    nullable: true,
  })
  createdBy?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt?: Date;

  @Column({
    name: 'updated_by',
    nullable: true,
  })
  updatedBy?: string;
}
