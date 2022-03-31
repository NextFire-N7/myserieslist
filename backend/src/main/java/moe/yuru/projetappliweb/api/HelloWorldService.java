package moe.yuru.projetappliweb.api;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/helloworld")
public class HelloWorldService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> helloWorld() {
        Map<String, Serializable> data = new HashMap<>();
        data.put("message", "Hello World!");
        return data;
    }

}
