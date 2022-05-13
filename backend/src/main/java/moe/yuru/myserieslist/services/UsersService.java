package moe.yuru.myserieslist.services;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.auth0.jwt.algorithms.Algorithm;

import at.favre.lib.crypto.bcrypt.BCrypt;
import moe.yuru.myserieslist.entities.User;

@Path("/User")
public class UsersService {

    @PersistenceContext
    private EntityManager em;

    private static Algorithm algorithm = Algorithm.HMAC256("secret");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> usersGet() {
        Map<String, Serializable> data = new HashMap<>();
        ArrayList<User> user = new ArrayList<>();
        user.addAll(em.createQuery("FROM User", User.class).getResultList());
        data.put("us", user);
        return data;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User userGetById(int id) {
        return em.find(User.class, id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public User userPost(Map<String, Serializable> data) {
        User newUser = new User();
        newUser.setPseudo((String) data.get("pseudo"));
        String password = (String) data.get("password");
        String passwordHash = BCrypt.withDefaults().hashToString(12, password.toCharArray());
        newUser.setPasswordHash(passwordHash);
        em.persist(newUser);
        return newUser;
    }

}
