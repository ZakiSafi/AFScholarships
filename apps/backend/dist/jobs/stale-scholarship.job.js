"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StaleScholarshipJob_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaleScholarshipJob = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const jobs_service_1 = require("./jobs.service");
let StaleScholarshipJob = StaleScholarshipJob_1 = class StaleScholarshipJob {
    jobsService;
    config;
    logger = new common_1.Logger(StaleScholarshipJob_1.name);
    constructor(jobsService, config) {
        this.jobsService = jobsService;
        this.config = config;
    }
    async handleCron() {
        if (!this.isEnabled())
            return;
        this.logger.log('Running stale scholarship check');
        const result = await this.jobsService.runStaleScholarshipCheck();
        this.logger.log(`Stale check complete: ${JSON.stringify(result)}`);
    }
    isEnabled() {
        return this.config.get('jobs.enabled') !== false;
    }
};
exports.StaleScholarshipJob = StaleScholarshipJob;
__decorate([
    (0, schedule_1.Cron)(process.env.JOB_STALE_SCHOLARSHIP_CRON ?? '0 2 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaleScholarshipJob.prototype, "handleCron", null);
exports.StaleScholarshipJob = StaleScholarshipJob = StaleScholarshipJob_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jobs_service_1.JobsService,
        config_1.ConfigService])
], StaleScholarshipJob);
//# sourceMappingURL=stale-scholarship.job.js.map