// Packages
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { OwnersService } from './owners.service';
// Assets
// Constants / Models / Interfaces / Types
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/owner.entity';
import { UpdateOwnerInput } from './dto/update-owner.input';
// Utils / Methods / Mocks
// Styles

@Resolver(() => Owner)
export class OwnersResolver {
   constructor(private readonly ownersService: OwnersService) {}

   @Mutation(() => Owner)
   createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
      return this.ownersService.create(createOwnerInput);
   }

   @Query(() => [Owner], { name: 'owners' })
   findAll() {
      return this.ownersService.findAll();
   }

   @Query(() => Owner, { name: 'owner' })
   findOne(@Args('id', { type: () => Int }) id: number) {
      return this.ownersService.findOne(id);
   }

   @Mutation(() => Owner)
   updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
      return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
   }

   @Mutation(() => Owner)
   removeOwner(@Args('id', { type: () => Int }) id: number) {
      return this.ownersService.remove(id);
   }
}
