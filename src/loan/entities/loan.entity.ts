import { User } from "src/auth/entities/user.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('loans')
export class Loan {
    @PrimaryGeneratedColumn()
    id:number


    @Column('text')
    clientFirstName:string

    @Column('text')
    clientLastName:string

    @Column('text')
    clientPhoneNumber:string

    @Column('decimal',{precision:10, scale:2})
    interest:number

    @Column({type:'enum',enum:[6,12,24,36,48,60]})
    terms:number

    @Column('int', {default:0})
    termsPaid:number

    @Column('decimal',{precision:10, scale:2})
    amount:number

    @Column('decimal',{precision:10, scale:2})
    amountPending:number

    @Column('numeric', {default:0})
    amountPaid:number

    @Column('text',{default:'pending'})
    status:string

    @Column({type:'enum',enum:['fixed','variable'], default:'fixed'})
    type:string

    @Column()
    createdAt:Date

    @Column()
    lastUpdate:Date

    @Column()
    lastPayment:Date

    @Column('decimal',{precision:10, scale:2})
    monthlyIncome:number

    @ManyToOne(
        () => User,
        (user) => user.loan
    )
    user:User

    @OneToMany(
        () => Payment,
        (payment) => payment.loan
    )
    payment:Payment

}
