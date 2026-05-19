import { houses, users } from "../data/data.js";
import House from "../models/House.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

export async function seedDatabase() {
  for (const house of houses) {
    await House.updateOne(
      { id: house.id },
      { $set: house },
      { upsert: true },
    );
  }

  for (const user of users) {
    const { password, ...userData } = user;

    await User.updateOne(
      { email: user.email },
      {
        $set: {
          ...userData,
          passwordHash: hashPassword(password),
        },
      },
      { upsert: true },
    );
  }

  console.log("Datos iniciales de MongoDB comprobados");
}
