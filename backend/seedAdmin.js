// seedAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedAdminsAndUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connected");

    // Create admin
    const adminExists = await User.findOne({ email: "arvindgaddi@gmail.com" });
    if (!adminExists) {
      await User.create({
        name: "arvind",
        email: "arvindgaddi@gmail.com",
        password: "Get4arvind@143",
        role: "admin",
      });
      console.log("Admin created");
    } else {
      console.log(" Admin already exists");
    }

    // Create regular user
    const userExists = await User.findOne({
      email: "saicharangaddi@gmail.com",
    });
    if (!userExists) {
      await User.create({
        name: "Sai charan",
        email: "saicharangaddi@gmail.com",
        password: "Get4sai@143",
        role: "user",
      });
      console.log(" User created");
    } else {
      console.log(" User already exists");
    }

    await mongoose.disconnect();
    console.log(" MongoDB disconnected. Seeding finished!");
  } catch (error) {
    console.error(" Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdminsAndUsers();
