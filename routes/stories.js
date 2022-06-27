import { Router } from "express";
import { ensureAuth } from "../middleware/auth.js";
import Story from "../models/Story.js";
import User from "../models/User.js";
const storiesRouter = Router();

// @desc    Show add page
// @route   Get/stories/add
storiesRouter.get("/add", ensureAuth, (req, res) =>{
    res.render("stories/add");
});

// @desc    Process add form
// @route   Post/stories
storiesRouter.post("/", ensureAuth, async(req, res) =>{
    try {
        console.log(req.user.id);
        req.body.user = req.user.id
        await Story.create(req.body);
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        res.render("error/500");
    }
});

// @desc    Show all stories
// @route   get/stories
storiesRouter.get("/", ensureAuth, async(req, res) =>{
    try {
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: "desc"})
            .lean();

        res.render("stories/index", {
            stories,
        });
    } catch (error) {
        console.log(error);
        res.render("error/500");
    }
});

// @desc    Show edit page
// @route   get/stories/edit/:id
storiesRouter.get("/edit/:id", ensureAuth, async(req, res) =>{
    try {
        const story = await Story.findById(req.params.id).lean();
        if(!story){
            return res.render("error/404");
        }
        if(story.user != req.user.id){
            res.redirect("/stories")
        }else{
            res.render("stories/edit", {
                story,
            });
        };
    } catch (error) {
        console.log(error);
        res.render("error/500");
    }
});

export default storiesRouter;