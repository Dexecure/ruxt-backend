import { inject, injectable } from "inversify";
import { BigQueryConnection } from "../connections/BigQueryConnection";
import { TYPES } from "../types";

@injectable()
export class BigQueryClient {
  public bigQueryConnection: BigQueryConnection;

  constructor(
    @inject(TYPES.BigQueryConnection) bigQueryConnection: BigQueryConnection
  ) {
    this.bigQueryConnection = bigQueryConnection;
  }

  doQuery(query: string): Promise<any> {
    return this.bigQueryConnection.bgClient.query(query);
  }
}
