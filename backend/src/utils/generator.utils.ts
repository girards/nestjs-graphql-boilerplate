export const generate6CharacterCode = (): string => {
  return (100000 + Math.floor(Math.random() * 900000)).toString()
}