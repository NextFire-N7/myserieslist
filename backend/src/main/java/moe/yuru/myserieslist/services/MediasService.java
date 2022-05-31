package moe.yuru.myserieslist.services;

import java.util.List;

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
    public List<Media> mediasGet() {
        return em.createQuery("FROM Media", Media.class).getResultList();
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
    public List<Person> mediasGetPersons(@PathParam("id") int id) {
        List<Person> persons = em
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
