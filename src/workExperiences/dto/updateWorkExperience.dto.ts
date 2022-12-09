import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class UpdateWorkExperienceDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsOptional()
    @IsString()
    @Trim()
    @IsNotEmpty()
    name: string;
}