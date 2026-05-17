// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — ACCESS GATEKEEPER MIDDLEWARE
// CODESPACE PATH: backend/src/middleware/auth.js
// ============================================================================

const jwt = require('jsonwebtoken');

/**
 * Validates the core identity token on incoming requests.
 */
exports.authenticateAccess = (req, res, next) => {
  const securityHeader = req.headers['authorization'];
  const secureToken = securityHeader && securityHeader.split(' ')[1];

  if (!secureToken) {
    return res.status(401).json({ success: false, error: '[ACCESS INTERCEPT] Authorization credentials missing.' });
  }

  jwt.verify(secureToken, process.env.JWT_SECRET_CORE, (err, decodedSession) => {
    if (err) {
      return res.status(403).json({ success: false, error: '[SECURITY INTERCEPT] Invalid token configuration signature.' });
    }
    req.sessionContext = decodedSession;
    next();
  });
};

/**
 * Verifies if the authenticated session has Admin role privileges.
 */
exports.verifyAdminPrivilege = (req, res, next) => {
  if (!req.sessionContext || req.sessionContext.role !== 'Admin') {
    return res.status(403).json({ 
      success: false, 
      error: '[SECURITY INTERCEPT] Action denied. SCADA Diagnostic consoles are restricted to Admin role credentials only.' 
    });
  }
  next();
};