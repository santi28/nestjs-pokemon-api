import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

const MONGO_URI = 'mongodb://root:toor@179.43.127.117:27017/';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot(MONGO_URI, { dbName: 'pokemon' }),
    PokemonModule,
    CommonModule,
  ],
})
export class AppModule {}
