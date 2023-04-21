import { PartialType } from '@nestjs/swagger';
import { CreateProfilesDto } from './create-profiles.dto';

export class UpdateProfilesDto extends PartialType(CreateProfilesDto) {}
