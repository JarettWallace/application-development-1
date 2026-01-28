// ID header 
console.log("Jarett Wallace");
console.log("course: CS31103");
console.log("week 03");

// runtime info
console.log("node version: ", process.version);
console.log("Current date and time:", new Date());

// config via environment variables
const port = process.env.PORT|| 3000;
const environment = process.env.NODE_ENV || "development";

// data obj
const appConfig = {
  port,
  environment,
  startedAt: new Date()
};
// print as JSON
console.log(" App Configuration:");
console.log(JSON.stringify(appConfig, null, 2));