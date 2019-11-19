import { inject, injectable } from "inversify";
import { promisify } from "util";
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
    // Uncomment this line for actual querying
    return promisify(
      this.bigQueryConnection.bgClient.query.bind(
        this.bigQueryConnection.bgClient
      )
    )({ query });
  }
}
