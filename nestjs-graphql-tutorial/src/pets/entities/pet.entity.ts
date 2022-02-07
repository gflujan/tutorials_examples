// Packages
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// Context / Store / Router
// Components / Classes / Controllers / Services
// Assets
// Constants / Models / Interfaces / Types
import { Owner } from 'src/owners/entities/owner.entity';
// Utils / Methods / Mocks
// Styles

@Entity() // this tells TypeORM that this is our representation for a table of `Pets`
@ObjectType() // this tells GraphQL what an object type of `Pet` should look like for the its schema
export class Pet {
   @PrimaryGeneratedColumn()
   @Field(type => Int)
   public id: number;

   @Column()
   @Field()
   public name: string;

   @Column({ nullable: true })
   @Field({ nullable: true })
   public type?: string;

   @Column()
   @Field(type => Int)
   public ownerId: number;

   @ManyToOne(() => Owner, owner => owner.pets)
   @Field(type => Owner)
   public owner: Owner;

   constructor() {}
}
