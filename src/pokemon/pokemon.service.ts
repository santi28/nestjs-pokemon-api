import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
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
      this.handleExeptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletedCount) throw new NotFoundException('Pokemon not found');
  }

  private handleExeptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException('Pokemon already exists');

    console.error(error);
    throw new InternalServerErrorException();
  }
}
