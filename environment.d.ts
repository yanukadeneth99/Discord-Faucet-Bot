// Adding the environmental variables so that they will be accessible easily by code

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			WALLET_PRIVATE_KEY: string;
			BOT_TOKEN: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
		}
	}
}

export {};
