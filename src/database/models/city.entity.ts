import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdsEntity } from "./ads.entity";

@Entity('cities')
export class CityEntity {

    @PrimaryGeneratedColumn()
    id :number

    @Column({nullable:false,unique:true})
    city_name:string

    @Column({nullable:false,unique:true})
    key:string

    @OneToMany(()=>AdsEntity,(ads)=>ads.city)
    ads:AdsEntity[]

}