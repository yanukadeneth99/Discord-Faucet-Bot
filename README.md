# Discord Bot Faucet

This is a Discord Bot that dispenses Testnet ETH written in TypeScript.

## Setup

Change the `example.config.json` into `config.json`, and fill in the required fields.

Create a file called `.env` and paste in the following lines. Make sure to fill it out with your details

```
WALLET_PRIVATE_KEY="<wallet-private-key>"
BOT_TOKEN="<bot-token>"
DB_USERNAME="<username>"
DB_PASSWORD="<password>"
```

## Installation

1. If you do not have pnpm, run `npm i -g pnpm`, also install nodemon if you haven't `npm i -g nodemon`
2. Install Dependancies using `pnpm install`
3. Fill in the config and run the bot : `pnpm dev_local`

## Networks

### Network List

-   Goerli
-   Mumbai
-   Celo

### Token List

-   LINK

### Adding Networks or Tokens

Adding Networks or Tokens are fairly straighforward.

1. Open up the `config.json`.
2. Add a network Object in the `networks` field
   ex :
    ```json
    {
    	"name": "networkName",
    	"nativeCurrency": "kool",
    	"ALCHEMY_URL": "https://rpc-url/xxx",
    	"scan": "https://myscan.kool.io/tx/"
    }
    ```
3. That's literally it!
4. Make sure to do a PR into the Main Repo! (Edit the `example.config.json`)

## Adding Features

1. Fork the project
2. Create a new branch
3. Commit the changes
4. Yeet the changes

## TODO Features

-   [x] Get the Bot Working
-   [x] Convert to TypeScript
-   [ ] Migrate to Postgres DB

## Inspired by

-   [DJS - Reconlx](https://github.com/reconlx/djs-typescript-handler)
-   [Typescript Faucet Template - AlanRacciatti](https://github.com/AlanRacciatti/FaucetDiscordBot)
-   [Discord Bot Template - KevinNovak](https://github.com/KevinNovak/Discord-Bot-TypeScript-Template)
