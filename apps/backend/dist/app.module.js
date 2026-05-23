"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const admin_module_1 = require("./admin/admin.module");
const applications_module_1 = require("./applications/applications.module");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const health_module_1 = require("./health/health.module");
const mailer_module_1 = require("./mailer/mailer.module");
const prisma_module_1 = require("./prisma/prisma.module");
const profiles_module_1 = require("./profiles/profiles.module");
const reminders_module_1 = require("./reminders/reminders.module");
const saved_items_module_1 = require("./saved-items/saved-items.module");
const scholarships_module_1 = require("./scholarships/scholarships.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigModule,
            prisma_module_1.PrismaModule,
            mailer_module_1.MailerModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            profiles_module_1.ProfilesModule,
            scholarships_module_1.ScholarshipsModule,
            saved_items_module_1.SavedItemsModule,
            applications_module_1.ApplicationsModule,
            reminders_module_1.RemindersModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map