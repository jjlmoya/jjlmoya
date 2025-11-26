export interface Task {
    name: string;
    status: "done" | "active" | "pending";
}

export interface Project {
    name: string;
    description: string;
    image?: string;
    statusLabel: string;
    progress: number;
    tasks: Task[];
}
