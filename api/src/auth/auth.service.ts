import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserModel } from "src/user/model/user.model";
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user: UserModel): Promise<string>{
        const filteredPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
        }
        return this.jwtService.signAsync({ filteredPayload })
    }

    verifyJwt(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token);
      }
}