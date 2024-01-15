const userpermissionsRoutes = (req, res, next) => {
 
    if (req.user.rol == undefined || req.user.rol === "admin") {
        return res.render('home_admin');

    } else {

        return "Entro usuario";

        //return res.render('home_user');

    }

    next()
}
export default userpermissionsRoutes; 