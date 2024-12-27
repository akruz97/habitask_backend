
interface ITask {
    title: string,
    completed: boolean,
    created?: string,
    date_completed?: string,
    user_id: number,
    user_asigned_id: number
}

export {
    ITask
}