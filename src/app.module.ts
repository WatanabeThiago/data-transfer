import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessHourEntity } from './entities/destination/business-hour.entity';
import { OpenReasonEntity } from './entities/destination/open-reason.entity';
import { OpenReasonCategoryEntity } from './entities/destination/open-reason-category.entity';
import { OpenReasonWorkflowCategoryEntity } from './entities/destination/open-reason-workflow-category.entity';
import { OpenReasonWorkflowEntity } from './entities/destination/open-reason-workflow.entity';
import { WorkflowBusinessHourEntity } from './entities/destination/workflow-business-hour.entity';
import { WorkflowEntity } from './entities/destination/workflow.entity';
import { OriginOfficeHour } from './entities/origin/office-hour.entity';
import { OriginOpenReasonCategoryEntity } from './entities/origin/open-reason-category.entity';
import { OriginOpenReasonEntity } from './entities/origin/or-reason.entity';
import { OriginOpenReasonWorkflowCategoryEntity } from './entities/origin/or-workflow-category.entity';
import { OriginOpenReasonWorkflowId } from './entities/origin/or-workflow-id.entity';
import { CompanyEntity } from './entities/destination/company.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // ? Destination
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DESTINATION_HOST,
      port: Number(process.env.DESTINATION_PORT),
      username: process.env.DESTINATION_USERNAME,
      password: process.env.DESTINATION_PASSWORD,
      database: process.env.DESTINATION_DATABASE,
      entities: [
        BusinessHourEntity,
        OpenReasonEntity,
        OpenReasonCategoryEntity,
        OpenReasonWorkflowCategoryEntity,
        OpenReasonWorkflowEntity,
        WorkflowBusinessHourEntity,
        WorkflowEntity,
        CompanyEntity,
      ],
      synchronize: false,
      autoLoadEntities: false,
    }),
    TypeOrmModule.forFeature(
      [
        BusinessHourEntity,
        OpenReasonEntity,
        OpenReasonCategoryEntity,
        OpenReasonWorkflowCategoryEntity,
        OpenReasonWorkflowEntity,
        WorkflowBusinessHourEntity,
        WorkflowEntity,
        CompanyEntity,
      ],
      'default',
    ),

    // ? Origin
    TypeOrmModule.forRoot({
      name: 'origin',
      type: 'postgres',
      host: process.env.ORIGIN_HOST,
      port: Number(process.env.ORIGIN_PORT),
      username: process.env.ORIGIN_USERNAME,
      password: process.env.ORIGIN_PASSWORD,
      database: process.env.ORIGIN_DATABASE,
      entities: [
        OriginOfficeHour,
        OriginOpenReasonCategoryEntity,
        OriginOpenReasonCategoryEntity,
        OriginOpenReasonCategoryEntity,
        OriginOpenReasonEntity,
        OriginOpenReasonWorkflowCategoryEntity,
        OriginOpenReasonWorkflowId,
      ],
      synchronize: false,
      autoLoadEntities: false,
    }),
    TypeOrmModule.forFeature(
      [
        OriginOfficeHour,
        OriginOpenReasonCategoryEntity,
        OriginOpenReasonCategoryEntity,
        OriginOpenReasonCategoryEntity,
        OriginOpenReasonEntity,
        OriginOpenReasonWorkflowCategoryEntity,
        OriginOpenReasonWorkflowId,
      ],
      'origin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
