package moe.yuru.myserieslist.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Character implements Serializable {
    
    @Id @GeneratedValue
    private int id;

    private String nom;

    @ManyToOne
    Media mediachar;

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
        return mediachar;
    }

    public void setMedia(Media media) {
        this.mediachar = media;
    }

}
