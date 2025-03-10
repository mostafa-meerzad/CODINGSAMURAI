# Realtime Chat App

## Project folder structure

Put all the files and directories of your server inside `src/` directory

the logic of route handlers can get really long and get in the way also makes reading it harder
for this reason take the out from the routes and place them inside `controllers` directory

## Naming Convention

1. Route files `auth.route.js` so it is a **route** file for **auth**
2. Route handler functions `auth.controller.js` so it ia a **controller** for the **auth**

## DB connection

call the DB connection function in the callback for server's listen

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running or port: ${PORT}`);
  connectDB();
});
```

## DB documents best practice

you should always include a `createdAt` and `updatedAt` field in your documents

putting `{timestamps}` in the mongoose Schema adds `createdAt` and `updatedAt` fields automatically

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);
```

## Route handlers

always use `try/catch` as best practice so if something goes wrong our server doesn't crash

## JWT token

send token in the cookies

## Route handler Error messages

never return a very specific error message, saying exactly what went wrong, attackers can use it against you

## User Profile Image

use a cloud service like **Cloudinary** with provides services for storing and sharing media files and they offer a free plan 🙂 as well

how to setup cloudinary

```js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

## Message model

for the message model we need to have **senderId**, **receiverId**, **text** and **image** fields

## Messages

to get all the messages between current user and the target user:

we need to query the messages model like this

```js
const messages = await Message.find({
  senderId: myId,
  receiverId: userToChatId,
  senderId: userToChatId,
  receiverId: myId,
});
```

## Axios Setup

```js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
```

The axios.create() method allows you to create a custom Axios instance with pre-configured settings. This is useful when you want to reuse the same configuration across multiple requests.

```js
// Without axios.create()
axios.get("http://localhost:5001/api/users");

// With axios.create()
axiosInstance.get("/users");
```

## Protect Routes if the User is not logged-in

here is how to protect your pages

```js
<Routes>
  <Route
    path="/"
    element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
  />
  <Route
    path="/signup"
    element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
  />
  <Route
    path="/login"
    element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
  />
  <Route path="/settings" element={<SettingsPage />} />
  <Route
    path="/profile"
    element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
  />
</Routes>
```
