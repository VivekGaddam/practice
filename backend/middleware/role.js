module.exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports.isOrganization = (req, res, next) => {
  if (!req.user || req.user.role !== 'Organization') {
    return res.status(403).json({ message: 'Access denied: Organization users only' });
  }
  next();
};

module.exports.isFoodBankStaff = (req, res, next) => {
  if (!req.user || req.user.role !== 'Food Bank Staff') {
    return res.status(403).json({ message: 'Access denied: Food Bank Staff only' });
  }
  next();
};

module.exports.hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: Must be one of [${roles.join(', ')}]`
      });
    }
    next();
  };
};
