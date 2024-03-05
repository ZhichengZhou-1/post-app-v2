import { asRouter, ExpressRouter, Get } from "../utils/routes.util";
import { Request, Response } from "express";
import * as Log from "../utils/log.util";
import { google } from "googleapis";
import { CookieNames } from "../interface/consts.interface";
import { generateSession, verifySession } from "../utils/session.util";
import { SECRETS } from "../conf/config";
import { GetUserProfileResponse } from "../interface/user.interface";
import { ResponseData, SuccessResponse } from "../utils/response.util";

const TAG = "LOG_IN";

const oauth2Client = new google.auth.OAuth2(
    SECRETS.CLIENT_ID,
    SECRETS.CLIENT_SECRET,
    SECRETS.REDIRECT_URI
);

@ExpressRouter()
class Login {
    @Get("/login")
    async login(req: Request, res: Response): Promise<void> {
        Log.info(TAG, "-- Login endpoint");
        // Redirect to Google login URL
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        });
        console.log("authurl: ", authUrl);
        try {
            res.redirect(authUrl);
        } catch (err) {
            console.log("err");
        }
    }

    @Get("/google/signin/callback")
    async onSignin(
        req: Request<{}, {}, {}, any>,
        res: Response
    ): Promise<void> {
        try {
            console.log("here");
            const { code } = req.query;

            const { tokens } = await oauth2Client.getToken(code as string);
            oauth2Client.setCredentials(tokens);

            const peopleApi = google.people({
                version: "v1",
                auth: oauth2Client
            });
            const peopleApiResponse = await peopleApi.people.get({
                resourceName: "people/me",
                personFields: "names,emailAddresses,photos"
            });

            const profile: any = peopleApiResponse.data as any;
            Log.info("profile: ", profile);
            const sessionCookie = await generateSession(
                {
                    userId: profile.resourceName,
                    name: profile.names[0].displayName,
                    email: profile.emailAddresses[0].value,
                    photoUrl: profile.photos[0].url
                },
                SECRETS.LOGIN_ENC_KEY
            );

            res.cookie(CookieNames.SSO_COOKIE, sessionCookie);

            res.setHeader("content-type", "text/html");
            res.send("<script>window.close();</script>");
        } catch (error) {
            console.error("Error during Google authentication:", error);
            res.status(500).send("Authentication failed");
        }
    }
}

export default asRouter(Login);
