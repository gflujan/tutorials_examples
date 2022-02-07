// Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Context / Store / Router
// Components / Classes / Controllers / Services
// Assets
// Constants / Models / Interfaces / Types
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/owner.entity';
import { UpdateOwnerInput } from './dto/update-owner.input';
// Utils / Methods / Mocks
// Styles

@Injectable()
export class OwnersService {
   constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

   create(createOwnerInput: CreateOwnerInput) {
      const newOwner: Owner = this.ownersRepository.create(createOwnerInput);
      return this.ownersRepository.save(newOwner);
   }

   findAll() {
      return this.ownersRepository.find();
   }

   findOne(id: number) {
      return this.ownersRepository.findOneOrFail(id);
   }

   update(id: number, updateOwnerInput: UpdateOwnerInput) {
      return `This action updates a #${id} owner`;
   }

   remove(id: number) {
      return `This action removes a #${id} owner`;
   }
}
