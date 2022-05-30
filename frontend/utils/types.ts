export interface Media {
  commentaire: Commentaire[];
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
  id: number;
  titre: string;
  message: string;
  auteur: string;
  note: number;
}

export interface Person {
  lastName: string;
  firstName: string;
  photoUrl: string;
  type: PersonType;
}

export enum PersonType {
  ACTEUR,
  DOUBLEUR,
  REALISATEUR,
}

export interface Franchise {
  nom: string;
  coverUrl: string;
}

export interface Chara {
  nom: string;
}
