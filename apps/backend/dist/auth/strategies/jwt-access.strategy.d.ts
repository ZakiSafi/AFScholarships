import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../auth-tokens.service';
declare const JwtAccessStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    constructor(config: ConfigService);
    validate(payload: AccessTokenPayload): {
        userId: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
    };
}
export {};
