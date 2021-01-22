const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
 
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
  }, 
  property_type: {
    type: String,
    required: true,
  },
  minprice: {
    type: String,
    
    required: true,
  },
  maxprice: {
    type: String,
   
    required: true,
  },
  bedrooms: {
    type: String,
  },
  parking: {
    type: String,
  },
  bathrooms: {
    type: String,
    
  },
  floor_size: {
    type: String,
  },
  erf_size: {
    type: String,
  },
  pet_friendly: {
    type: Boolean,
    default:false
  },
  garden: {
    type: Boolean,
    default:false

  },
  pool: {
    type: Boolean,
    default:false

  },
  flatlet: {
    type: Boolean,
    default:false

  },retirement: {
    type: Boolean,
    default:false

  },
  repossessed: {
    type: Boolean,
    default:false

  },
  on_show: {
    type: Boolean,
    default:false

  },
  auction: {
    type: Boolean,
    default:false

  },
  price: {
    type: String,
  },
  photo: {
    type: Array,
  },
  location: {
    type: String,
  },
  name: {
    type: String,
  },customer_photo: {
    type: Array,
  },phone_number: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  
});
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
