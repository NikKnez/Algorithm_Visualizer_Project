package AlgorithmVisualizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
//@ComponentScan({"java.AlgorithmVisualizer"})
public class AlgorithmVisualizerApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(AlgorithmVisualizerApplication.class, args);
	}

}
