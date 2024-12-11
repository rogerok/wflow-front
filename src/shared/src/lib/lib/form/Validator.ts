import { ZodSchema } from 'zod';

export class Validator<Data> {
  private _schema: ZodSchema;
  private _success = false;

  constructor(schema: ZodSchema) {
    this._schema = schema;
  }

  validate(data: Data) {
    const parseResult = this._schema.safeParse(data);

    if (parseResult.error) {
      const err = parseResult.error.errors;
      console.log(console.log(err));
    }
  }
}
