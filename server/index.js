const express = require("express");
const cors = require("cors");  
const dotenv = require("dotenv");  
const pool = require("./db"); 

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg : "Welcome to the server"});
})

app.get("/todos", async (req, res) => {
    try{
        const todos = await pool.query("SELECT * FROM todo_table");
        res.json(todos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo_table WHERE todo_id = $1", [id]);
        res.json(todo.rows);
    } catch (error) {
        res.json(error);
    }
})

app.post("/todos", async (req, res) => {
      const { desc, completed } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo_table (todo_desc, todo_completed) VALUES($1, $2) RETURNING *",
        [desc, completed]
      );
      res.json({ newTodo, msg: "Todo Added", success: true });
    
  });


app.put("/todos/:id", async(req, res) => { 
    try{
        const {id} = req.params;
        const {desc, completed} = req.body;
        const updateTodo = await pool.query("UPDATE todo_table SET todo_desc = $1, todo_completed = $2 WHERE todo_id = $3", [desc, completed, id]);
        res.json({msg : "Todo was updated successfully", success : true});
    } catch (error) {
        res.json(error);
    }
})

app.delete("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo_table WHERE todo_id = $1", [id]);
        res.json({msg : "Todo was deleted successfully", success : true});
    } catch (error) {
        res.json(error);
    }
})

app.delete("/todos", async(req, res) => {
    try{
        const deleteAllTodos = await pool.query("DELETE FROM todo_table");
        res.json({msg : "All todos were deleted successfully", success : true});
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => {

    console.log(`Server is running on PORT ${PORT}...`);
})