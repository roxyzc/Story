export const ensureAuth = (req, res, next) => {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/");
    };
}

export const ensureGuest = (req, res, next) =>{
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        res.redirect("/");
    }else{
        return next();
    };
}