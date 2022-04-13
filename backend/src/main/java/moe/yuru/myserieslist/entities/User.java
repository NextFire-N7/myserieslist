package moe.yuru.myserieslist.entities;
import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

@Entity
public class User implements Serializable {
    private @Id @GeneratedValue int id;
    private String username;
    private String password;
    private ArrayList<Film> filmsList = new ArrayList<Film>();
    private ArrayList<Serie> seriesList = new ArrayList<Serie>();

    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<Film> getFilmList() {
        return filmsList;
    }
    
    public void addFilmList(Film film) {
        this.filmsList.add(film);
    }

    public ArrayList<Serie> getSeriesList() {
        return seriesList;
    }
    
    public void addSeriesList(Serie serie) {
        this.seriesList.add(serie);
    }

}