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
exports.UpdateScholarshipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const scholarship_content_dto_1 = require("./scholarship-content.dto");
class UpdateScholarshipDto extends scholarship_content_dto_1.NestedScholarshipContentDto {
    title;
    summary;
    description;
    provider;
    hostCountry;
    degreeLevel;
    fundingType;
    languageRequirement;
    fieldOfStudy;
    eligibleCountries;
    minAge;
    maxAge;
    applicationUrl;
    isPartnerApplication;
    startsAt;
    deadlineAt;
    deadlineTimezone;
    isFeatured;
}
exports.UpdateScholarshipDto = UpdateScholarshipDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "hostCountry", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.DegreeLevel }),
    (0, class_validator_1.IsEnum)(client_1.DegreeLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "degreeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.FundingType }),
    (0, class_validator_1.IsEnum)(client_1.FundingType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "fundingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "languageRequirement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateScholarshipDto.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateScholarshipDto.prototype, "eligibleCountries", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(12),
    (0, class_validator_1.Max)(120),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateScholarshipDto.prototype, "minAge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(12),
    (0, class_validator_1.Max)(120),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateScholarshipDto.prototype, "maxAge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "applicationUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateScholarshipDto.prototype, "isPartnerApplication", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "deadlineAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScholarshipDto.prototype, "deadlineTimezone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateScholarshipDto.prototype, "isFeatured", void 0);
//# sourceMappingURL=update-scholarship.dto.js.map