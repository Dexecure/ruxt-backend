export const NodePort = process.env.PORT || 5000;
export const Auth = process.env.AUTH || 'no-auth';
export const EsHost = process.env.ESHOST || 'localhost:9200';
export const RedisHost = process.env.RedisHost || 'localhost';
export const BigQueryProjectId = process.env.PROJECT_ID || 'chrome-ux-report-185710';
export const BaseUri = process.env.BASE_URI || null; // Something like `/backend` or `/api` that will be used as a base path for the backend app
export const OriginCount = process.env.ORIGIN_COUNT || 10000;
export const environment = process.env.NODE_ENV || 'development';
export const frontendDomain = process.env.FRONTEND_DOMAIN || 'ruxt.dexecure.com';