const getNextTodoStatus = {
  OPEN: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
}

export const getNextStatus = status => {
  return getNextTodoStatus[status]
}
