package utils;

public class MainClass {
        public static void main(String[] args) {
            io.gatling.app.Gatling.main(new String[]{
                    "-s", "smoke.Basic2"
            });
        }
    }