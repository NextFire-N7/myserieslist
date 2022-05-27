package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Franchises implements Serializable {

    @Id @GeneratedValue
    private int id;

    private String nom;
    private String coverUrl;

    @OneToMany
    private Collection<Media> medias;

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public Collection<Media> getMedias() {
        return medias;
    }

    public void setMedias(Collection<Media> medias) {
        this.medias = medias;
    }

    
    
}
