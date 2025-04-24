import Task from "./Task";

function TaskList({ tasks }) {


    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                  <Task id={task.id} text={task.text}>

                  </Task>
                    
                </li>
            ))}
        </ul>
    );

}
export default TaskList;