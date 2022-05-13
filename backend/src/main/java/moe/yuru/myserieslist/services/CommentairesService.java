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

import moe.yuru.myserieslist.entities.Commentaire;



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
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Commentaire commentairesPost(Commentaire commentaires) {
        em.persist(commentaires);
        return commentaires;
    }
    
}