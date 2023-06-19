import { Document, model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  lastName: string;
  username: string;
  identityCard: string; // Primary key
  password: string;
  city?: string;
  street?: string;
  role: string;
}

export interface Category extends Document {
  categoryId: string; // Primary key
  categoryName: string;
}

export interface Product extends Document {
  productId: string; // Primary key
  productName: string;
  categoryId: string; // Foreign key referencing Category
  price: number;
  imagePath: string;
}

export interface ShoppingCart extends Document {
  cartId: string; // Primary key
  customerId: string; // Foreign key referencing Customer
  createdAt: Date;
}

export interface CartItem extends Document {
  cartItemId: string; // Primary key
  productId: string; // Foreign key referencing Product
  quantity: number;
  generalPrice: number;
  cartId: string; // Foreign key referencing ShoppingCart
}

export interface Order extends Document {
  orderId: string; // Primary key
  customerId: string | null; // Optional foreign key referencing Customer
  cartId: string; // Foreign key referencing ShoppingCart
  finalPrice: number;
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: Date;
  orderExecutionDate: Date;
  paymentMethodLast4Digits: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  identityCard: { type: String, required: true, unique: true }, // Primary key
  password: { type: String, required: true },
  city: { type: String, required: false },
  street: { type: String, required: false },
  role: { type: String, required: true },
});

const CategorySchema = new Schema<Category>({
  categoryId: { type: String, required: true, unique: true }, // Primary key
  categoryName: { type: String, required: true },
});

const ProductSchema = new Schema<Product>({
  productId: { type: String, required: true, unique: true }, // Primary key
  productName: { type: String, required: true },
  categoryId: { type: String, required: true }, // Foreign key referencing Category
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
});

const ShoppingCartSchema = new Schema<ShoppingCart>({
  cartId: { type: String, required: true, unique: true }, // Primary key
  customerId: { type: String, required: true }, // Foreign key referencing Customer
  createdAt: { type: Date, default: Date.now },
});

const CartItemSchema = new Schema<CartItem>({
  cartItemId: { type: String, required: true, unique: true }, // Primary key
  productId: { type: String, required: true }, // Foreign key referencing Product
  quantity: { type: Number, required: true },
  generalPrice: { type: Number, required: true },
  cartId: { type: String, required: true }, // Foreign key referencing ShoppingCart
});

const OrderSchema = new Schema<Order>({
  orderId: { type: String, required: true, unique: true }, // Primary key
  customerId: { type: String, default: null }, // Optional foreign key referencing Customer
  cartId: { type: String, required: true }, // Foreign key referencing ShoppingCart
  finalPrice: { type: Number, required: true },
  deliveryCity: { type: String, required: true },
  deliveryStreet: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  orderExecutionDate: { type: Date, required: true },
  paymentMethodLast4Digits: { type: String, required: true },
});

export const UserModel = model<User>("User", UserSchema);
export const CategoryModel = model<Category>("Category", CategorySchema);
export const ProductModel = model<Product>("Product", ProductSchema);
export const ShoppingCartModel = model<ShoppingCart>(
  "ShoppingCart",
  ShoppingCartSchema
);
export const CartItemModel = model<CartItem>("CartItem", CartItemSchema);
export const OrderModel = model<Order>("Order", OrderSchema);
