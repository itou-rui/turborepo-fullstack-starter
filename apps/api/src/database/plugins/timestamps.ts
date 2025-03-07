import { Schema, Document, CallbackWithoutResultAndOptionalError, Query } from 'mongoose';

interface TimestampedDocument {
  createdAt: Date;
  updatedAt: Date;
}

export function timestampsPlugin<T extends Document & TimestampedDocument>(schema: Schema<T>) {
  schema.pre('save', function (this: T, next: CallbackWithoutResultAndOptionalError) {
    const now = new Date();

    if (this.isNew) {
      this.createdAt = now;
    }
    this.updatedAt = now;

    next();
  });

  schema.pre(
    'insertMany',
    function (this: Schema<T>, next: CallbackWithoutResultAndOptionalError, docs: Partial<TimestampedDocument>[]) {
      const now = new Date();

      docs.forEach((doc) => {
        if (doc) {
          doc.createdAt = now;
          doc.updatedAt = now;
        }
      });

      next();
    },
  );

  type UpdateHookType = 'updateOne' | 'updateMany' | 'findOneAndUpdate';
  const updateHooks: UpdateHookType[] = ['updateOne', 'updateMany', 'findOneAndUpdate'];

  updateHooks.forEach((hook) => {
    schema.pre(hook, function (this: Query<any, T>, next: CallbackWithoutResultAndOptionalError) {
      this.set({ updatedAt: new Date() });
      next();
    });
  });
}
