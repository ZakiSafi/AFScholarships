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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListScholarshipsDto = exports.ListScholarshipsDto = exports.SortOrder = exports.ScholarshipSortField = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var ScholarshipSortField;
(function (ScholarshipSortField) {
    ScholarshipSortField["DEADLINE"] = "deadline";
    ScholarshipSortField["TITLE"] = "title";
    ScholarshipSortField["CREATED"] = "created";
    ScholarshipSortField["FEATURED"] = "featured";
})(ScholarshipSortField || (exports.ScholarshipSortField = ScholarshipSortField = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class ListScholarshipsDto {
    page = 1;
    limit = 10;
    search;
    country;
    degreeLevel;
    fundingType;
    eligibleCountry;
    fieldOfStudy;
    tag;
    partnerOnly;
    verificationStatus;
    sortBy = ScholarshipSortField.DEADLINE;
    sortOrder = SortOrder.ASC;
    includeFacets;
}
exports.ListScholarshipsDto = ListScholarshipsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListScholarshipsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListScholarshipsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.DegreeLevel }),
    (0, class_validator_1.IsEnum)(client_1.DegreeLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "degreeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.FundingType }),
    (0, class_validator_1.IsEnum)(client_1.FundingType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "fundingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "eligibleCountry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by tag slug' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ListScholarshipsDto.prototype, "partnerOnly", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.VerificationStatus }),
    (0, class_validator_1.IsEnum)(client_1.VerificationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ScholarshipSortField, default: 'deadline' }),
    (0, class_validator_1.IsEnum)(ScholarshipSortField),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: SortOrder, default: 'asc' }),
    (0, class_validator_1.IsEnum)(SortOrder),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListScholarshipsDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Include facet counts in response',
        default: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ListScholarshipsDto.prototype, "includeFacets", void 0);
class AdminListScholarshipsDto extends ListScholarshipsDto {
    status;
}
exports.AdminListScholarshipsDto = AdminListScholarshipsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.ScholarshipStatus }),
    (0, class_validator_1.IsEnum)(client_1.ScholarshipStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminListScholarshipsDto.prototype, "status", void 0);
//# sourceMappingURL=list-scholarships.dto.js.map