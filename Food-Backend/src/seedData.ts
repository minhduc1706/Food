import mongoose from "mongoose";
import MenuItem from "./models/menuItem";
import Order from "./models/order";
import Restaurant from "./models/restaurant";
import User from "./models/user";
import "dotenv/config";

async function seedData() {
  try {
    // Kết nối tới MongoDB
    await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("connected to database!"));

    console.log("Connected to MongoDB");

    // Xóa dữ liệu cũ
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    await Restaurant.deleteMany({});
    await User.deleteMany({});

    // Tạo dữ liệu mẫu cho User
    const user = new User({
      auth0Id: "auth0|123456",
      email: "user@example.com",
      name: "John Doe",
      addressLine1: "123 Main St",
      city: "Hometown",
      country: "Countryland",
    });
    await user.save();

    // Tạo dữ liệu mẫu cho MenuItem
    const menuItem = new MenuItem({
      name: "Margherita Pizza",
      price: 10.5,
      description: "Classic pizza with tomato sauce and mozzarella",
    });
    await menuItem.save();

    // Tạo dữ liệu mẫu cho Restaurant
    const restaurant = new Restaurant({
      user: user._id,
      restaurantName: "Pizza Palace",
      description: "Best pizza in town",
      country: "Countryland",
      city: "Hometown",
      deliveryPrice: 5,
      estimatedDeliveryTime: 30,
      cuisines: ["Italian", "Pizza"],
      menuItems: [menuItem._id],
      imageUrl: "https://example.com/image.jpg",
      coordinates: { lat: 40.7128, lon: -74.0060 },
    });
    await restaurant.save();

    // Tạo dữ liệu mẫu cho Order
    const order = new Order({
      restaurant: restaurant._id,
      user: user._id,
      deliveryDetails: {
        email: user.email,
        name: user.name,
        addressLine1: user.addressLine1,
        city: user.city,
        country: user.country,
      },
      cartItems: [
        {
          menuItem: menuItem._id,
          quantity: 2,
        },
      ],
      deliveryTip: 2,
      deliveryInstructions: "Leave at the door",
      totalAmount: 25,
      status: "placed",
    });
    await order.save();

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
