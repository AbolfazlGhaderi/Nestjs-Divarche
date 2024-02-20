import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdsEntity } from "./ads.entity";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id :number

    @Column({nullable:false,unique:true})
    category_name:string

    @Column({nullable:false,unique:true})
    key:string

    @Column({nullable:true})
    parent_id:number

    @OneToMany(()=>AdsEntity,(ads)=> ads.category)
    ads:AdsEntity[]


}