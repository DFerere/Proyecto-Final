const adminpermissionsRoutes = (req, res, next) => {
 
    if (req.user.rol == undefined || req.user.rol === "admin") {
        return res.render('home_admin');

    };
    
    if (req.user.rol == "premium") {

        return res.render('home_premium');

    } else {

        console.log("Entro un usuario"); 

        //return res.render('home_user');

    };

    next()
}

export default adminpermissionsRoutes; 