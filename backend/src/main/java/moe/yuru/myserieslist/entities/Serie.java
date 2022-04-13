package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

@Entity
public class Serie implements Serializable {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String nom;
    
    @OneToMany (mappedBy = "serieattached", fetch = FetchType.EAGER)
    private Collection<Commentaire> commentaires = new ArrayList<>();

    @OneToMany (mappedBy = "sattached", fetch = FetchType.EAGER)
    private Collection<Saison> saisons = new ArrayList<>();
    //ajouter le truc pour stocker la photo
    


    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    public Collection<Commentaire> getCommentaires() {
        return commentaires;
    }
    public void addCommentaires(Commentaire comm) {
        commentaires.add(comm);
    }
    public Collection<Saison> getSaisons() {
        return saisons;
    }
    public void addCommentaires(Saison saison) {
        saisons.add(saison);
    }
    
}