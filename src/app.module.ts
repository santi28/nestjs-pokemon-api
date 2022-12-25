import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

const MONGO_URI = 'mongodb://127.0.0.1:27017/';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot(MONGO_URI, { dbName: 'pokemon' }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
