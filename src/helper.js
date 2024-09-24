export const removeIdentical = (arr) => {
  return arr.filter((it, i, arr) => i === arr.findIndex((el) => el.task  === it.task ))
}

