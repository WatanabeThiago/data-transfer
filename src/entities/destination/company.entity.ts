import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  token: string;
}
