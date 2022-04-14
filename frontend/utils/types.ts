export interface Media {
  id: number;
  nom: string;
  type: MediaType;
  coverUrl: string;
}

export enum MediaType {
  COLLECTION,
  MOVIE,
  TV,
  ANIME,
  EPISODE,
}

export interface Person {
  id: number;
  lastName: string;
  firstName: string;
}
