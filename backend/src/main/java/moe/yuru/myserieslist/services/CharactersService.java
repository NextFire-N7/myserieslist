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
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import moe.yuru.myserieslist.entities.Chara;
import moe.yuru.myserieslist.entities.Media;

@Path("/characters")
public class CharactersService {

    @PersistenceContext
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> CharactersGet() {
        Map<String, Serializable> data = new HashMap<>();
        ArrayList<Chara> characters = new ArrayList<>();
        characters.addAll(em.createQuery("FROM Chara", Chara.class).getResultList());
        data.put("person", characters);
        return data;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Chara characterGetById(@PathParam("id") int id) {
        return em.find(Chara.class, id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Chara characterPost(Map<String, Serializable> data) {
        Media media = em.find(Media.class, (int) data.get("mediaSend"));
        String nom = (String) data.get("nom");
        Chara chara = new Chara();
        chara.setMedia(media);
        chara.setNom(nom);
        em.persist(chara);
        return chara;
    }

}
