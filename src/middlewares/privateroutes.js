const privateRoutes = (req, res, next) => {
    console.log(req.session.isLogged)
        if (req.session.user == undefined ||  !req.session.isLogged) {
            return res.redirect('/ecommerce/home/login');
        }
        next()
    }

export default privateRoutes; 
