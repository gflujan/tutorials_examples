// Packages
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// Context / Store / Router
// Components / Classes / Controllers / Services
// Assets
// Constants / Models / Interfaces / Types
import { Pet } from 'src/pets/entities/pet.entity';
// Utils / Methods / Mocks
// Styles

@Entity()
@ObjectType()
export class Owner {
   @PrimaryGeneratedColumn()
   @Field(type => Int)
   public id: number;

   @Column()
   @Field()
   public name: string;

   // the 1st arg below declares the return type for/from the table (e.g. TypeORM in this case)
   // the 2nd arg below is the relational connection between tables
   // this is saying that we know a pet belongs to this owner if the`pet.owner` field matches this owner
   // i.e. in the `pet` object, the matching field (for this Owner) is the `pet.owner` cell/property
   @OneToMany(() => Pet, pet => pet.owner)
   @Field(type => [Pet], { nullable: true })
   public pets?: Array<Pet>;
}
