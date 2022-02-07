// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
// Assets
// Constants / Models / Interfaces / Types
import { Owner } from './entities/owner.entity';
// Utils / Methods / Mocks
// Styles

@Module({
   exports: [OwnersService],
   imports: [TypeOrmModule.forFeature([Owner])],
   providers: [OwnersResolver, OwnersService],
})
export class OwnersModule {}
