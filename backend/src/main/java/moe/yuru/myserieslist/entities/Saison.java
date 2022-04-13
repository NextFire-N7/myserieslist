package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

@Entity
public class Saison implements Serializable {
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String nom;
    @OneToMany (mappedBy = "saisonattached", fetch = FetchType.EAGER)
    private Collection<Commentaire> commentaires = new ArrayList<Commentaire>();

    @OneToMany (mappedBy = "episodeattached", fetch = FetchType.EAGER)
    private Collection<Film> episode = new ArrayList<Film>();
    
    @ManyToOne
    Serie sattached;
    
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

}