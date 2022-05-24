package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Media implements Serializable {

    private @Id @GeneratedValue int id;

    private String nom;
    private MediaType type;
    private String coverUrl;

    @ManyToOne
    Media parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private Collection<Media> submedias;

    @OneToMany(mappedBy = "media", fetch = FetchType.EAGER)
    private Collection<Commentaire> commentaires;

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public MediaType getType() {
        return type;
    }

    public void setType(MediaType type) {
        this.type = type;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }
    
    public Collection<Commentaire> getCommentaire() {
        return commentaires;
    }

}