const getNextTodoStatus = (status: string) => {
    if (status === "OPEN") {
        return 'IN_PROGRESS'
    }
    if (status === "IN_PROGRESS") {
        return 'DONE'
    }

    return "UNKNOWN"
}

export const getNextStatus = (status: string) => {
    return getNextTodoStatus(status)
}
