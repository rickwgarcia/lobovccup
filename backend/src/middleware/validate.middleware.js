const UNM_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@unm\.edu$/i;

// Validates email is a @unm.edu address
export function validateUnmEmail(email) {
  return UNM_EMAIL_REGEX.test(email);
}

// Express middleware for signup email validation
export function requireUnmEmail(req, res, next) {
  const { email } = req.body;
  if (!email || !validateUnmEmail(email)) {
    return res.status(400).json({
      error: 'Only @unm.edu email addresses are allowed to register.',
    });
  }
  next();
}

// Generic field presence check
export function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter(
      (f) => req.body[f] === undefined || req.body[f] === null || req.body[f] === ''
    );
    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(', ')}`,
      });
    }
    next();
  };
}
