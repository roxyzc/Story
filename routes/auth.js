import { Router } from "express";
import passport from "passport";
const googleRouter = Router();

// @desc    Auth with google
// @route   Get/auth/google
googleRouter.get("/google", passport.authenticate("google", { scope:["profile"]}));

// @desc    Google auth callback
// @route   Get/auth/google/callback
googleRouter.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}), (req,res) =>{
    res.redirect("/dashboard");
});

// @desc    Logout user
// @route   Get/auth/logout
googleRouter.get("/logout", (req, res) =>{
    req.logout((err) => {
        if(err){
            console.log(err);
            res.redirect("/");
        };
        res.redirect("/");
    });
});

export default googleRouter;