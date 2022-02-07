// Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { Pet } from './entities/pet.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
// Assets
// Constants / Models / Interfaces / Types
import { CreatePetInput } from './dto/create-pet.input';
// Utils / Methods / Mocks
// Styles

@Injectable()
export class PetsService {
   constructor(
      @InjectRepository(Pet) private petsRepository: Repository<Pet>,
      private ownersService: OwnersService,
   ) {}

   async createNewPet(createPetInput: CreatePetInput): Promise<Pet> {
      const newPet = this.petsRepository.create(createPetInput); // this is the same as: newPet = new Pet(); newPet.name = createPetInput.name, etc.
      return this.petsRepository.save(newPet);
   }

   async findAll(): Promise<Array<Pet>> {
      return this.petsRepository.find(); // this is effectively the same thing as doing this: `SELECT * FROM pet` on a SQL table/db
   }

   async findOne(id: number): Promise<Pet> {
      // using just `.find` here will return an empty array if nothing is found
      // i.e.it does not give an explicit failure message / error / response
      // this all depends on how you want to handle a pet not being found
      return this.petsRepository.findOneOrFail(id);
   }

   async getOwner(ownerId: number): Promise<Owner> {
      return this.ownersService.findOne(ownerId);
   }
}
