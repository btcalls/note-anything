# Note Anything 📝
**Who, what, where?** Regardless of which, note it down!

## Inspiration
This project was inspired by my recently picked up habit wherein I would record in a default Notes app any person my partner would have an interaction with. 

It is a somewhat of an inside joke between us. But then I thought, maybe noting these down may serve a purpose after all - to remind us of these seemingly ordinary moments and appreciate it for what it is. Thus, `Note Anything` was born.

## Get started
This is created using the [RN Project Template](https://github.com/btcalls/rn-expo-template), which is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). To start:

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

### Setup
#### Environment Variables
`env.template` is provided as a template for your `.env` files. This is where you'll supply the necessary keys and tokens, in this case, our Supabase configuration.

#### Supabase
Following mostly for this [documentation](https://supabase.com/docs/guides/api/rest/generating-types), first, we would need to login to get our Personal Access Token:

```bash
npx supabase login
```

Once successfully logged in, copy the token created in the CLI and add it to your `.env.local` file as your `SUPABASE_ACCESS_TOKEN` variable.

Once all needed variables for your Supabase configuration are already added to your env file, run the following command to generate and update your database types: 

```bash
npx supabase gen types typescript --project-id <your_actual_project_id> > ./lib/database.types.ts
```
