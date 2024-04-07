export interface ISong {
  name: string,
  url: string,
  cover: string,
  lyrics: string,
  artist: string,
}

export interface IProps {
  songs: Array<ISong>,
  title?: string,
  color?: string,
}
