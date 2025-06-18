interface Config {
  api_host_dev?: string;
  jwtAccessTokenSecret?: string;
  jwtRefreshAccessTokenSecret?: string;
  nodeEnv?: string;
}

const config: Config = {
  api_host_dev: process.env.NEXT_PUBLIC_API_URL || '',
  jwtAccessTokenSecret: process.env.NEXT_JWT_ACCESS_TOKEN_SECRET || '',
  jwtRefreshAccessTokenSecret: process.env.NEXT_JWT_REFRESH_TOKEN_SECRET || '',
  nodeEnv: process.env.NODE_ENV,
};

export { config };
