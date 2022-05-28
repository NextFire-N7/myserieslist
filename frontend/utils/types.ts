export interface Media {
  id: number;
  nom: string;
  type: MediaType;
  coverUrl: string;
  commentaires: Commentaire[];
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

export interface Commentaire {
  id : number;
  titre : string;
  detail : string;
  note : number;
}
