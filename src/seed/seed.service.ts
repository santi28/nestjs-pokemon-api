import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon.response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
      {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      },
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
