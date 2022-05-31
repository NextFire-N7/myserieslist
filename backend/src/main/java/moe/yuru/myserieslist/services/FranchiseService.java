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

import moe.yuru.myserieslist.entities.Franchises;

@Path("/franchises")
public class FranchiseService {

    @PersistenceContext
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Franchises> FranchiseGet() {
        return em.createQuery("FROM Franchises", Franchises.class).getResultList();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Franchises FranchiseGetById(@PathParam("id") int id) {
        return em.find(Franchises.class, id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Franchises FranchisePost(Franchises franchise) {
        em.persist(franchise);
        return franchise;
    }

}
