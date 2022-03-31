package moe.yuru.projetappliweb.api;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/helloworld")
public class HelloWorld {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Serializable> helloWold() {
        Map<String, Serializable> map = new HashMap<>();
        map.put("message", "Hello World!");
        return map;
    }

}
