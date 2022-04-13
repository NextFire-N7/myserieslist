package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.*;

@Entity
public class Film implements Serializable {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String nom;
    private ArrayList<Commentaire> commentaires = new ArrayList<>();
      //ajouter le truc pour stocker la photo
    



    public String getNom() {
        return nom;
    }
    public ArrayList<Commentaire> getCommentaires() {
        return commentaires;
    }
    public void addCommentaire(Commentaire commentaire) {
        commentaires.add(commentaire);
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    
}
