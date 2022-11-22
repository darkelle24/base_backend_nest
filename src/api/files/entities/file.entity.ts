import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, AfterLoad } from 'typeorm';

@Entity()
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column({ unique: true, select: false })
  @ApiHideProperty()
  path: string

  @Column()
  mimetype: string

  downloadLink: string;
  showLink: string;

  @AfterLoad()
  updateCounters() {
    this.downloadLink = '/files/download/' + this.id;
    this.showLink = '/files/show/' + this.id;
  }
}

