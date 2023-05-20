import { Forbidden } from "@tsed/exceptions";

export class InvalidOrigin extends Forbidden {
  headers = {};
  errors = [];
  data = {};

  constructor(origin: string) {
    super("InvalidOrigin");
    this.setHeaders({ "Content-Type": "application/json" });

    this.data = {
      name: "InvalidOrigin",
      message: `Not allowed by CORS, ${origin} `,
    };
  }
}
