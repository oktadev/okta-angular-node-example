# Basic CRUD App with Angular and Node
 
This example app shows how to build a basic CRUD app with Angular and Node.

Please read [Build a Basic CRUD App with Angular and Node](https://developer.okta.com/blog/2018/10/30/basic-crud-angular-and-node) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-angular-node-example.git
cd okta-angular-node-example
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the server, cd into the `ProductsServer` directory and run:
 
```bash
npm i
npm run build
npm start
```

To run the client, cd into the `MyAngularClient` directory and run:
 
```bash
npm install 
ng serve
```

### Create a New OIDC App in Okta

Before you begin, you’ll need a free Okta developer account. Install the [Okta CLI](https://cli.okta.com) and run `okta register` to sign up for a new account. If you already have an account, run `okta login`.

Then, run `okta apps create`. Select the default app name, or change it as you see fit. Choose **Single-Page App** and press **Enter**.

Use `http://localhost:4200/callback` for the Redirect URI and accept the default Logout Redirect URI of `http://localhost:4200`.

#### Server Configuration

Set your domain and copy the `clientId` into `ProductsServer/src/auth.ts`. 

**NOTE:** The value of `{yourOktaDomain}` should be something like `dev-123456.okta.com`. Make sure you don't include `-admin` in the value!

```ts
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '{clientId}',
  issuer: 'https://{yourOktaDomain}/oauth2/default'
});
```

#### Client Configuration

For the client, set the `issuer` and copy the `clientId` into `MyAngularClient/src/app/app.module.ts`.

```typescript
const oktaConfig = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/callback'
};
```

## Links

This example uses the following open source libraries from Okta:

* [Okta JWT Verifier for Node.js](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier)
* [Okta Angular SDK](https://github.com/okta/okta-angular)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2018/10/30/basic-crud-angular-and-node), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).
