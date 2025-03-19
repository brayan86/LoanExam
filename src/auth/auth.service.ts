import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { use } from 'passport';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly UserRepository : Repository <User>,
    private readonly jwtService:JwtService
    
  ){}
   async create(createAuthDto: CreateUserDto) {
  
    const{ email,password, ...userData } = createAuthDto

    const existEmail = await this.UserRepository.findOneBy({email})
    if(existEmail)
      throw new BadRequestException('Email Exist')

    const user = this.UserRepository.create({
      password: bcrypt.hashSync(password,10),
      email,
      createdAt: new Date(),
      ...userData
    })

    await this.UserRepository.save(user)

    return { user, message:'User Created'}
    
  }

  async login (loginUserDto:LoginUserDto){

    const {email, password} = loginUserDto

    const user = await this.UserRepository.findOne({
      where:{email},
      select:{email:true, password:true, id:true}
    })
    
    if(!user)
      throw new NotFoundException('Email not found')
    if(!bcrypt.compareSync(password,user.password))
      throw new NotFoundException('Password incorrect')

    const {password:string, ...userData} = user

    return{ ...userData, token: this.getJwt({id:user.id}) }

  }


   getJwt(payload:JwtPayload){
    const token = this.jwtService.sign(payload)
    return token
  }

  async getUser (id:number){
    
    const user = await this.UserRepository.findOneBy({id})

    if(!user)
      throw new BadRequestException('User not found')

    const { password:string, ...userData} = user

    return {...userData}
  }


}
