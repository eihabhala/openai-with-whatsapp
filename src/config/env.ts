import { IsIn, IsInt, IsNotEmpty, IsOptional, IsUrl, Max, Min } from "class-validator";
import * as dotenv from "dotenv";
import { Constants } from "./constant";
dotenv.config();

export class Env {
    @IsInt()
    @Min(2000)
    @Max(9999)
    public port: number;

    @IsNotEmpty()
    public dbName: string;

    @IsNotEmpty()
    public dbHost: string;

    @IsNotEmpty()
    public dbUser: string;

    @IsInt()
    @Min(2000)
    @Max(9999)
    public dbPort: number;

    @IsNotEmpty()
    public dbPassword: string;

    @IsNotEmpty()
    public jwtSecret: string;

    @IsNotEmpty()
    public myToken: string;

    @IsNotEmpty()
    public Token: string;

    @IsNotEmpty()
    public openAiKey: string;

    // @IsNotEmpty()
    // public corsDomain: string;

    @IsNotEmpty()
    @IsIn(Constants.ENVIRONMENTS)
    public nodeEnv: string;

    @IsOptional()
    @IsIn(["true", "false"])
    public dropAndCreate: string;

    @IsUrl({
        require_tld: false,
    })
    public webAppUrl;
}

const env = new Env();

env.dbName = process.env.DB_NAME;
env.dbHost = process.env.DB_HOST;
env.dbUser = process.env.DB_USER;
env.dbPort = +(process.env.DB_PORT || 3306);
env.dbPassword = process.env.DB_PASSWORD;
env.jwtSecret = process.env.APP_JWT_SECRET;
env.port = +process.env.PORT;
env.nodeEnv = process.env.NODE_ENV;
env.dropAndCreate = process.env.DROP_AND_RECREATE_TABLE;
env.webAppUrl = process.env.WEB_APP_URL;
env.myToken = process.env.MYTOKEN
env.Token = process.env.TOKEN;
env.openAiKey = process.env.OPEN_AI_KEY;

export default env;
