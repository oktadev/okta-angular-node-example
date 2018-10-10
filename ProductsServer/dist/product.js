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
const express_1 = require("express");
const model_1 = require("./model");
exports.router = express_1.Router();
exports.router.get('/product', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getProductRepository();
            const allProducts = yield repository.find();
            res.send(allProducts);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/product/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getProductRepository();
            const product = yield repository.find({ id: req.params.id });
            res.send(product);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/product', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getProductRepository();
            const product = new model_1.Product();
            product.name = req.body.name;
            product.sku = req.body.sku;
            product.description = req.body.description;
            product.price = Number.parseFloat(req.body.price);
            product.stock = Number.parseInt(req.body.stock);
            const result = yield repository.save(product);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/product/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getProductRepository();
            const product = yield repository.findOne({ id: req.params.id });
            product.name = req.body.name;
            product.sku = req.body.sku;
            product.description = req.body.description;
            product.price = Number.parseFloat(req.body.price);
            product.stock = Number.parseInt(req.body.stock);
            const result = yield repository.save(product);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/product/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getProductRepository();
            yield repository.delete({ id: req.params.id });
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
