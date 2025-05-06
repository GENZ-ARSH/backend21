const protectHomePage = (req, res, next) => {
    console.log('req.query:', req.query);
    const accessKey = req.query && req.query.access_key;
    if (accessKey === 'genzz_access_key') {
        req.session.authorized = true;
        return next();
    }
    if (req.session.authorized) {
        return next();
    }
    res.redirect('/index.html');
};

module.exports = { protectHomePage };
