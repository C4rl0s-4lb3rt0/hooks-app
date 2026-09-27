import * as z from "zod";
interface Todo{
    id: number;
    text: string;
    completed: boolean;
}
interface TaskState {
    todos: Todo[];
    length: number;
    completed:number;
    pending:number;
}

export const initialTaskState: TaskState = {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
};

const createTaskState = (todos: Todo[]): TaskState => {
    const completed = todos.filter((todo) => todo.completed).length;

    return {
        todos,
        length: todos.length,
        completed,
        pending: todos.length - completed,
    };
};

export type TaskAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number };


const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});


const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length : z.number(),
    completed: z.number(),
    pending: z.number(),
});


export const getTaskInitialState = (): TaskState => {
    const storedState = localStorage.getItem('tasks-state');
    if (!storedState) {
        return initialTaskState;
    }

    try {
        const parsedState: Partial<TaskState> = JSON.parse(storedState);
        if (!Array.isArray(parsedState.todos)) {
            return initialTaskState;
        }

        const completed = parsedState.todos.filter((todo) => todo.completed).length;
        return {
            ...initialTaskState,
            ...parsedState,
            todos: parsedState.todos,
            length: parsedState.todos.length,
            completed,
            pending: parsedState.todos.length - completed,
        };
    } catch {
        const result = TaskStateSchema.safeParse(JSON.parse(storedState));
        if (result.success) {
            return result.data;
        }
        return initialTaskState;
    }
};

export const taskReducer = (
    state: TaskState, 
    action: TaskAction
): TaskState => {

    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload.trim(),
                completed: false,
            };
            return createTaskState([...state.todos, newTodo]);
        }

        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return createTaskState(updatedTodos);
        }
        
        case 'TOGGLE_TODO':{ 
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            return createTaskState(updatedTodos);
        }

        default:
            return state;
    }
}