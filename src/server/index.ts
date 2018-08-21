import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import favicon from "serve-favicon";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import loadEnvVars from "__FUNCTIONS/loadEnvVars";

//////////////////////////////////////
// SET UP
//////////////////////////////////////

loadEnvVars();
const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

//////////////////////////////////////
// Routes
//////////////////////////////////////

//Print/debug all incoming requests
if (!true && process.env.NODE_ENV !== "production") {
    app.use("/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log("^".repeat(20) + "\n", req.originalUrl, "\n" + "^".repeat(20));
        next();
    });
}

//Static routes
app.use(favicon(path.resolve("resources", "images", "contact-icon.png")));
app.use(express.static(path.resolve("dist")));
app.use("/images", express.static(path.resolve("resources", "images")));
app.use("/scripts", express.static(path.resolve("resources", "scripts")));
app.use("/data", express.static(path.resolve("resources", "data")));
app.use("/styles", express.static(path.resolve("resources", "styles")));

// Non-Static Routes
import adminRoutes from "__SERVER/routes/admin-routes";
import apiRoutes from "__SERVER/routes/api-routes";
app.use(adminRoutes);
app.use(apiRoutes);

// Default Route serves React SPA whose Router handles any specific route extension
app.use("/*", (req: express.Request, res: express.Response) => {
    res.setHeader("Cache-Control", "public, max-age=1000"); //Cache page for `max-age` ms
    res.sendFile(path.resolve("dist", "index.html")); //index.html copied over to `dist` by webpack
});

// Error handling
app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err) {
        console.log("~".repeat(20) + "\n", err.message, "\n" + "~".repeat(20));
        res.status(400).send({ customMessage: err.message });
    } else {
        if (process.env.NODE_ENV === "production") {
            res.status(500).send();
        } else {
            res.status(500).send(`
                <strong>Error!!!</strong>
                <pre>
                ${err}
                </pre>
          `);
        }
    }
});

//N.b. Web services like Heroku will provide port via process.env.PORT
app.listen(process.env.PORT || 5000);
console.log("----------------------------------------------------");
console.log("Server started at port " + (process.env.PORT || 5000));
console.log("----------------------------------------------------");

// TODO:
//
// 1. Add rate-limiting middleware; e.g.
// https://www.npmjs.com/package/express-brute
// https://github.com/auth0/express-brute-mongo
//
// 2. Better authentication middleware; e.g.
// https://www.npmjs.com/package/passport
