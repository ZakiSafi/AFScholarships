import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: LoginDto): Promise<{
        access_token: string;
    }>;
    profile(req: {
        user: {
            userId: string;
            email: string;
        };
    }): {
        userId: string;
        email: string;
    };
}
