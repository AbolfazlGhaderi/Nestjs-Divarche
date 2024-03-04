import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { AdsEntity } from './ads.entity';

@Entity('photos')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  photo_url: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ nullable: false, default: false })
  isdeleted: boolean;

  @Column({ nullable: true })
  delete_at: Date;

  @OneToOne(() => AdsEntity, (ads) => ads.photo)
  ads: AdsEntity;
}
