package smoke;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import java.time.Duration;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class Basic2 extends Simulation {
    HttpProtocolBuilder httpProtocol =
        http.baseUrl("https://jsonplaceholder.typicode.com")
            .acceptHeader("application/json");

    ScenarioBuilder scn =
        scenario("Basic Load Test")
            .exec(
                http("GET Post 1")
                    .get("/posts/1")
                    .check(status().is(200))
            );

    {
        int usuarios = Integer.getInteger("USUARIOS", 5);
        int rampUp   = Integer.getInteger("RAMP_UP", 10);

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

