import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({
  options: { customName: "Message" },
  schemaOptions: {
    timestamps: true,
  },
})
export class MessageSchema {
  @prop({ required: true, maxlength: 255, minlength: 3 })
  public name!: string;

  @prop({ required: true, maxlength: 255, minlength: 3 })
  public email!: string;

  @prop({ required: true, maxlength: 1024, minlength: 10 })
  public message!: string;
}

export default getModelForClass(MessageSchema);
