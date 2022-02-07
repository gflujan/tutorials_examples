// Packages
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { CreateOwnerInput } from './create-owner.input';
// Assets
// Constants / Models / Interfaces / Types
// Utils / Methods / Mocks
// Styles

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
   @Field(() => Int)
   id: number;
}
