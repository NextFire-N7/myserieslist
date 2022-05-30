package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Person implements Serializable {

    private @Id @GeneratedValue int id;

    private String lastName;
    private String firstName;
    private String photoUrl;
    private PersonType type;

    @ManyToMany
    private Collection<Media> medias;

    @OneToMany
    private Collection<Chara> roles;

    public int getId() {
        return id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public PersonType getType() {
        return type;
    }

    public void setType(PersonType type) {
        this.type = type;
    }

    public void setMedias(Collection<Media> medias) {
        this.medias = medias;
    }

    public void setRoles(Collection<Chara> roles) {
        this.roles = roles;
    }

}
