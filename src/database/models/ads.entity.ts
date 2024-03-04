import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { CategoryEntity } from './category.entity';
import { CityEntity } from './city.entity';
import { PhotoEntity } from './photo.entity';

@Entity('ads')
export class AdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false })
  title: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false })
  price: string;

  @OneToOne(() => PhotoEntity, (photo) => photo.ads, { nullable: true })
  @JoinColumn({ name: 'photo_id' })
  photo: PhotoEntity;

  @ManyToOne(() => AccountEntity, (account) => account.ads, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.ads, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => CityEntity, (city) => city.ads, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;
}
