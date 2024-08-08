import mongoose from "mongoose";


const menuItemShema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
})

const restaurantShema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    restaurantName: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }, city: {
        type: String,
        require: true
    },
    deliveryPrice: {
        type: Number,
        require: true
    },
    estimatedDeliveryTime: {
        type: Number,
        require: true
    },
    cuisines: [{
        type: String,
        require: true
    }],
    menuItems: [menuItemShema],
    imageUrl: {
        type: String,
        require: true
    },
    lastUpdated:{
        type: Date,
        required: true
    }
})

const Restaurant = mongoose.model("Restaurant", restaurantShema);

export default Restaurant;