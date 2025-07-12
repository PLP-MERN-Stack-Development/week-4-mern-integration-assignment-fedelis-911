// Category.js - Mongoose model for blog categories

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    color: {
      type: String,
      default: '#3B82F6', // Default blue color
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  next();
});

// Virtual for category URL
CategorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

// Method to increment post count
CategorySchema.methods.incrementPostCount = function () {
  this.postCount += 1;
  return this.save();
};

// Method to decrement post count
CategorySchema.methods.decrementPostCount = function () {
  if (this.postCount > 0) {
    this.postCount -= 1;
  }
  return this.save();
};

module.exports = mongoose.model('Category', CategorySchema);

