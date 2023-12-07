import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./model/user.entity";
import { Like, Repository } from "typeorm";
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
        console.log(user)
        if(!user){
            throw new HttpException('User not found!',HttpStatus.BAD_REQUEST);
        }

        const imageBuffer = Buffer.from(image, 'base64');

        user.profileImage = imageBuffer;
        return this.userRepo.save(user);
    }

    async searchByUserName(username: string):Promise<UserEntity[]> {
        console.log(username)
        const searchedUser =  `%${username}%`;
        return this.userRepo.find({where: {username: Like(searchedUser)}})
    }


    async deleteUserByEmail(email: string): Promise<void> {
        const user = await this.userRepo.findOne({ where: { email } });
    
        if (user) {
            await this.userRepo.remove(user);
        }
    }



    async prepopulateDatabase(): Promise<void> {
        
        const initialUserData: any = [
            {
                username: 'AlexTest',
                email: 'alex@testemail.com',
                password: '1123581321',
                description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                profileImage:'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'
            },
            // Add more users as needed
        ];

        const existentUser = await this.userRepo.findOne({where:{ email: initialUserData[0].email }});
        if(existentUser){
            return
        }
        const base64String = initialUserData[0].profileImage;

        // Convert the base64 string to a Buffer
        const bufferImage = Buffer.from(base64String, 'base64');
        
        // Update initialUserData[0].profileImage with the Buffer
        initialUserData[0].profileImage = bufferImage;

         //Hash the password
         const hashedPasswd = await this.passwdManager.hashPassword(initialUserData[0].password);
         initialUserData[0].password = hashedPasswd

        for (const userData of initialUserData) {
            await this.userRepo.save(userData);
        }
    }
}