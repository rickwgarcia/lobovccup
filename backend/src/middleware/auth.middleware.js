// Auth disabled — passthrough middleware. Re-enable when login is rebuilt.
export async function requireAuth(req, res, next) {
  next();
}
