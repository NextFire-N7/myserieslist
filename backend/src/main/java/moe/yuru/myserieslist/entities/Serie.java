package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.*;

@Entity
public class Serie implements Serializable {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String nom;
    private ArrayList<Commentaire> commentaires;
    private ArrayList<Saison> saisons;
    //ajouter le truc pour stocker la photo
    


    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    
}