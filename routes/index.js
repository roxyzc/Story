import { Router } from "express";
import { ensureAuth, ensureGuest } from "../middleware/auth.js";
import Story from "../models/Story.js";
const router = Router();

// @desc    Login/Landing Page
// @route   Get/
router.get("/", ensureGuest, (req, res) => {
    res.render("login", {
        layout: "login"
    });
});

// @desc    Dashboard
// @route   Get/dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean();
        res.render("dashboard", {
            name: req.user.firstName,
            stories
        });
    } catch (error) {
        console.log(error);
        res.render("error/500");
    }
    
});

export default router;