const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/tasksController");

// Routes
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;