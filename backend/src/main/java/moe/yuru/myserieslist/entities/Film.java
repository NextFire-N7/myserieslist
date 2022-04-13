package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;


@Entity
public class Film implements Serializable {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String nom;
    
    @OneToMany (mappedBy = "filmattached", fetch = FetchType.EAGER)
    private Collection<Commentaire> commentaires = new ArrayList<Commentaire>();
      //ajouter le truc pour stocker la photo
    
    @ManyToOne
    Saison episodeattached;


    public String getNom() {
        return nom;
    }
    public Collection<Commentaire> getCommentaires() {
        return commentaires;
    }
    public void addCommentaire(Commentaire commentaire) {
        commentaires.add(commentaire);
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    
}
