package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import at.favre.lib.crypto.bcrypt.BCrypt;

@Entity
public class User implements Serializable {

    private @Id String pseudo;
    private String passwordHash;
    private String photoUrl;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Media> viewedMedias;

    @OneToMany(mappedBy = "media")
    private Collection<Commentaire> commentaires;

    public boolean checkPassword(String password) {
        return BCrypt.verifyer().verify(password.toCharArray(), passwordHash).verified;
    }

    public void setPassword(String password) {
        String passwordHash = BCrypt.withDefaults().hashToString(12, password.toCharArray());
        this.passwordHash = passwordHash;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Collection<Media> getViewedMedias() {
        return viewedMedias;
    }

    public void setViewedMedias(Collection<Media> viewedMedias) {
        this.viewedMedias = viewedMedias;
    }

}
