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
exports.ScholarshipsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const create_scholarship_dto_1 = require("./dto/create-scholarship.dto");
const list_scholarships_dto_1 = require("./dto/list-scholarships.dto");
const report_listing_dto_1 = require("./dto/report-listing.dto");
const update_scholarship_dto_1 = require("./dto/update-scholarship.dto");
const verify_scholarship_dto_1 = require("./dto/verify-scholarship.dto");
const scholarships_service_1 = require("./scholarships.service");
let ScholarshipsController = class ScholarshipsController {
    scholarshipsService;
    constructor(scholarshipsService) {
        this.scholarshipsService = scholarshipsService;
    }
    list(query) {
        return this.scholarshipsService.list(query);
    }
    getBySlug(slug) {
        return this.scholarshipsService.getBySlug(slug);
    }
    report(scholarshipId, payload, user) {
        return this.scholarshipsService.createReport(scholarshipId, payload, user.userId);
    }
    create(payload, user) {
        return this.scholarshipsService.create(payload, user.userId);
    }
    update(id, payload) {
        return this.scholarshipsService.update(id, payload);
    }
    verify(id, payload, user) {
        return this.scholarshipsService.verify(id, payload.status, user.userId);
    }
};
exports.ScholarshipsController = ScholarshipsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List scholarships with filters and pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_scholarships_dto_1.ListScholarshipsDto]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get scholarship details by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "getBySlug", null);
__decorate([
    (0, common_1.Post)(':id/report'),
    (0, swagger_1.ApiOperation)({
        summary: 'Report potentially outdated or incorrect listing data',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Report submitted' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, report_listing_dto_1.ReportListingDto, Object]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "report", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create scholarship (admin)' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scholarship_dto_1.CreateScholarshipDto, Object]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update scholarship (admin)' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_scholarship_dto_1.UpdateScholarshipDto]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify or flag scholarship (admin)' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, verify_scholarship_dto_1.VerifyScholarshipDto, Object]),
    __metadata("design:returntype", void 0)
], ScholarshipsController.prototype, "verify", null);
exports.ScholarshipsController = ScholarshipsController = __decorate([
    (0, swagger_1.ApiTags)('scholarships'),
    (0, common_1.Controller)('scholarships'),
    __metadata("design:paramtypes", [scholarships_service_1.ScholarshipsService])
], ScholarshipsController);
//# sourceMappingURL=scholarships.controller.js.map