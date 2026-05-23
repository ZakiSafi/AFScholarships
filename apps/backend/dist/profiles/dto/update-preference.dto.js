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
exports.UpdatePreferenceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class UpdatePreferenceDto {
    locale;
    timezone;
    emailDigestEnabled;
    marketingOptIn;
    preferredCountries;
    preferredDegreeLevels;
}
exports.UpdatePreferenceDto = UpdatePreferenceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'en' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePreferenceDto.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Asia/Kabul' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePreferenceDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdatePreferenceDto.prototype, "emailDigestEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdatePreferenceDto.prototype, "marketingOptIn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePreferenceDto.prototype, "preferredCountries", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.DegreeLevel, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.DegreeLevel, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePreferenceDto.prototype, "preferredDegreeLevels", void 0);
//# sourceMappingURL=update-preference.dto.js.map