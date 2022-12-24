import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('Pokemon already exists');

      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');

    const pokemon: Pokemon = await this.pokemonModel.findById(id);

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');

    const pokemon: Pokemon = await this.pokemonModel.findById(id);

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('Pokemon already exists');

      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
