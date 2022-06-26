import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import googleRouter from "./routes/auth.js";
import storiesRouter from "./routes/stories.js";
import passport from "passport";
import session from "express-session";
import { engine } from "express-handlebars";
import { config } from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { configPassport } from "./config/passport.js";
import MongoStore from "connect-mongo";

// config env
config({path: "./config/config.env"});

// passport config
configPassport(passport);

// connect to database
connectDB();

const app = express();
const port = 5000 || process.env.PORT;

// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Logging
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
};

// helpers handleBars
import { formatDate, stripTags, truncate } from "./helpers/hbs.js";

// handleBars
app.engine(".hbs", engine({helpers: {formatDate, stripTags, truncate}, defaultLayout:"main", extname: ".hbs"}));
app.set("view engine", ".hbs");

// Sessions
app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24, //1 Day
        secure:  process.env.NODE_ENV !== "production"? false : true,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL}),
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static
app.use(express.static("public"));

// Routes
app.use("/", router);
app.use("/auth", googleRouter);
app.use("/stories", storiesRouter);
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
