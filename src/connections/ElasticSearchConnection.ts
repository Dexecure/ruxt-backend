import * as AWS from "aws-sdk";
import * as elasticsearch from "elasticsearch";
import { inject, injectable } from "inversify";
import { IEnviroment } from "../env";
import { TYPES } from "../types";

@injectable()
export class ElasticSearchConnection {
  esClient: elasticsearch.Client;

  constructor(@inject(TYPES.Environment) env: IEnviroment) {
    const { environment, EsHost } = env;

    if (environment == "production") {
      const options = {
        hosts: [EsHost],
        connectionClass: require("http-aws-es"),
        awsConfig: new AWS.Config({ region: "us-east-1" }), // set an aws config e.g. for multiple clients to different regions
        httpOptions: {}, // set httpOptions on aws-sdk's request. default to aws-sdk's config.httpOptions
        log: "error",
        apiVersion: "6.8"
      };
      this.esClient = require("elasticsearch").Client(options);
    } else {
      this.esClient = new elasticsearch.Client({
        host: EsHost,
        log: "error"
      });
    }
  }
}
