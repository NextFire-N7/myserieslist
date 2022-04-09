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

import moe.yuru.myserieslist.entities.Person;

@Path("/persons")
public class PersonsService {

    @PersistenceContext
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> getPersons() {
        Map<String, Serializable> data = new HashMap<>();
        data.put("message", "Hello World!");
        ArrayList<Person> pers = new ArrayList<>();
        pers.addAll(em.createQuery("FROM Person", Person.class).getResultList());
        data.put("persons", pers);
        return data;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Person postPersons(Person person) {
        em.persist(person);
        return person;
    }

}
