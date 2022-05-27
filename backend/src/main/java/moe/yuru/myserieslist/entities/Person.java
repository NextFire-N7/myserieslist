package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

//import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;

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
    private Collection<Character> roles;    

    public Person(String lastName, String firstName, String photoUrl) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.photoUrl = photoUrl;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

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

    public PersonType getType() {
        return type;
    }

    public void setType(PersonType type) {
        this.type = type;
    }

    public Collection<Media> getMedias() {
        return medias;
    }

    public void setMedias(Collection<Media> medias) {
        this.medias = medias;
    }

    public Collection<Character> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Character> roles) {
        this.roles = roles;
    }

}
