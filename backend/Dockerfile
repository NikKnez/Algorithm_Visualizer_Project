FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY target/AlgorithmVisualizer-0.0.1-SNAPSHOT.jar AlgorithmVisualizer.jar
ENTRYPOINT ["java","-jar","/AlgorithmVisualizer.jar"]
EXPOSE 8080