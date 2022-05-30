package moe.yuru.myserieslist.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Chara implements Serializable {

    private @Id @GeneratedValue int id;

    private String nom;

    @ManyToOne
    Media charamedia;

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Media getMedia() {
        return charamedia;
    }

    public void setMedia(Media media) {
        this.charamedia = media;
    }

}
