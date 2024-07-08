// export const PROJECT_STATUS_OPTIONS = ["pending", "in_progress", "completed"];
export const STATUS_OPTIONS = [
    {
        label: "Pending",
        value: "pending",
    },
    {
        label: "In Progress",
        value: "in_progress",
    },
    {
        label: "Completed",
        value: "completed",
    },
];

export const PRIORITIES = [
    {
        label: "High",
        value: "high",
    },
    {
        label: "Medium",
        value: "medium",
    },
    {
        label: "Low",
        value: "low",
    },
];

export const statusTheme = {
    in_progress: "bg-yellow-600",
    completed: "bg-green-600",
    pending: "bg-red-600",
};
