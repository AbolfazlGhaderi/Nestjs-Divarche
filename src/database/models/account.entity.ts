import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdsEntity } from "./ads.entity";

@Entity('accounts')
export class AccountEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true,nullable:false})
    mobile_number:string

    @Column({nullable:false})
    isblock: boolean;

    @Column({nullable:true})
    block_at: boolean;

    @CreateDateColumn()
    create_at:Date

    @UpdateDateColumn()
    update_at:Date

    @OneToMany(()=>AdsEntity,(ads)=> ads.account)
    ads: AdsEntity[]

}