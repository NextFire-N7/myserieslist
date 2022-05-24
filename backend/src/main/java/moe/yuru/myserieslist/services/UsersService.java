package moe.yuru.myserieslist.services;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import moe.yuru.myserieslist.entities.User;

@Path("/users")
public class UsersService {

    @PersistenceContext
    private EntityManager em;

    private static Algorithm algorithm = Algorithm.HMAC256("secret");

    @GET
    @Path("/{pseudo}")
    @Produces(MediaType.APPLICATION_JSON)
    public User userGetByPseudo(@PathParam("pseudo") String pseudo) {
        return em.find(User.class, pseudo);
    }

    @POST
    @Path("/{pseudo}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> userLogIn(@PathParam("pseudo") String pseudo, Map<String, Serializable> data) {
        Map<String, Serializable> dict = new HashMap<>();
        User user = em.find(User.class, pseudo);
        if (user.checkPassword((String) data.get("password"))) {
            dict.put("user", user);
            String token = JWT.create()
                    .withSubject(user.getPseudo())
                    .sign(algorithm);
            dict.put("token", token);
        }
        return dict;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public User userPost(Map<String, Serializable> data) {
        User newUser = new User();
        newUser.setPseudo((String) data.get("pseudo"));
        newUser.setPassword((String) data.get("password"));
        newUser.setPhotoUrl((String) data.get("photoUrl"));
        em.persist(newUser);
        return newUser;
    }

}
