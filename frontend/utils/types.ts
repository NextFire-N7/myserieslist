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
}

export interface AuthData {
  token: string;
  user: User;
}
