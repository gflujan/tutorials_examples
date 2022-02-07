// Packages
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsNumber } from 'class-validator';
// Context / Store / Router
// Components / Classes / Controllers / Services
// Assets
// Constants / Models / Interfaces / Types
// Utils / Methods / Mocks
// Styles

@InputType()
export class CreatePetInput {
   @IsAlpha()
   @Field()
   public name: string;

   @IsAlphanumeric()
   @Field({ nullable: true })
   public type?: string;

   @IsNumber() // is this overkill to do this? or would this provide type safety/validation during runtime?
   @Field(type => Int)
   public ownerId: number;
}
