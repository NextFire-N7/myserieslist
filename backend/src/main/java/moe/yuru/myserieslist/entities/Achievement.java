package moe.yuru.myserieslist.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Achievement implements Serializable {

    @Id @GeneratedValue
    private int id;

    private AchievementType type;
    private int condition;
    private Date obtentionDate;
    private String text;

    @ManyToOne
    Franchises franchise;

    @ManyToMany
    private Collection<User> users;

    public int getId() {
        return id;
    }
    public AchievementType getType() {
        return type;
    }
    public void setType(AchievementType type) {
        this.type = type;
    }
    public int getCondition() {
        return condition;
    }
    public void setCondition(int condition) {
        this.condition = condition;
    }
    public Date getObtentionDate() {
        return obtentionDate;
    }
    public void setObtentionDate(Date obtentionDate) {
        this.obtentionDate = obtentionDate;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public Franchises getFranchise() {
        return franchise;
    }
    public void setFranchise(Franchises franchise) {
        this.franchise = franchise;
    }
    public Collection<User> getUsers() {
        return users;
    }
    public void setUsers(Collection<User> users) {
        this.users = users;
    }
    
}
