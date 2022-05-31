package moe.yuru.myserieslist.services;

import java.io.Serializable;
import java.util.List;
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

import moe.yuru.myserieslist.entities.Chara;
import moe.yuru.myserieslist.entities.Media;
import moe.yuru.myserieslist.entities.Person;

@Path("/persons")
public class PersonService {

    @PersistenceContext
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> personsGet() {
        return em.createQuery("FROM Person", Person.class).getResultList();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Person personsGetById(@PathParam("id") int id) {
        return em.find(Person.class, id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Person personPost(Person person) {
        em.persist(person);
        return person;
    }

    @POST
    @Path("/link")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Person personlinkMedia(Map<String, Serializable> data) {
        Person person = em.find(Person.class, data.get("personsId"));
        Media media = em.find(Media.class, data.get("mediaId"));
        person.addMedia(media);
        return (person);
    }

    @POST
    @Path("/linkrole")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Person personlinkRole(Map<String, Serializable> data) {
        Person person = em.find(Person.class, data.get("personsId"));
        Chara chara = em.find(Chara.class, data.get("charaId"));
        person.addRole(chara);
        return (person);
    }

}
