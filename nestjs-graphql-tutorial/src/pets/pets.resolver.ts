// Packages
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { PetsService } from './pets.service';
// Assets
// Constants / Models / Interfaces / Types
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { Pet } from './entities/pet.entity';
// Utils / Methods / Mocks
// Styles

@Resolver(of => Pet)
export class PetsResolver {
   constructor(private petsService: PetsService) {}

   // NOTE :: Wherever you see an @Args declaration, I think that's so the GQL schema and documentation can have its own reference for what the incoming param types are supposed to be

   @Query(returns => Pet)
   async fetchPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
      return this.petsService.findOne(id);
   }

   @Query(returns => [Pet])
   async fetchAllPets(): Promise<Array<Pet>> {
      return this.petsService.findAll();
   }

   @Mutation(returns => Pet)
   async createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
      return this.petsService.createNewPet(createPetInput);
   }

   // `ResolveField` is good for when you have nested queries
   // basically when you want to get data from another source/object/table/class inside of a different one
   // i.e. getting `Owner` information while we're performing a query for/from the `Pet` class/table
   // (see Notion notes for an example)
   @ResolveField(type => Owner, { name: 'petOwner' }) // this is an alias that the GQL requests can use; otherwise, it defaults to the name of the method below
   async fetchOwner(@Parent() pet: Pet): Promise<Owner> {
      return this.petsService.getOwner(pet.ownerId);
   }
}
