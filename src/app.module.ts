import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoanModule } from './loan/loan.module';
import { AmortizationModule } from './amortization/amortization.module';

@Module({
  imports:[
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      username: process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      host:process.env.DB_HOST,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
      synchronize:true,
      autoLoadEntities:true
    }),
    LoanModule,
    AmortizationModule
  ],
})
export class AppModule {}
