import typegoose, { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'


@modelOptions({
    schemaOptions: {
      timestamps: true
    }
  })
export class User {

    @prop({required: true})
    public telegramId: String;

    @prop({required: true})
    public fullname: String;

    @prop({required: true})
    public number: String;

    @prop({required: true})
    public course: String;

    @prop({required: true})
    public days: String;

    @prop({required: true})
    public times: String
}

export const UserModel = getModelForClass(User);
