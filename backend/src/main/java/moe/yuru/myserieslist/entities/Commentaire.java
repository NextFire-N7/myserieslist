package moe.yuru.myserieslist.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Commentaire implements Serializable {

    private @Id @GeneratedValue int id;

    private String auteur;
    private int note;
    private String titre;
    private String message;

    @ManyToOne
    Media media;

    public int getId() {
        return id;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public int getNote() {
        return note;
    }

    public void setNote(int note) {
        this.note = note;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setMedia(Media media) {
        this.media = media;
    }
}
