export type ImageData = {
  id: string
  src: string
  tags: string[]
}

export type MongoSchema = {
  userId: string
  name: string
  photos: ImageData[]
  tag_heirarchy: undefined
}
