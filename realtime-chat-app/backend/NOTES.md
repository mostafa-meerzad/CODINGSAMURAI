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