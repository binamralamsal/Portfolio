import {
  modelOptions,
  prop,
  Ref,
  getModelForClass,
} from "@typegoose/typegoose";
import { TagSchema } from "./tag.model";

@modelOptions({
  options: {
    customName: "Project",
  },
  schemaOptions: {
    timestamps: true,
  },
})
export class ProjectSchema {
  @prop({ required: true, maxlength: 255, minlength: 5 })
  public name!: string;

  @prop({ required: true, maxlength: 1024, minlength: 5 })
  public description!: string;

  @prop({ required: true, maxlength: 1024, minlength: 5 })
  public thumbnail!: string;

  @prop({ maxlength: 1024, minlength: 5 })
  public videoUrl?: string;

  @prop({ required: true, maxlength: 1024, minlength: 5 })
  public githubUrl!: string;

  @prop({ required: true, maxlength: 1024, minlength: 5 })
  public liveUrl!: string;

  @prop({ ref: () => TagSchema, required: true })
  public tags!: Ref<TagSchema>[];

  @prop({ default: false })
  public featured!: boolean;
}

export default getModelForClass(ProjectSchema);
