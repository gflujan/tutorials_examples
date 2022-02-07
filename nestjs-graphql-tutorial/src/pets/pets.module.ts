// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { OwnersModule } from 'src/owners/owners.module';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
// Assets
// Constants / Models / Interfaces / Types
import { Pet } from './entities/pet.entity';
// Utils / Methods / Mocks
// Styles

@Module({
   imports: [TypeOrmModule.forFeature([Pet]), OwnersModule],
   providers: [PetsService, PetsResolver],
})
export class PetsModule {}
