const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

// Validates any standard email address
export function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

// Kept for backwards compat — now accepts any valid email
export function validateUnmEmail(email) {
  return validateEmail(email);
}

// Express middleware for signup email validation
export function requireValidEmail(req, res, next) {
  const { email } = req.body;
  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      error: 'A valid email address is required.',
    });
  }
  next();
}

// Kept for backwards compat
export function requireUnmEmail(req, res, next) {
  return requireValidEmail(req, res, next);
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
