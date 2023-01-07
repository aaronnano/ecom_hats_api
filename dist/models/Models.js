"use strict";
// Models a desplegar y que manejara el Front
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Order = exports.Review = exports.CartItem = exports.Product = exports.Address = exports.User = void 0;
var User = /** @class */ (function () {
    function User(_a) {
        var id = _a.id, uuid = _a.uuid, name = _a.name, username = _a.username, email = _a.email, avatar = _a.avatar, addresses = _a.addresses, orders = _a.orders;
        this.id = id;
        this.uuid = uuid;
        this.name = name;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.addresses = addresses === null || addresses === void 0 ? void 0 : addresses.map(function (add) { return new Address(add); });
        this.orders = orders === null || orders === void 0 ? void 0 : orders.map(function (order) { return new Order(order); });
    }
    return User;
}());
exports.User = User;
var Address = /** @class */ (function () {
    function Address(_a) {
        var id = _a.id, address_line = _a.address_line, city = _a.city, state = _a.state, phone = _a.phone;
        this.id = id;
        this.address_line = address_line;
        this.city = city;
        this.state = state;
        this.phone = phone;
    }
    return Address;
}());
exports.Address = Address;
var Product = /** @class */ (function () {
    function Product(_a) {
        var id = _a.id, title = _a.title, description = _a.description, image = _a.image, price = _a.price, colors = _a.colors, category = _a.category;
        // Esto permite que no se recibe alguna field, y por lo tanto quede e.g. price: undefined
        // Y esta bien, porque al momento de pasarlo a JSON desaparece la field
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.colors = colors === null || colors === void 0 ? void 0 : colors.map(function (_a) {
            var title = _a.title;
            return title;
        }); // Solo los nombres de los colores. Puede ser undefined
        this.category = category === null || category === void 0 ? void 0 : category.name; // Puede ser undefined
    }
    return Product;
}());
exports.Product = Product;
var CartItem = /** @class */ (function () {
    // private user: any
    // Nota: si pongo en undefined algunas fields, el JSON no las considera
    function CartItem(_a) {
        var id = _a.id, quantity = _a.quantity, color = _a.color, product = _a.product;
        this.id = id;
        this.quantity = quantity;
        this.color = color === null || color === void 0 ? void 0 : color.title;
        this.product = __assign({}, new Product(product));
    }
    return CartItem;
}());
exports.CartItem = CartItem;
var Review = /** @class */ (function () {
    // private user: any
    // Nota: si pongo en undefined algunas fields, el JSON no las considera
    function Review(_a) {
        var id = _a.id, createdAt = _a.createdAt, comment = _a.comment, user = _a.user;
        this.id = id;
        this.createdAt = createdAt;
        this.comment = comment;
        this.user = __assign({}, new User(user));
    }
    return Review;
}());
exports.Review = Review;
var Order = /** @class */ (function () {
    function Order(_a) {
        var order_id = _a.order_id, purchase_date = _a.purchase_date, delivery_date = _a.delivery_date, total = _a.total, status = _a.status, delivery_address = _a.delivery_address, orderItems = _a.orderItems;
        this.order_id = order_id;
        this.purchase_date = purchase_date;
        this.delivery_date = delivery_date;
        this.total = total;
        this.status = status;
        this.delivery_address = __assign({}, new Address(delivery_address));
        this.orderItems = orderItems.map(function (item) {
            return __assign({}, new CartItem(item));
        });
    }
    return Order;
}());
exports.Order = Order;
