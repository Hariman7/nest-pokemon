import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";


export class CreatePokemonDto {

    // IsInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isString, Minlength 1
    @IsString()
    @MinLength(1)
    name: string;
}
