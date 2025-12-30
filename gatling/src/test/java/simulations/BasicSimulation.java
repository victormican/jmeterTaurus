package simulations;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import java.time.Duration;

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
        int usuarios = Integer.getInteger("USUARIOS", 10);
        int rampUp   = Integer.getInteger("RAMP_UP", 30);

        setUp(
            scn.injectOpen(
                rampUsers(usuarios)
                    .during(Duration.ofSeconds(rampUp))
            )
        )
        .protocols(httpProtocol)
        .maxDuration(Duration.ofSeconds(rampUp + 10));
    }
}
