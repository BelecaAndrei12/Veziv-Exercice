import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordManagerService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
      }
    
      async comparePasswords(
        password: string,
        storedPasswordHash: string,
      ): Promise<any> {
        return bcrypt.compare(password, storedPasswordHash);
      }
}