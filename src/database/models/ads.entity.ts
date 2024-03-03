import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccountEntity } from "./account.entity";
import { CategoryEntity } from "./category.entity";
import { CityEntity } from './city.entity';

@Entity('ads')
export class AdsEntity{

    @PrimaryGeneratedColumn()
    id :number

    @Column({nullable:false,unique:false})
    title:string;

    @Column({nullable:false,type:'text'})
    description:string

    @Column({nullable:true})
    photo:string;

    @Column({nullable:false})
    price:string;

    @ManyToOne(()=>AccountEntity,(account)=>account.ads,{onDelete:'CASCADE'})
    @JoinColumn({name:'account_id'})
    account:AccountEntity

    @ManyToOne(()=>CategoryEntity,(category)=>category.ads,{onDelete:'CASCADE'})
    @JoinColumn({name:'category_id'})
    category:CategoryEntity

    @ManyToOne(()=>CityEntity,(city)=>city.ads)
    @JoinColumn({name:'city_id'})
    city:CityEntity


}