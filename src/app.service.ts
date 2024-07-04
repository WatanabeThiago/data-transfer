import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OriginOpenReasonEntity } from './entities/origin/or-reason.entity';
import { OpenReasonEntity } from './entities/destination/open-reason.entity';
import { OriginOpenReasonCategoryEntity } from './entities/origin/open-reason-category.entity';
import { OpenReasonCategoryEntity } from './entities/destination/open-reason-category.entity';
import { OpenReasonWorkflowCategoryEntity } from './entities/destination/open-reason-workflow-category.entity';
import { OpenReasonWorkflowEntity } from './entities/destination/open-reason-workflow.entity';
import { OriginOfficeHour } from './entities/origin/office-hour.entity';
import { BusinessHourEntity } from './entities/destination/business-hour.entity';
import { WorkflowBusinessHourEntity } from './entities/destination/workflow-business-hour.entity';
import { WorkflowEntity } from './entities/destination/workflow.entity';
// import { CompanyEntity } from './entities/destination/company.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager('default')
    private destinationEntityManager: EntityManager,

    @InjectEntityManager('origin')
    private originEntityManager: EntityManager,
  ) {}

  async getHello(): Promise<any> {
    let savesCount = 0;
    const originOpenReasonCategories = await this.originEntityManager.find(
      OriginOpenReasonCategoryEntity,
      {
        relations: {
          workFlowCategory: {
            workflowId: true,
          },
        },
      },
    );

    for await (const originOpenReasonCategory of originOpenReasonCategories) {
      const openReasonCategory = this.destinationEntityManager.create(
        OpenReasonCategoryEntity,
        {
          id: originOpenReasonCategory.id,
          active: originOpenReasonCategory.active,
          name: originOpenReasonCategory.name,
          createdAt: originOpenReasonCategory.createdAt,
          updatedAt: originOpenReasonCategory.updatedAt,
        },
      );

      savesCount = savesCount + 1;
      console.log({ saves: savesCount });
      await this.destinationEntityManager.save(
        OpenReasonCategoryEntity,
        openReasonCategory,
      );

      for await (const workflowCategory of originOpenReasonCategory.workFlowCategory) {
        const workflowId = this.destinationEntityManager.create(
          OpenReasonWorkflowEntity,
          {
            id: workflowCategory.workflowId.id,
            createdAt: workflowCategory.createdAt,
            updatedAt: workflowCategory.updatedAt,
            workflowId: workflowCategory.workflowId.id_workflow,
          },
        );

        savesCount = savesCount + 1;
        console.log({ saves: savesCount });
        await this.destinationEntityManager.save(
          OpenReasonWorkflowEntity,
          workflowId,
        );

        const openReasonWorkflowCategory = this.destinationEntityManager.create(
          OpenReasonWorkflowCategoryEntity,
          {
            id: workflowCategory.id,
            categoryId: openReasonCategory.id,
            workflowId: workflowId.id,
            createdAt: workflowCategory.createdAt,
            updatedAt: workflowCategory.updatedAt,
          },
        );
        savesCount = savesCount + 1;
        console.log({ saves: savesCount });

        await this.destinationEntityManager.save(
          OpenReasonWorkflowCategoryEntity,
          openReasonWorkflowCategory,
        );
      }

      const originOpenReasons = await this.originEntityManager.find(
        OriginOpenReasonEntity,
        {
          where: {
            categoryId: openReasonCategory.id,
          },
          relations: {
            category: {
              workFlowCategory: {
                workflowId: true,
              },
            },
          },
        },
      );

      for await (const originOpenReason of originOpenReasons) {
        console.table({
          categoryId: openReasonCategory.id,
          name: originOpenReason.name,
        });

        const typeTime = originOpenReason.idUnitTime - 1;

        const openReason = this.destinationEntityManager.create(
          OpenReasonEntity,
          {
            id: originOpenReason.id,
            active: originOpenReason.active,
            name: originOpenReason.name,
            time: originOpenReason.time,
            typeTime,
            categoryId: openReasonCategory.id,
            createdAt: originOpenReason.createdAt,
            updatedAt: originOpenReason.updatedAt,
          },
        );

        savesCount = savesCount + 1;
        console.log({ saves: savesCount });
        await this.destinationEntityManager.save(OpenReasonEntity, openReason);
      }
    }

    // Office Hours

    console.log(132);
    const officeHours = await this.originEntityManager.find(OriginOfficeHour);

    for await (const originOfficeHour of officeHours) {
      const businessHour = this.destinationEntityManager.create(
        BusinessHourEntity,
        {
          id: originOfficeHour.id,
          description: originOfficeHour.description,
          companyToken: process.env.COMPANY_TOKEN,
          messageOutsideAttendance: originOfficeHour.message_outside_attendance,
          offlineOperatorMessage: originOfficeHour.offline_operator_message,
          activated: originOfficeHour.activated,
          days: originOfficeHour.days,
          applyToBot: originOfficeHour.apply_to_bot,
          createdAt: originOfficeHour.created_at,
          updatedAt: originOfficeHour.updated_at,
        },
      );

      savesCount = savesCount + 1;
      console.log({ saves: savesCount });
      await this.destinationEntityManager.save(
        BusinessHourEntity,
        businessHour,
      );

      for await (const department of originOfficeHour.department.department) {
        const workflows = await this.destinationEntityManager.find(
          WorkflowEntity,
          {
            where: {
              department: department,
            },
          },
        );

        for await (const workflow of workflows) {
          const worfklowBusinessHours = this.destinationEntityManager.create(
            WorkflowBusinessHourEntity,
            {
              updatedAt: originOfficeHour.updated_at,
              created_at: originOfficeHour.created_at,
              businessHourId: businessHour.id,
              workflowId: workflow.id,
              createdBy: businessHour.createdBy,
            },
          );

          savesCount = savesCount + 1;
          console.log({ saves: savesCount });
          await this.destinationEntityManager.save(
            WorkflowBusinessHourEntity,
            worfklowBusinessHours,
          );
        }
      }
    }

    const businessHours = await this.destinationEntityManager.find(
      BusinessHourEntity,
      {
        relations: {
          workflowBusinessHours: true,
        },
      },
    );
    // Department tem que virar workflow
    return {
      officeHours,
      businessHours,
    };
  }
}
