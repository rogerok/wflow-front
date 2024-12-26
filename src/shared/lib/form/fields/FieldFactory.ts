import { BaseField } from './BaseField';
import { BooleanField } from './BooleanField';
import { TextField } from './TextField';

// export class FieldFactory {
//   static create(data: string, name: string): TextField;
//   static create(data: boolean, name: string): BooleanField;
//
//   static create<T>(data: unknown, name: string): BaseField<T> {
//     switch (typeof data) {
//       case 'string':
//         return new TextField(data, name) as BaseField<T>;
//       case 'boolean':
//         return new BooleanField(data, name) as unknown as BaseField<T>;
//       default:
//         throw new Error(`Unknown field type: ${name}`);
//     }
//   }
// }
//

export class FieldFactory {
  static create<T>(name: string, data: T): BaseField<T> {
    if (typeof data === 'string') {
      return new TextField(data, name) as BaseField<T>;
    }
    if (typeof data === 'boolean') {
      return new BooleanField(data, name) as unknown as BaseField<T>;
    }
    throw new Error(`Unknown field type: ${name}`);
  }
}
