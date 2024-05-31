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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// creating product into database
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield product_model_1.Product.isProductExists(productData.name)) {
        throw new Error('Product already exists');
    }
    const result = yield product_model_1.Product.create(productData);
    return result;
});
// getting all product from database & search query
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const query = searchTerm ? { name: new RegExp(searchTerm, 'i') } : {};
    const result = yield product_model_1.Product.find(query);
    return result;
});
// getting single product from database
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: productId });
    // const result = await Product.aggregate([{ $match: { id: id } }]);
    return result;
});
// updating single product from database
const updateProductInDB = (productId_1, productData_1, ...args_1) => __awaiter(void 0, [productId_1, productData_1, ...args_1], void 0, function* (productId, productData, updateInventoryOnly = false) {
    var _a, _b;
    const update = updateInventoryOnly
        ? {
            'inventory.quantity': (_a = productData.inventory) === null || _a === void 0 ? void 0 : _a.quantity,
            'inventory.inStock': (_b = productData.inventory) === null || _b === void 0 ? void 0 : _b.inStock,
        }
        : productData;
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, update, {
        new: true,
    });
    return result;
});
// deleting product from database
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.Product.deleteOne({ _id: productId });
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
};
