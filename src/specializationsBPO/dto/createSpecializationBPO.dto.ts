import { IsString, IsNotEmpty } from 'class-validator';
import { Trim } from 'class-sanitizer';
import { IsUniqueName } from '../../utils/validators/IsUniqueNameSpecializationBPO.validate';

export class CreateSpecializationBPODto {
    @IsString()
    @Trim()
    @IsNotEmpty()
    @IsUniqueName()
    name: string;
}