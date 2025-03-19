import { Loan } from "src/loan/entities/loan.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column('text')
    firstName:string

    @Column('text')
    lastName:string

    @Column('text', {unique:true})
    email:string

    @Column('text')
    password:string

    @Column()
    createdAt:Date

    @OneToMany(
        () => Loan,
        (loan) => loan.user
    )
    loan:Loan

    @OneToMany(
        () => Payment,
        (payment) => payment.user
    )
    payment: Payment



}
