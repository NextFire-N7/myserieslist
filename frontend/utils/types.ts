export interface Media {
  commentaire: any;
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

export interface Commentaire {
  titre : string;
  detail : string;
  note : number;
}

export interface Person {
  prenom : string;
  nom : string;
  photourl : string;
  type : PersonType
}

export enum PersonType {
  ACTEUR,
  DOUBLEUR,
  REALISATEUR
}