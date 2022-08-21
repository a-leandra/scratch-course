const { groupRouter, groupPrefix } = require("./groupRoutes");
const { progressRouter, progressPrefix } = require("./progressRoutes");
const { studentRouter, studentPrefix } = require("./studentRoutes");
const { taskRouter, taskPrefix } = require("./taskRoutes");
const { teacherRouter, teacherPrefix } = require("./teacherRoutes");
const { mixedRouter, mixedPrefix } = require("./mixedRoutes");

const allRoutes = [
  {
    router: groupRouter,
    prefix: groupPrefix,
  },
  {
    router: progressRouter,
    prefix: progressPrefix,
  },
  {
    router: studentRouter,
    prefix: studentPrefix,
  },
  {
    router: taskRouter,
    prefix: taskPrefix,
  },
  {
    router: teacherRouter,
    prefix: teacherPrefix,
  },
  {
    router: mixedRouter,
    prefix: mixedPrefix,
  },
];

module.exports = allRoutes;
