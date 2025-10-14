import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NormalizeQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      const normalizedQuery = Object.keys(value).reduce((acc, key) => {
        acc[key.toLowerCase()] = value[key].toLowerCase();
        return acc;
      }, {});

      return normalizedQuery;
    }
    return value;
  }
}
