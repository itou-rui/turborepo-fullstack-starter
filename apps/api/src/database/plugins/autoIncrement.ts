import { Model, Schema } from 'mongoose';

interface AutoIncrementOptions {
  field: string;
  startAt?: number;
}

export function autoIncrementPlugin(schema: Schema, options: AutoIncrementOptions) {
  const { field, startAt = 1 } = options;

  if (!schema.path(field)) {
    schema.add({
      [field]: { type: Number, default: startAt },
    });
  }

  schema.pre('save', async function (next) {
    const doc = this;

    if (doc.isNew) {
      const Model = this.constructor as Model<any>;
      const lastDoc = await Model.findOne(
        {},
        {},
        {
          sort: { [field]: -1 },
          [field]: 1,
        },
      );

      doc[field] = lastDoc ? lastDoc[field] + 1 : startAt;
    }
    next();
  });

  schema.pre('insertMany', async function (next, docs: any) {
    const Model = this as Model<any>;
    const lastDoc = await Model.findOne(
      {},
      {},
      {
        sort: { [field]: -1 },
        [field]: 1,
      },
    );

    let nextIndex = lastDoc ? lastDoc[field] + 1 : startAt;

    docs.forEach((doc: any) => {
      doc[field] = nextIndex++;
    });

    next();
  });
}
