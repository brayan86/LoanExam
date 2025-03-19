import { User } from "src/auth/entities/user.entity";
import { Loan } from "src/loan/entities/loan.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id:number

    @Column('numeric')
    amount:number

    @Column({type:'enum', enum:['payment','abono']})
    type:string

    @Column()
    createdAt:Date

    @ManyToOne(
        ()=>Loan,
        (loan) => loan.payment
    )
    loan:Loan

    @ManyToOne(
        () => User,
        (user) => user.payment
    )
    user:User
}
