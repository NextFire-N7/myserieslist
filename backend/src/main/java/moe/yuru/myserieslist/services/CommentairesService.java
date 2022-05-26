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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.auth0.jwt.JWT;

import moe.yuru.myserieslist.entities.Commentaire;
import moe.yuru.myserieslist.entities.Media;
import moe.yuru.myserieslist.entities.User;



@Path("/commentaires")
public class CommentairesService {
    
    @PersistenceContext
    private EntityManager em;

    @GET 
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String,Serializable> commentairesGet() {
        Map<String,Serializable> data = new HashMap<>();
        ArrayList<Commentaire> comm = new ArrayList<>();
        comm.addAll(em.createQuery("FROM Commentaires", Commentaire.class).getResultList());
        data.put("commentaires", comm);
        return data;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Commentaire commentairesGetById(int id) {
        return em.find(Commentaire.class, id);
    }
    
    @POST
    @Path("/{pseudo}/posted")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Commentaire commentairePost(@PathParam("pseudo") String pseudo, Map<String, Serializable> data) {
        String sub = JWT.decode((String) data.get("token")).getSubject();
        if (!sub.equals(pseudo)) {
            throw new RuntimeException("Invalid token");
        }
        User user = em.find(User.class, pseudo);
        Media media = em.find(Media.class, (int) data.get("id"));
        String titre = (String) data.get("titre");
        String detail = (String) data.get("detail");
        int note = (int) data.get("note");
        Commentaire commentaire = new Commentaire();
        commentaire.setAuteur(user.getPseudo());
        commentaire.setTitre(titre);
        commentaire.setNote(note);
        commentaire.setMessage(detail);
        commentaire.setMedia(media);
        em.persist(commentaire);
        return commentaire;
    }
    
}