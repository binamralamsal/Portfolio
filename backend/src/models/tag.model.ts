import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";

@modelOptions({
  options: {
    customName: "Tag",
  },
})
export class TagSchema {
  @prop({ required: true, maxlength: 255, minlength: 3 })
  public name!: string;

  @prop({ required: true, maxlength: 1024, minlength: 3 })
  public url!: string;
}

export default getModelForClass(TagSchema);
