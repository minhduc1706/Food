import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
    audience: process.env.auth0_AUDIENCE,
    issuerBaseURL: process.env.auth0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });