// Packages
import { InputType, Field } from '@nestjs/graphql';
// Context / Store / Router
// Components / Classes / Controllers / Services
// Assets
// Constants / Models / Interfaces / Types
// Utils / Methods / Mocks
// Styles

@InputType()
export class CreateOwnerInput {
   @Field()
   public name: string;
}
