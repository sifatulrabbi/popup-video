export const disallowPropagate = (callback: () => void) => {
  return function (e: React.SyntheticEvent<HTMLElement>) {
    e.stopPropagation()
    return callback()
  }
}
