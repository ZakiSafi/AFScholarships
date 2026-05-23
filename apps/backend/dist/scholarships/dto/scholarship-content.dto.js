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
exports.NestedScholarshipContentDto = exports.ScholarshipTagDto = exports.ScholarshipSourceDto = exports.ScholarshipFaqDto = exports.ScholarshipBenefitDto = exports.ScholarshipRequirementDto = exports.ApplicationStepDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ApplicationStepDto {
    orderIndex;
    title;
    description;
    isRequired = true;
}
exports.ApplicationStepDto = ApplicationStepDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ApplicationStepDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplicationStepDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApplicationStepDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ApplicationStepDto.prototype, "isRequired", void 0);
class ScholarshipRequirementDto {
    orderIndex;
    label;
    description;
    isMandatory = true;
}
exports.ScholarshipRequirementDto = ScholarshipRequirementDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ScholarshipRequirementDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipRequirementDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipRequirementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ScholarshipRequirementDto.prototype, "isMandatory", void 0);
class ScholarshipBenefitDto {
    orderIndex;
    title;
    description;
}
exports.ScholarshipBenefitDto = ScholarshipBenefitDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ScholarshipBenefitDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipBenefitDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipBenefitDto.prototype, "description", void 0);
class ScholarshipFaqDto {
    orderIndex;
    question;
    answer;
}
exports.ScholarshipFaqDto = ScholarshipFaqDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ScholarshipFaqDto.prototype, "orderIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipFaqDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipFaqDto.prototype, "answer", void 0);
class ScholarshipSourceDto {
    url;
    label;
}
exports.ScholarshipSourceDto = ScholarshipSourceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ScholarshipSourceDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipSourceDto.prototype, "label", void 0);
class ScholarshipTagDto {
    slug;
    name;
}
exports.ScholarshipTagDto = ScholarshipTagDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tag slug, created if missing' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipTagDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ScholarshipTagDto.prototype, "name", void 0);
class NestedScholarshipContentDto {
    steps;
    requirements;
    benefits;
    faqs;
    sources;
    tags;
}
exports.NestedScholarshipContentDto = NestedScholarshipContentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ApplicationStepDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ApplicationStepDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NestedScholarshipContentDto.prototype, "steps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ScholarshipRequirementDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScholarshipRequirementDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NestedScholarshipContentDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ScholarshipBenefitDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScholarshipBenefitDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NestedScholarshipContentDto.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ScholarshipFaqDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScholarshipFaqDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NestedScholarshipContentDto.prototype, "faqs", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ScholarshipSourceDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScholarshipSourceDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NestedScholarshipContentDto.prototype, "sources", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ScholarshipTagDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ScholarshipTagDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NestedScholarshipContentDto.prototype, "tags", void 0);
//# sourceMappingURL=scholarship-content.dto.js.map