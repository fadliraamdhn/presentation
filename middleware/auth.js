export function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.flash('error', 'Silakan login terlebih dahulu');
  res.redirect('/login');
}

export function logout (req, res) {
    req.session.destroy()
    res.redirect('/login');
}