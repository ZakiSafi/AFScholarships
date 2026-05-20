import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { AuthUser } from './interfaces/auth-user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: LoginDto): Promise<{
        access_token: string;
    }>;
    profile(user: AuthUser): AuthUser;
}
