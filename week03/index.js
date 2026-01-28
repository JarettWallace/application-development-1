// Identification Header
const name = "Jarett Wallace";
const course = "CS31103";
const week = "week 3";
// Runtime info
const nodeVersion = process.version
const currentDate = new Date();
// Config via envirnment variables
const port = process.env.Port || 3000;
const environment = process.env.NODE_ENV || 'development';
// Data OBJ
const appConfig = {
    port,
    environment,
    startedAT: currentDate
};
