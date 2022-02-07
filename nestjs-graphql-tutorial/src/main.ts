// Packages
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Context / Store / Router
// Components / Classes / Controllers / Services
import { AppModule } from './app.module';
// Assets
// Constants / Models / Interfaces / Types
// Utils / Methods / Mocks
// Styles

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe()); // this is added so you can use NPM packages like `class-validator` to be able to have more checks & balances on things like your GQL input types
   await app.listen(3000);
}

bootstrap();
