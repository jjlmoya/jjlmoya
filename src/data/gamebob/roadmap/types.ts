export interface Task {
    name: string;
    status: "done" | "active" | "pending";
}

export interface Project {
    name: string;
    description: string;
    homeDescription?: string;
    image?: string;
    statusLabel: string;
    statusType: "released" | "developing" | "qa" | "planning";
    progress: number;
    color: string;
    links?: {
        googlePlay?: string;
        appStore?: string;
    };
    tasks: Task[];
}
