package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class User implements Serializable {

    private @Id @GeneratedValue int id;

    private String pseudo;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private Collection<Media> viewedMedias;

    @OneToMany(mappedBy = "media", fetch = FetchType.EAGER)
    private Collection<Commentaire> commentaires;

    public int getId() {
        return id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }


}