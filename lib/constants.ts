export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const ENV_TARGET = process.env.ENV_TARGET! as
  | "development"
  | "staging"
  | "production";

const NEXT_PUBLIC_PATHS = {
  development: process.env.PUBLIC_PATH_DEVELOPMENT!,
  staging: process.env.PUBLIC_PATH_STAGING!,
  production: process.env.PUBLIC_PATH_PRODUCTION!,
};

export const NEXT_PUBLIC_PATH = NEXT_PUBLIC_PATHS[ENV_TARGET];
