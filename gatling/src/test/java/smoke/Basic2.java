package smoke;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class BasicSimulation extends Simulation {

    HttpProtocolBuilder httpProtocol =
        http.baseUrl("https://example.com")
            .acceptHeader("application/json");

    ScenarioBuilder scn =
        scenario("Basic Load Test")
            .exec(
                http("GET Home")
                    .get("/")
                    .check(status().is(200))
            );

    {
        setUp(
            scn.injectOpen(
                rampUsers(
                    Integer.getInteger("USUARIOS", 10)
                ).during(
                    Integer.getInteger("RAMP_UP", 10)
                )
            )
        ).protocols(httpProtocol);
    }
}
