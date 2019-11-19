import { Container } from "inversify";
import "reflect-metadata";
import { BigQueryClient } from "./clients/BigQueryClient";
import { ElasticSearchClient } from "./clients/ElasticSearchClient";
import { RedisClient } from "./clients/RedisClient";
import { BigQueryConnection } from "./connections/BigQueryConnection";
import { ElasticSearchConnection } from "./connections/ElasticSearchConnection";
import { RedisConnection } from "./connections/RedisConnection";
import { ContentController } from "./controllers/ContentController";
import { UpdateController } from "./controllers/UpdateController";
import { env, IEnviroment } from "./env";
import * as appInterfaces from "./interfaces";
import { BigQueryCalculatorService } from "./services/BigQueryCalculatorService";
import { BigQueryTransformerService } from "./services/BigQueryTransformerService";
import { TYPES } from "./types";
import { IOHalter } from "./utils/IOHalter";
import { Utils } from "./utils/Utils";

const container = new Container();

// Used to stop all HTTP I/O till all I/O blocking promises are resolved...
container
  .bind<IOHalter>(TYPES.IOHalter)
  .to(IOHalter)
  .inSingletonScope();

container.bind<IEnviroment>(TYPES.Environment).toConstantValue(env);
container
  .bind<ElasticSearchConnection>(TYPES.ElasticSearchConnection)
  .to(ElasticSearchConnection)
  .inSingletonScope();
container
  .bind<RedisConnection>(TYPES.RedisConnection)
  .to(RedisConnection)
  .inSingletonScope();
container
  .bind<BigQueryConnection>(TYPES.BigQueryConnection)
  .to(BigQueryConnection)
  .inSingletonScope();
container
  .bind<ElasticSearchClient>(TYPES.ElasticSearchClient)
  .to(ElasticSearchClient)
  .inSingletonScope();
container
  .bind<RedisClient>(TYPES.RedisClient)
  .to(RedisClient)
  .inSingletonScope();
container
  .bind<BigQueryClient>(TYPES.BigQueryClient)
  .to(BigQueryClient)
  .inSingletonScope();
container
  .bind<BigQueryTransformerService>(TYPES.BigQueryTransformerService)
  .to(BigQueryTransformerService)
  .inSingletonScope();
container
  .bind<BigQueryCalculatorService>(TYPES.BigQueryCalculatorService)
  .to(BigQueryCalculatorService)
  .inSingletonScope();
container
  .bind<appInterfaces.IController>(TYPES.ContentController)
  .to(ContentController)
  .inSingletonScope();
container
  .bind<appInterfaces.IController>(TYPES.UpdateController)
  .to(UpdateController)
  .inSingletonScope();
container.bind<Utils>(TYPES.Utils).to(Utils);

export { container };
