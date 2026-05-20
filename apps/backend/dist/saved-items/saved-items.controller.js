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
exports.SavedItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const saved_items_service_1 = require("./saved-items.service");
let SavedItemsController = class SavedItemsController {
    savedItemsService;
    constructor(savedItemsService) {
        this.savedItemsService = savedItemsService;
    }
    list(user) {
        return this.savedItemsService.listForUser(user.userId);
    }
    save(user, scholarshipId) {
        return this.savedItemsService.save(user.userId, scholarshipId);
    }
    remove(user, scholarshipId) {
        return this.savedItemsService.remove(user.userId, scholarshipId);
    }
};
exports.SavedItemsController = SavedItemsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List current user saved scholarships' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedItemsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':scholarshipId'),
    (0, swagger_1.ApiOperation)({ summary: 'Save scholarship for current user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Saved' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('scholarshipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavedItemsController.prototype, "save", null);
__decorate([
    (0, common_1.Delete)(':scholarshipId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove saved scholarship for current user' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('scholarshipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavedItemsController.prototype, "remove", null);
exports.SavedItemsController = SavedItemsController = __decorate([
    (0, swagger_1.ApiTags)('saved-items'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('saved-items'),
    __metadata("design:paramtypes", [saved_items_service_1.SavedItemsService])
], SavedItemsController);
//# sourceMappingURL=saved-items.controller.js.map