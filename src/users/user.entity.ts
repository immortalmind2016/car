import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  password: string;

  //HOOKS
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }
}
