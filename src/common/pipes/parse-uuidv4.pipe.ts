import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

@Injectable()
export class ParseUuidV4Pipe implements PipeTransform {
  transform(value: string) {
    if (!uuidValidate(value) || uuidVersion(value) !== 4) {
      throw new BadRequestException('Invalid UUID V4');
    }
    return value;
  }
}
