FROM openjdk:17

EXPOSE 8080

ADD backend/target/EventHub.jar EventHub.jar

CMD [ "sh", "-c", "java -jar /EventHub.jar" ]