// Packages
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnersModule } from './owners/owners.module';
import { PetsModule } from './pets/pets.module';
// Assets
// Constants / Models / Interfaces / Types
// Utils / Methods / Mocks
// Styles

@Module({
   imports: [
      GraphQLModule.forRoot({
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      TypeOrmModule.forRoot({
         type: 'sqlite',
         database: ':memory:',
         entities: ['dist/**/*.entity{.ts,.js}'],
         synchronize: true, // this option is best used for POC's and in development; DO NOT USE THIS IN PRODUCTION; use `migrations` instead
      }),
      PetsModule,
      OwnersModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
