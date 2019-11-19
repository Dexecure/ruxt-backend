import { BigQuery } from "@google-cloud/bigquery";
import { inject, injectable } from "inversify";
import { IEnviroment } from "../env";
import { TYPES } from "../types";

@injectable()
export class BigQueryConnection {
  public bgClient;

  constructor(@inject(TYPES.Environment) env: IEnviroment) {
    const { BigQueryProjectId } = env;
    this.bgClient = new BigQuery();
  }
}
