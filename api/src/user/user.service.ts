import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./model/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./model/dtos/create-user.dto";
import { PasswordManagerService } from "src/auth/passwd.service";
import { LoginUserDto } from "./model/dtos/login-user.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private passwdManager: PasswordManagerService,
        private authService: AuthService,
    ) {}

    

    async registerUser(createUserDto: CreateUserDto):Promise<UserEntity>{
        const email = createUserDto.email
        const existingUser = await this.userRepo.findOne({
            where : { email },
        });

        if(existingUser){
            throw new ConflictException('Email already in use!');
        }

        const hashedPasswd = await this.passwdManager.hashPassword(createUserDto.password);

        const user = new UserEntity()
        user.username = createUserDto.username
        user.email = createUserDto.email
        user.password = hashedPasswd

        return this.userRepo.save(user)
    } 


    async loginUser(loginUserDto: LoginUserDto): Promise<string> {
        const email = loginUserDto.email;

        const existentUser = await this.userRepo.findOne({ where: {email} })
        if(!existentUser){
            throw new HttpException('User not found!',HttpStatus.BAD_REQUEST);
        }

        const passwdMatch = await this.passwdManager.comparePasswords(loginUserDto.password,existentUser.password)
        if(passwdMatch) {
            return this.authService.generateToken(existentUser)
        } else {
            throw new HttpException('Wrong credentials!',HttpStatus.UNAUTHORIZED);
        }
        
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepo.find()
    }


    async getUserById(id: number): Promise<UserEntity> {
        return this.userRepo.findOne({ where: {id} })
    }


    async uploadUserImage(userId: number, image: string): Promise<UserEntity> {
        const user = await this.userRepo.findOne({where: {id:userId}})
        if(!user){
            throw new HttpException('User not found!',HttpStatus.BAD_REQUEST);
        }

        const imageBuffer = Buffer.from(image, 'base64');

        user.profileImage = imageBuffer;
        return this.userRepo.save(user);
    }
}