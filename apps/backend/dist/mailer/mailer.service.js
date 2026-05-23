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
var MailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_constants_1 = require("./mailer.constants");
const digest_template_1 = require("./templates/digest.template");
const password_reset_template_1 = require("./templates/password-reset.template");
const reminder_template_1 = require("./templates/reminder.template");
let MailerService = MailerService_1 = class MailerService {
    provider;
    config;
    logger = new common_1.Logger(MailerService_1.name);
    constructor(provider, config) {
        this.provider = provider;
        this.config = config;
    }
    async sendPasswordResetEmail(to, resetUrl) {
        const template = (0, password_reset_template_1.passwordResetTemplate)(resetUrl);
        return this.send(to, template.subject, template.html, template.text);
    }
    async sendReminderEmail(to, params) {
        const template = (0, reminder_template_1.reminderTemplate)(params);
        return this.send(to, template.subject, template.html, template.text);
    }
    async sendDigestEmail(to, params) {
        const template = (0, digest_template_1.digestTemplate)(params);
        return this.send(to, template.subject, template.html, template.text);
    }
    async send(to, subject, html, text) {
        try {
            const result = await this.provider.send({ to, subject, html, text });
            this.logger.log(`Email sent to ${to}: ${subject}`);
            return { success: true, ...result };
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error);
            throw error;
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = MailerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mailer_constants_1.MAIL_PROVIDER)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map