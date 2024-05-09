'use strict'

const CorsDomain = require('./cors.domain.model')
const Role = require('./role.model')
const Resource = require('./resource.model')
const PermissionType = require('./permission.type.model')
const Permission = require('./permission.model')
const RolePermission = require('./role.permission.model')
const UserStatus = require('./user.status.model')
const User = require('./user.model')
const RefreshToken = require('./refresh.token.model')
const RefreshTokenUsed = require('./refresh.token.used.model')
const ResetToken = require('./reset.token.model')
const Token = require('./token.model')
const Gender = require('./gender.model')
const Category = require('./category.model')
const Product = require('./product.model')
const Cart = require('./cart.model')
const CartDetail = require('./cart.detail.model')
const PaymentForm = require('./payment.form.model')
const OrderStatus = require('./order.status.model')
const Order = require('./order.model')
const OrderDetail = require('./order.detail.model')
const WishList = require('./wish.list.model')
const WishListDetail = require('./wish.list.detail.model')
const Version = require('./version.model')

Permission.belongsTo(PermissionType, {
  foreignKey: 'permissionTypeId',
  targetKey: 'id',
  as: 'permissionType'
})

Permission.belongsTo(Resource, {
  foreignKey: 'resourceId',
  targetKey: 'id',
  as: 'resource'
})

// PermissionType.hasMany(Permission, {
//   foreignKey: 'permissionTypeId',
//   sourceKey: 'id',
//   as: 'permissions'
// })

RolePermission.belongsTo(Role, {
  foreignKey: 'roleId',
  targetKey: 'id',
  as: 'role'
})

RolePermission.belongsTo(Permission, {
  foreignKey: 'permissionId',
  targetKey: 'id',
  as: 'permission'
})

RolePermission.belongsTo(User, {
  foreignKey: 'assignerId',
  targetKey: 'id',
  as: 'assigner'
})

Role.hasMany(RolePermission, {
  foreignKey: 'roleId',
  sourceKey: 'id',
  as: 'accessControlList'
})

User.hasMany(RolePermission, {
  foreignKey: 'assignerId',
  sourceKey: 'id',
  as: 'accessControlList'
})
User.hasOne(WishList, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'wishList'
})

Permission.hasMany(RolePermission, {
  foreignKey: 'permissionId',
  sourceKey: 'id',
  as: 'accessControlList'
})

Permission.belongsTo(Version, {
  foreignKey: 'versionId',
  targetKey: 'id',
  as: 'version'
})

Resource.hasMany(Permission, {
  foreignKey: 'resourceId',
  sourceKey: 'id',
  as: 'permissions'
})

User.belongsTo(UserStatus, {
  foreignKey: 'userStatusId',
  targetKey: 'id',
  as: 'userStatus'
})

User.belongsTo(Role, {
  foreignKey: 'roleId',
  targetKey: 'id',
  as: 'role'
})

User.belongsTo(Gender, {
  foreignKey: 'genderId',
  targetKey: 'id',
  as: 'gender'
})

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

RefreshTokenUsed.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

ResetToken.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

Token.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  as: 'category'
})

Cart.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})
Cart.hasMany(CartDetail, {
  foreignKey: 'cartId',
  sourceKey: 'id',
  as: 'products'
})

CartDetail.belongsTo(Cart, {
  foreignKey: 'cartId',
  targetKey: 'id',
  as: 'cart'
})
CartDetail.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  as: 'product'
})

Order.belongsTo(OrderStatus, {
  foreignKey: 'orderStatusId',
  targetKey: 'id',
  as: 'orderStatus'
})
Order.belongsTo(PaymentForm, {
  foreignKey: 'paymentFormId',
  targetKey: 'id',
  as: 'paymentForm'
})
Order.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})
Order.hasMany(OrderDetail, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  as: 'products'
})

OrderDetail.belongsTo(Order, {
  foreignKey: 'orderId',
  targetKey: 'id',
  as: 'order'
})
OrderDetail.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  as: 'product'
})

WishList.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
})
WishList.hasMany(WishListDetail, {
  foreignKey: 'wishListId',
  sourceKey: 'id',
  as: 'products'
})
WishListDetail.hasOne(Product, {
  foreignKey: 'id',
  sourceKey: 'productId',
  as: 'product'
})

module.exports = {
  CorsDomain,
  Role,
  Resource,
  PermissionType,
  Version,
  Permission,
  RolePermission,
  UserStatus,
  User,
  RefreshToken,
  RefreshTokenUsed,
  ResetToken,
  Token,
  Gender,
  Category,
  Product,
  Cart,
  CartDetail,
  PaymentForm,
  OrderStatus,
  Order,
  OrderDetail,
  WishList,
  WishListDetail
}