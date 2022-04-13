package moe.yuru.myserieslist.entities;

import java.util.ArrayList;

import javax.persistence.*;

@Entity
public class Saison {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String nom;
    private ArrayList<Commentaire> commentaires;
    private ArrayList<Film> episode;
    
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

}