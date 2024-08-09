"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const pokemon_entity_1 = require("./entities/pokemon.entity");
const mongoose_2 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let PokemonService = class PokemonService {
    constructor(pokemonModel, configService) {
        this.pokemonModel = pokemonModel;
        this.configService = configService;
        this.defaultLimit = configService.get('defaultLimit');
    }
    async create(createPokemonDto) {
        createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
        try {
            const pokemon = await this.pokemonModel.create(createPokemonDto);
            return pokemon;
        }
        catch (error) {
            this.handleException(error);
        }
    }
    findAll(paginationDto) {
        const { limit = this.defaultLimit, offset = 0 } = paginationDto;
        return this.pokemonModel.find()
            .limit(limit)
            .skip(offset)
            .sort({
            no: 1
        })
            .select('-__v');
    }
    async findOne(term) {
        let pokemon;
        if (!isNaN(+term)) {
            pokemon = await this.pokemonModel.findOne({ no: term });
        }
        if (!pokemon && (0, mongoose_1.isValidObjectId)(term)) {
            pokemon = await this.pokemonModel.findById(term);
        }
        if (!pokemon) {
            pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
        }
        if (!pokemon)
            throw new common_1.NotFoundException(`Pokemon with id, name o no "${term}" not found`);
        return pokemon;
    }
    async update(term, updatePokemonDto) {
        try {
            const pokemon = await this.findOne(term);
            if (updatePokemonDto.name)
                updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
            await pokemon.updateOne(updatePokemonDto, { new: true });
            return { ...pokemon.toJSON(), ...updatePokemonDto };
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async remove(term) {
        const { deletedCount } = await this.pokemonModel.deleteOne({ _id: term });
        if (deletedCount === 0)
            throw new common_1.BadRequestException(`Pokemon with id "${term}" not found`);
        return;
    }
    handleException(error) {
        if (error.code === 11000) {
            throw new common_1.BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
        }
        else {
            console.log(error);
            throw new common_1.InternalServerErrorException(`Can't create Pokemon - Check server logs`);
        }
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(pokemon_entity_1.Pokemon.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        config_1.ConfigService])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map