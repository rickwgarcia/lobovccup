// Requires requireAuth to run first (req.userProfile must be set)
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.userProfile) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.userProfile.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
