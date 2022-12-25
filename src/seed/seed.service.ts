import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon.response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonsToInsert = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const id = +segments[segments.length - 2];

      return { number: id, name };
    });

    this.pokemonModel.insertMany(pokemonsToInsert);
    Logger.verbose(
      `[SEEDING] Seed executed successfully and has been inserted ${pokemonsToInsert.length} pokemons`,
    );

    return 'Seed executed successfully';
  }
}
