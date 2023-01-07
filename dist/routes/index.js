"use strict";
exports.__esModule = true;
exports.routes = void 0;
var express_1 = require("express");
var fs_1 = require("fs");
var auth_routes_1 = require("./auth.routes");
var cart_routes_1 = require("./cart.routes");
var categories_routes_1 = require("./categories.routes");
var colors_routes_1 = require("./colors.routes");
var order_routes_1 = require("./order.routes");
var products_routes_1 = require("./products.routes");
var reviews_routes_1 = require("./reviews.routes");
var users_routes_1 = require("./users.routes");
// Way To Prod
exports.routes = (0, express_1.Router)();
var modules = [auth_routes_1.authRoutes,
    cart_routes_1.cartRoutes,
    categories_routes_1.routes,
    colors_routes_1.colorsRoutes,
    order_routes_1.orderRoutes,
    products_routes_1.productsRoutes,
    reviews_routes_1.reviewsRoutes,
    users_routes_1.usersRoutes
];
var getRoutes = function () {
    (0, fs_1.readdirSync)(__dirname).filter(function (name) { return !name.includes('index'); }).map(function (name, i) {
        var nameRoute = name.slice(0, name.indexOf('.'));
        exports.routes.use('/' + nameRoute, modules[i]);
    });
};
getRoutes();
