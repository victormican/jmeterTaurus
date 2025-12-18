from locust import HttpUser, task, between

class ApiUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def health(self):
        with self.client.get("/health", catch_response=True) as response:
            if response.status_code != 200:
                response.failure("Status not 200")
