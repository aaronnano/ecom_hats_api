"use strict";
exports.__esModule = true;
exports.authBy = void 0;
var types_1 = require("../../types");
// ### Segun los roles que deseo para una determinada ruta, me fijo si el User del token tiene algun Role de los Roles
// ## Sirve tambien para ver si el userSession hace un cambio Id del mismo User. Por supuesto, el admin puede hacerlo a cualquiera
var authBy = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        // Se llegara aqui solo cuando el token haya sido validado
        var userSession = req.userSession; // Siempre vendra el userSession despues del verifyToken
        var id = Number(req.params.id); // Para router que tengan el param /:id del User
        // ## Remove later
        // return next()
        //## Test
        if ((userSession === null || userSession === void 0 ? void 0 : userSession.role) === types_1.ROLE.ADMIN) { // Si es admin, accedera inmediatamente
            return next();
        }
        var hasRole = roles.some(function (role) { return role === (userSession === null || userSession === void 0 ? void 0 : userSession.role); }); // Vemos si el user actual tiene algun role de esta ruta
        if (!hasRole)
            return res.status(401).json({ msg: "Require the some of these roles: ".concat(roles, " to access to this route") });
        //## Test
        // Check que el userSession haga cambios a su propio user
        if ((userSession === null || userSession === void 0 ? void 0 : userSession.id) !== id)
            return res.status(401).json({ msg: "You only are able to make changes to yourself" });
        next();
    };
};
exports.authBy = authBy;
//# sourceMappingURL=authRoles.js.map