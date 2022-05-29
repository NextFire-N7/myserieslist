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
import javax.ws.rs.core.PersonType;

import moe.yuru.myserieslist.entities.Person;



@Path("/persons")
public class PersonService {

    @PersistenceContext
    private EntityManager em;
   
    @GET
    @Produces(PersonType.APPLICATION_JSON)
    public Map<String, Serializable> personsGet() {
        Map<String, Serializable> data = new HashMap<>();
        ArrayList<Person> pers = new ArrayList<>();
        pers.addAll(em.createQuery("FROM Person", Person.class).getResultList());
        data.put("person", pers);
        return data;
    }

    @GET
    @Path("/{id}")
    @Produces(PersonType.APPLICATION_JSON)
    public Person personsGetById(@PathParam("id") int id) {
        return em.find(Person.class, id);
    }

    @POST
    @Consumes(PersonType.APPLICATION_JSON)
    @Produces(PersonType.APPLICATION_JSON)
    @Transactional
    public Person mediasPost(Person person) {
        em.persist(person);
        return person;
    }

}