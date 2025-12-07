const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  'Transaction ID': Number,
  'Date': String,
  'Customer ID': String,
  'Customer Name': String,
  'Phone Number': mongoose.Schema.Types.Mixed,
  'Gender': String,
  'Age': Number,
  'Customer Region': String,
  'Customer Type': String,
  'Product ID': String,
  'Product Name': String,
  'Brand': String,
  'Product Category': String,
  'Tags': String,
  'Quantity': Number,
  'Price per Unit': Number,
  'Discount Percentage': Number,
  'Total Amount': Number,
  'Final Amount': Number,
  'Payment Method': String,
  'Order Status': String,
  'Delivery Type': String,
  'Store ID': String,
  'Store Location': String,
  'Salesperson ID': String,
  'Employee Name': String
}, {
  collection: 'sales',
  timestamps: false,
  strict: false
});
// Indexes
saleSchema.index({ 'Customer Name': 1 });
saleSchema.index({ 'Phone Number': 1 });
saleSchema.index({ 'Date': -1 });
saleSchema.index({ 'Customer Region': 1 });
saleSchema.index({ 'Product Category': 1 });
saleSchema.index({ 'Payment Method': 1 });
saleSchema.index({ 'Gender': 1 });

module.exports = mongoose.model('Sale', saleSchema);