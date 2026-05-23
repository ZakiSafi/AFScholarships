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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const update_application_status_dto_1 = require("../applications/dto/update-application-status.dto");
const bulk_archive_dto_1 = require("./dto/bulk-archive.dto");
const bulk_verify_dto_1 = require("./dto/bulk-verify.dto");
const list_audit_logs_dto_1 = require("./dto/list-audit-logs.dto");
const resolve_report_dto_1 = require("./dto/resolve-report.dto");
const run_job_dto_1 = require("./dto/run-job.dto");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    listReports(status) {
        return this.adminService.listReports(status);
    }
    resolveReport(id, user, payload) {
        return this.adminService.resolveReport(id, payload.status, user.userId);
    }
    listApplications(status) {
        return this.adminService.listApplications(status);
    }
    updateApplicationStatus(id, user, payload) {
        return this.adminService.updateApplicationStatus(id, payload, user.userId);
    }
    auditLogs(query) {
        return this.adminService.listAuditLogs(query);
    }
    bulkVerify(user, payload) {
        return this.adminService.bulkVerify(payload, user.userId);
    }
    bulkArchiveExpired(user, payload) {
        return this.adminService.bulkArchiveExpired(payload, user.userId);
    }
    flagStale(user, days) {
        void days;
        return this.adminService.flagStaleScholarships(30, user.userId);
    }
    runJob(user, payload) {
        return this.adminService.runJob(payload.job, user.userId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('reports'),
    (0, swagger_1.ApiOperation)({ summary: 'List listing reports for moderation queue' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listReports", null);
__decorate([
    (0, common_1.Patch)('reports/:id/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve or dismiss a listing report' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, resolve_report_dto_1.ResolveReportDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "resolveReport", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, swagger_1.ApiOperation)({ summary: 'List partner applications for review queue' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listApplications", null);
__decorate([
    (0, common_1.Patch)('applications/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update partner application status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_application_status_dto_1.UpdateApplicationStatusDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateApplicationStatus", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Read moderation audit logs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_audit_logs_dto_1.ListAuditLogsDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "auditLogs", null);
__decorate([
    (0, common_1.Patch)('scholarships/bulk-verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk verify or update verification status' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_verify_dto_1.BulkVerifyScholarshipsDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "bulkVerify", null);
__decorate([
    (0, common_1.Patch)('scholarships/bulk-archive-expired'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk archive scholarships past deadline' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_archive_dto_1.BulkArchiveExpiredDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "bulkArchiveExpired", null);
__decorate([
    (0, common_1.Patch)('scholarships/flag-stale'),
    (0, swagger_1.ApiOperation)({
        summary: 'Flag outdated scholarships as stale based on review recency',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "flagStale", null);
__decorate([
    (0, common_1.Post)('jobs/run'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger a background job (admin)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, run_job_dto_1.RunJobDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "runJob", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map