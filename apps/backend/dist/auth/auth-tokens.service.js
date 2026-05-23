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
exports.AuthTokensService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
let AuthTokensService = class AuthTokensService {
    jwtService;
    config;
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
    }
    async signAccessToken(payload) {
        const secret = this.config.get('jwt.accessSecret') ?? 'super-secret-key';
        const options = {
            secret,
            expiresIn: (this.config.get('jwt.accessExpiresIn') ??
                '15m'),
        };
        return this.jwtService.signAsync(payload, options);
    }
    generateRefreshToken() {
        const raw = (0, crypto_1.randomBytes)(48).toString('hex');
        const hash = this.hashToken(raw);
        const expiresIn = this.config.get('jwt.refreshExpiresIn') ?? '7d';
        const expiresAt = this.parseExpiry(expiresIn);
        return { raw, hash, expiresAt };
    }
    generateResetToken() {
        const raw = (0, crypto_1.randomBytes)(32).toString('hex');
        const hash = this.hashToken(raw);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        return { raw, hash, expiresAt };
    }
    hashToken(raw) {
        return (0, crypto_1.createHash)('sha256').update(raw).digest('hex');
    }
    parseExpiry(expiresIn) {
        const match = /^(\d+)([smhd])$/.exec(expiresIn);
        if (!match) {
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        const ms = unit === 's'
            ? value * 1000
            : unit === 'm'
                ? value * 60 * 1000
                : unit === 'h'
                    ? value * 60 * 60 * 1000
                    : value * 24 * 60 * 60 * 1000;
        return new Date(Date.now() + ms);
    }
};
exports.AuthTokensService = AuthTokensService;
exports.AuthTokensService = AuthTokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthTokensService);
//# sourceMappingURL=auth-tokens.service.js.map