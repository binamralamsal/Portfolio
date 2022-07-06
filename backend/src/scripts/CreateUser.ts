import { argv } from "process";
import { User } from "../models";
import promptSync from "prompt-sync";
import App from "../app";

const prompt = promptSync();

class CreateUser {
  public arguments: string[];
  public isAdmin: boolean;
  public email: string;
  public name: string;
  private readonly password: string;

  constructor() {
    this.arguments = argv.slice(2);
    this.isAdmin = argv.includes("--admin");
    this.name = prompt("Enter your name: ");
    this.email = prompt("Enter your email: ");
    this.password = prompt.hide("Enter your password: ");
  }

  public async save() {
    await new App().connectToMongodb();

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      isAdmin: false,
    };

    if (this.isAdmin) payload.isAdmin = true;

    return User.create(payload);
  }
}

const user = new CreateUser();
user
  .save()
  .then(() => {
    console.log("User created successfully");
    process.exit();
  })
  .catch(console.log);
