"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mailer_module_1 = require("../mailer/mailer.module");
const digest_sender_job_1 = require("./digest-sender.job");
const jobs_service_1 = require("./jobs.service");
const notification_retry_job_1 = require("./notification-retry.job");
const reminder_sender_job_1 = require("./reminder-sender.job");
const stale_scholarship_job_1 = require("./stale-scholarship.job");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), mailer_module_1.MailerModule],
        providers: [
            jobs_service_1.JobsService,
            stale_scholarship_job_1.StaleScholarshipJob,
            reminder_sender_job_1.ReminderSenderJob,
            digest_sender_job_1.DigestSenderJob,
            notification_retry_job_1.NotificationRetryJob,
        ],
        exports: [jobs_service_1.JobsService],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map