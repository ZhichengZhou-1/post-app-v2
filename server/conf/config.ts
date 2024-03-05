import * as Log from "../utils/log.util";

// class SecretsData {}

class Config {
    PORT = "9098";
    HOST = "http://localhost:9098";
    DYNAMODB_REGION = "us-west-2";
    DYNAMODB_TABLE_NAME = "PostTable";
}

class SecretsData {
    SCOPES = "";
    CLIENT_ID = "";
    CLIENT_SECRET = "";
    REDIRECT_URI = "";
    LOGIN_ENC_KEY = "";
}

// ============================= //
// Config Loader
// ============================= //

export const CONFIG_ENVS = {
    // lower case to match what Jest sets NODE_ENV to when running tests
    LOCAL: "local",
    TEST: "test",
    DEV: "dev",
    STG: "stg",
    PROD: "prod"
};

const CONFIG_ENV =
    process.env.NODE_ENV === CONFIG_ENVS.TEST
        ? CONFIG_ENVS.TEST
        : process.env.CONFIG_ENV ?? CONFIG_ENVS.LOCAL;

Log.info("CONFIG_ENV: ", CONFIG_ENV);

const Configurations: { [key: string]: () => Config } = {
    [CONFIG_ENVS.LOCAL]: () => ({
        ...new Config()
    }),
    [CONFIG_ENVS.TEST]: () => ({
        ...new Config(),
        ENV: CONFIG_ENVS.TEST
    }),
    [CONFIG_ENVS.DEV]: () => ({
        ...new Config(),
        ENV: CONFIG_ENVS.DEV,
        PORT: "3000"
    }),
    [CONFIG_ENVS.STG]: () => ({
        ...new Config(),
        MEDIA_BASE_URL: "",
        ENV: CONFIG_ENVS.STG
    }),
    [CONFIG_ENVS.PROD]: () => ({
        ...new Config(),
        MEDIA_BASE_URL: "https://d3unf4s5rp9dfh.cloudfront.net",
        ENV: CONFIG_ENVS.PROD
    })
};

function LoadConfig(): Config {
    if (!Object.values(CONFIG_ENVS).includes(CONFIG_ENV)) {
        throw Error("Failed to load configuration for: " + CONFIG_ENV);
    }

    const config = Configurations[CONFIG_ENV]();

    // Override values with process.env
    for (const key in config) {
        const k = key as keyof Config;
        config[k] = process.env[k] ?? config[k];
    }

    return config;
}

function LoadSecrets(): SecretsData {
    LoadEnvForSecrets();

    const secretsJson = new SecretsData();

    // Override values with process.env
    for (const key in secretsJson) {
        const k = key as keyof SecretsData;
        secretsJson[k] = process.env[k] ?? secretsJson[k];

        if (CONFIG_ENV === CONFIG_ENVS.TEST && !secretsJson[k]) {
            Log.warn("The secret ", k, " is not set.");
        }
    }

    return secretsJson;
}

// Parse AWS Secrets data and map them into environment vars
function LoadEnvForSecrets(): void {
    const unparsedSecretsData = process.env["config.secrets"];

    if (unparsedSecretsData != null) {
        const secretsJson = JSON.parse(unparsedSecretsData);

        for (const key in secretsJson) {
            const val = secretsJson[key];
            if (typeof val === "string") {
                if (process.env[key] != null) {
                    Log.warn(
                        "Secrets data is overriding an environment variable that is already set: ",
                        key
                    );
                }

                process.env[key] = val;
            }
        }
    } else {
        Log.warn("Did not detect config.secrets environment variable.");
    }
}

// ========================== //
// Export
// ========================== //
const SECRETS = LoadSecrets();
const CONFIG = LoadConfig();

export { CONFIG, SECRETS };
