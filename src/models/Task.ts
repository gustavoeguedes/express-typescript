interface TaskAttributes {
    id: number;
    title: string;
    descripcion: string;
    status: "todo" | "doing" | "done";
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt: Date;
}

export class Task {

    private static tasks: Task[] = [];
    private static sequence: number = 1;

    id: number;
    title: string;
    descripcion: string;
    status: "todo" | "doing" | "done";
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt: Date;

    constructor(atributes: TaskAttributes) {
        this.id = atributes.id;
        this.title = atributes.title;
        this.descripcion = atributes.descripcion;
        this.status = atributes.status;
        this.priority = atributes.priority;
        this.createdAt = atributes.createdAt;
        this.updatedAt = atributes.updatedAt;
    }

    static findAll(): Task[] {
        return [...this.tasks];
    }

    static findById(id: number): Task | null {
        return this.tasks.find((task) => task.id === id) ?? null;
    }

    static create(atributes: Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">): Task {
        const {title, descripcion, priority, status} = atributes;
        const newTask = new Task({
            id: this.sequence,
            title,
            descripcion,
            status,
            priority,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        this.tasks.push(newTask);
        this.sequence++;
        return newTask;
    }

    static update(id: number, atributes: Partial<Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">>): Task | null {
        const {title, descripcion, priority, status} = atributes;
        const task = this.findById(id);
        if (!task) return null;

        task.title = title ?? task.title;
        task.descripcion = descripcion ?? task.descripcion;
        task.priority = priority ?? task.priority;

        return task;
    }

    static delete(id: number): Task | null {
        const task = this.findById(id);
        if (!task) return null;

        this.tasks = this.tasks.filter((task) => task.id !== id);
        return task;
    }

}
