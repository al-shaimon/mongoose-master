"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_service_1 = require("../product/product.service");
const order_model_1 = require("./order.model");
// creating order in database
const createOrderInDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.ProductServices.getSingleProductFromDB(orderData.productId);
    if (!product) {
        throw new Error('Order failed. Product not found in inventory');
    }
    else if (product.inventory.quantity < orderData.quantity) {
        throw new Error('Insufficient quantity available in inventory');
    }
    const updatedQuantity = product.inventory.quantity - orderData.quantity;
    // updating inventory
    yield product_service_1.ProductServices.updateProductInDB(orderData.productId, {
        inventory: {
            quantity: updatedQuantity,
            inStock: updatedQuantity > 0,
        },
    }, true);
    const result = yield order_model_1.Order.create(orderData);
    return result;
});
// getting all orders from database & email search query
const getAllOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = email ? { email: email } : {};
    const result = yield order_model_1.Order.find(query);
    return result;
});
exports.OrderServices = {
    createOrderInDB,
    getAllOrdersFromDB,
};
