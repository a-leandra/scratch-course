const { groupRouter, groupPrefix } = require("./groupRoutes");
const { taskRouter, taskPrefix } = require("./taskRoutes");
const { userRouter, userPrefix } = require("./userRoutes");

const allRoutes = [
  {
    router: groupRouter,
    prefix: groupPrefix,
  },
  {
    router: taskRouter,
    prefix: taskPrefix,
  },
  {
    router: userRouter,
    prefix: userPrefix,
  },
];

module.exports = allRoutes;
