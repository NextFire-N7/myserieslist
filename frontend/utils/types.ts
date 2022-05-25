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

export interface User {
  pseudo: string;
  photoUrl: string;
  viewedMedias: Media[];
}

export interface AuthData {
  token: string;
  pseudo: string;
}
