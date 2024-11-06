package com.example.weatherappii1.back;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
@RestController
@RequestMapping("/api")
public class Region {

    private final String API_KEY = "7f8cd0e5f37e7c84ebda7806217724fe";  // Your actual API key

    @Autowired
    private WeatherRepository weatherRepository;

    @GetMapping("/weather")
    public Map<String, Object> getWeather(@RequestParam String cities) {
        String[] cityArray = cities.split(",");
        Map<String, Object> allWeatherData = new HashMap<>();

        for (String city : cityArray) {
            String url = String.format("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric", city.trim(), API_KEY);
            RestTemplate restTemplate = new RestTemplate();
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);

            // Log the API response for debugging
            System.out.println("API Response for " + city + ": " + response);

            if (response != null && response.containsKey("main")) {
                @SuppressWarnings("unchecked")
                Map<String, Object> mainData = (Map<String, Object>) response.get("main");
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
                String description = weatherList.get(0).get("description").toString();
                double temperature = Double.parseDouble(mainData.get("temp").toString());

                // Save the weather data to the database
                WeatherData weatherData = new WeatherData(null, temperature, description);
                WeatherData savedData = weatherRepository.save(weatherData);

                // Log saved data
                System.out.println("Saved Weather Data for " + city + ": " + savedData);
                allWeatherData.put(city.trim(), response); // Store the API response for each city
            }
        }

        return allWeatherData; // Return the aggregated response
    }
}
