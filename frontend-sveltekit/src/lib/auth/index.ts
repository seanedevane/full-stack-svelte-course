import { createAuth0Client } from "@auth0/auth0-spa-js";
import { 
    PUBLIC_AUTH0_AUDIENCE,
    PUBLIC_AUTH0_DOMAIN,
    PUBLIC_AUTH0_CLIENT_ID
} from "$env/static/public";

async function getAuthClient() {
    const authClient = await createAuth0Client({
        domain: PUBLIC_AUTH0_DOMAIN,
        clientId: PUBLIC_AUTH0_CLIENT_ID,
        // authorizationParams: {
        //     audience: PUBLIC_AUTH0_AUDIENCE
        // }
    })
    return authClient;
}

export { getAuthClient }