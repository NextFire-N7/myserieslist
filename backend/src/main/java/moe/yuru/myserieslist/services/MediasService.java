package moe.yuru.myserieslist.services;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
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

import moe.yuru.myserieslist.entities.Media;
import moe.yuru.myserieslist.entities.Person;

@Path("/medias")
public class MediasService {

    @PersistenceContext
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> mediasGet() {
        Map<String, Serializable> data = new HashMap<>();
        ArrayList<Media> med = new ArrayList<>();
        med.addAll(em.createQuery("FROM Media", Media.class).getResultList());
        data.put("medias", med);
        return data;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Media mediasGetById(@PathParam("id") int id) {
        return em.find(Media.class, id);
    }

    @GET
    @Path("/{id}/persons")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Collection<Person> mediasGetPersons(@PathParam("id") int id) {
        Collection<Person> persons = em
                .createQuery("FROM Person p JOIN FETCH p.medias m WHERE m.id = :id", Person.class)
                .setParameter("id", id)
                .getResultList();
        return persons;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Media mediasPost(Media media) {
        em.persist(media);
        return media;
    }

}
