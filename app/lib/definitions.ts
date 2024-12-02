export type ImageData = {
  name: string,
  type: string,
  url: string,
  tags: string[],
}

// export type MongoSchema = {
//   userId: string
//   name: string
//   photos: ImageData[]
//   tag_heirarchy: undefined
// }

export type Library = {
  userId: string
  files: ImageData[]
}
