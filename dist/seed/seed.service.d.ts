import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';
export declare class SeedService {
    private readonly pokemonModel;
    private readonly http;
    private readonly axios;
    constructor(pokemonModel: Model<Pokemon>, http: AxiosAdapter);
    executeSeed(): Promise<string>;
}
