package moe.yuru.myserieslist.entities;

import javax.persistence.*;

@Entity
public class Commentaire {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String titre;
    private int note;
    private String message;
    private String auteurs;
  
    public String getTitre() {
        return titre;
    }
    public String getAuteurs() {
        return auteurs;
    }
    public void setAuteurs(String auteurs) {
        this.auteurs = auteurs;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public int getNote() {
        return note;
    }
    public void setNote(int note) {
        this.note = note;
    }
    public void setTitre(String titre) {
        this.titre = titre;
    }
}
