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
const _env_server_1 = require("./.env.server");
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier(Object.assign({}, _env_server_1.ConfigOKTA));
function oktaAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.token;
            if (!token) {
                return res.status(401).send('Not Authorised');
            }
            const jwt = yield oktaJwtVerifier.verifyAccessToken(token);
            req["user"] = {
                uid: jwt.claims.uid,
                email: jwt.claims.sub
            };
            next();
        }
        catch (err) {
            return res.status(401).send(err.message);
        }
    });
}
exports.oktaAuth = oktaAuth;
