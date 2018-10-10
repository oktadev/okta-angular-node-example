"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: '{clientId}',
    issuer: 'https://dev-322018.oktapreview.com/oauth2/default'
});
function oktaAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.token;
            if (!token) {
                return res.status(401).send('Not Auhorised');
            }
            const jwt = yield oktaJwtVerifier.verifyAccessToken(token);
            req.user = {
                uid: jwt.claims.uid,
                email: jwt.claims.sub
            };
            console.log(req.user);
            next();
        }
        catch (err) {
            return res.status(401).send(err.message);
        }
    });
}
exports.oktaAuth = oktaAuth;
