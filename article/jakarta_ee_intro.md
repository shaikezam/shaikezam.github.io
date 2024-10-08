# Mastering the Basics: A Guide to Jakarta EE
*15-08-2024 - Shai Zambrovski*

------------
## Introduction
In this blog, we'll dive into the essentials of Jakarta EE, the powerful platform for building enterprise Java applications.

We'll start with a brief history of Jakarta EE, exploring its evolution from Java EE and how it differs from other popular frameworks like Spring and Quarkus.

You’ll learn about the various Jakarta EE implementations available today, each offering unique features and benefits.

As we progress, we'll cover the basics of key Jakarta EE technologies such as CDI (Contexts and Dependency Injection), JPA (Java Persistence API), JMS (Java Message Service), and JAX-RS (Java API for RESTful Web Services).

## What is it Jakarta EE?
Jakarta EE is a robust, scalable platform for building enterprise-level applications in Java.

It extends the core Java SE capabilities with a comprehensive set of APIs and services designed to simplify the development of large-scale, distributed applications, including web services, microservices, and cloud-native applications.

Jakarta EE is essential for Java developers because it provides standardized, proven solutions for complex tasks such as transaction management, security, and persistence, allowing developers to focus on business logic rather than low-level infrastructure.

## Jakrata EE timeline
### From Java SE to J2EE
- Java SE: Launched in 1995 by Sun Microsystems, Java SE provided the core libraries for general-purpose programming.
- J2EE: Introduced in 1999, J2EE extended Java SE for building large-scale, enterprise applications, offering APIs like Servlets, JSP, and EJB.
### Evolution to Java EE
- Java EE 5 (2006): Simplified enterprise development with annotations and POJOs, introducing JPA for object-relational mapping.
- Java EE 6 (2009): Added CDI for dependency injection and JAX-RS for RESTful services.
- Java EE 7 (2013): Focused on modern web development, including support for HTML5 and WebSockets.
### Transition to Jakarta EE
- Java EE 8 (2017): The last version by Oracle, focusing on cloud compatibility.
- Jakarta EE (2018): After Oracle transferred Java EE to the Eclipse Foundation, the platform was renamed Jakarta EE, starting with Jakarta EE 8.
### Modern Jakarta EE
- Jakarta EE 9 (2020): Focused on transitioning the namespace from javax.* to jakarta.*.
- Jakarta EE 10 (2022): Introduced new features and improvements for modern enterprise applications.

## Jakarta EE vs. Spring
- Jakarta EE: A standardized, community-driven platform for enterprise Java, providing a comprehensive set of APIs for building large-scale applications. It focuses on consistency and compatibility across different implementations, making it ideal for enterprises needing robust, scalable solutions with vendor neutrality.

- Spring: A flexible, non-standardized framework offering a more modular and developer-friendly approach. It provides a wide range of tools and extensions, allowing for faster development and easier integration with other technologies. Spring is often preferred for its simplicity, ease of use, and support for modern practices like microservices and cloud-native development.

In essence, Jakarta EE is about standardization and enterprise-level consistency, while Spring emphasizes flexibility and rapid development.

Both are powerful, but the choice depends on project needs and developer preferences.

## JAX-RS (Java API for RESTful Web Services)
JAX-RS (Java API for RESTful Web Services) is a Java API and a standard specification designed to simplify the development of web services that follow the REST architectural style.

It provides annotations to map Java classes and methods to web resources, allowing developers to easily expose RESTful endpoints.

JAX-RS supports common HTTP methods like GET, POST, PUT, DELETE, and makes it straightforward to consume and produce various data formats, such as JSON and XML.

It's popular implementations include [Jersey](https://eclipse-ee4j.github.io/jersey/ "Jersey") and [RESTEasy](https://resteasy.dev/ "RESTEasy").

### Differences between JAX-RS and Java Servlets
- JAX-RS is a framework that simplifies the development of RESTful web services by using annotations to map HTTP requests to resource methods, focusing on REST principles.

- In contrast, Java Servlets offer a more granular, low-level approach to handling HTTP requests and responses, requiring manual management of routing, request processing, and response generation.

### Difference between JAX-RS `Resource` and Spring `Controller`
Spring Controller is part of the Spring MVC framework, designed for building web applications with extensive features and tight integration into the Spring ecosystem, using annotations like `@RestController` and `@RequestMapping`.

JAX-RS Resource is a Jakarta EE component focused on creating RESTful web services with a simpler, resource-oriented approach, using annotations like `@Path`, `@GET`, and `@Produces`. While Spring Controller offers broader web capabilities, JAX-RS Resource is more specialized for RESTful interactions.

### Simple JAX RS Resource
```java
import jakarta.ws.rs.*; // Import JAX-RS annotations and classes
import jakarta.ws.rs.core.MediaType; // Import MediaType for specifying content types
import jakarta.ws.rs.core.Response; // Import Response class for creating HTTP responses

@Path("/items") // Define the base URI path for this resource
public class ItemResource {

    @GET // Handle HTTP GET requests
    @Produces(MediaType.APPLICATION_JSON) // Specify that this method produces JSON responses
    public Response getItems(@QueryParam("type") String type) { // Accept a query parameter 'type' from the URL
        return Response.ok(/* JSON response */).build(); // Return a 200 OK response with JSON content
    }

    @GET // Handle HTTP GET requests
    @Path("/{id}") // Append /{id} to the base URI, making this method accessible at /items/{id}
    @Produces(MediaType.APPLICATION_XML) // Specify that this method produces XML responses
    public Response getItemById(@PathParam("id") String id) { // Accept a path parameter 'id' from the URL
        return Response.ok(/* XML response */).build(); // Return a 200 OK response with XML content
    }

    @GET // Handle HTTP GET requests
    @Path("/all") // Append /all to the base URI, making this method accessible at /items/all
    @Produces(MediaType.APPLICATION_JSON) // Specify that this method produces JSON responses
    public Response getAllItems() { // No parameters, returns all items
        return Response.ok(/* JSON array response */).build(); // Return a 200 OK response with a JSON array
    }

    @POST // Handle HTTP POST requests
    @Consumes(MediaType.APPLICATION_JSON) // Specify that this method consumes JSON request bodies
    @Produces(MediaType.APPLICATION_JSON) // Specify that this method produces JSON responses
    public Response createItem(String jsonBody) { // Accept a JSON string as the request body
        return Response.status(Response.Status.CREATED).entity(/* JSON response */).build(); // Return a 201 Created response with JSON content
    }

    @PUT // Handle HTTP PUT requests
    @Path("/{id}") // Append /{id} to the base URI, making this method accessible at /items/{id}
    @Consumes(MediaType.APPLICATION_XML) // Specify that this method consumes XML request bodies
    @Produces(MediaType.APPLICATION_XML) // Specify that this method produces XML responses
    public Response updateItem(@PathParam("id") String id, String xmlBody) { // Accept a path parameter 'id' and an XML string as the request body
        return Response.ok(/* Updated XML response */).build(); // Return a 200 OK response with updated XML content
    }

    @DELETE // Handle HTTP DELETE requests
    @Path("/{id}") // Append /{id} to the base URI, making this method accessible at /items/{id}
    @Produces(MediaType.TEXT_PLAIN) // Specify that this method produces plain text responses
    public Response deleteItem(@PathParam("id") String id) { // Accept a path parameter 'id' from the URL
        return Response.ok("Item with ID " + id + " deleted successfully").build(); // Return a 200 OK response with a plain text message
    }
}
```

## JPA (Java Persistence API)
Java Persistence API (JPA) is a standard specification in Java for managing relational data in enterprise applications using object-relational mapping (ORM).

It abstracts the database interactions, allowing developers to work with Java objects instead of SQL queries.

Common JPA implementations include Hibernate, EclipseLink, and Apache OpenJPA, each providing additional features and optimizations while adhering to the JPA specification.

- JPA Entity: Represents a Java object that maps to a database table, allowing you to work with database records as Java objects.
- persistence.xml: A configuration file that defines the persistence units in a JPA application. It specifies the database connection details, entity classes, and other JPA settings, serving as the blueprint for how the application interacts with the database. typically located in the META-INF directory within the classpath of a Java application. For a standard Maven project, it is placed in: `src/main/resources/META-INF/persistence.xml`
- EntityManager: The primary interface used for interacting with the persistence context in JPA. It manages the lifecycle of entities, handles CRUD operations, and provides query capabilities to interact with the database.
- EntityManagerFactory: A factory class responsible for creating EntityManager instances. It is a heavyweight object that is typically created once per application and used throughout its lifecycle to manage entity managers.
### Simple example
#### Map RDBMS table to a JPA entity

```sql
CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);
```

```java
import jakarta.persistence.*;

@Entity // Marks this class as a JPA entity, which maps to a database table
@Table(name = "users") // Specifies the name of the table in the database as "users"
public class User {

    @Id // Specifies the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indicates that the ID should be generated automatically by the database
    @Column(name = "id", nullable = false, updatable = false) // Maps this field to the "id" column in the database, making it non-nullable and non-updatable
    private Long id;
    @Column(name = "name", nullable = false, length = 255) // Maps this field to the "name" column, setting it as non-nullable with a maximum length of 255 characters
    private String name;
    @Column(name = "email", nullable = false, unique = true, length = 255) // Maps this field to the "email" column, making it non-nullable, unique, and with a maximum length of 255 characters
    private String email;

}
```

#### `persistence.xml` file with CRUD operations

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="https://jakarta.ee/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence https://jakarta.ee/xml/ns/persistence/persistence_3_0.xsd"
             version="3.0">

    <persistence-unit name="my-persistence-unit">
        <class>User</class> <!-- Specifies the entity class that should be managed by this persistence unit -->

        <!-- Database connection settings -->
        <properties>
            <property name="jakarta.persistence.jdbc.url" value="jdbc:mariadb://localhost:3306/your_database"/> <!-- JDBC URL for connecting to the MariaDB database -->
            <property name="jakarta.persistence.jdbc.user" value="your_username"/> <!-- Database username -->
            <property name="jakarta.persistence.jdbc.password" value="your_password"/> <!-- Database password -->
            <property name="jakarta.persistence.jdbc.driver" value="org.mariadb.jdbc.Driver"/> <!-- JDBC driver class for MariaDB -->

            <!-- EclipseLink as the JPA provider -->
            <property name="jakarta.persistence.provider" value="org.eclipse.persistence.jpa.PersistenceProvider"/> <!-- Specifies EclipseLink as the JPA provider -->
            <property name="eclipselink.logging.level" value="INFO"/> <!-- Sets the logging level for EclipseLink -->
            <property name="eclipselink.schema-generation.database.action" value="update"/> <!-- Tells EclipseLink to update the database schema based on entities -->
        </properties>
    </persistence-unit>

</persistence>
```

```java
import jakarta.persistence.*;

public class JpaExample {

    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("my-persistence-unit");
        EntityManager em = emf.createEntityManager();

        // Create
        em.getTransaction().begin();
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john.doe@example.com");
        em.persist(user);
        em.getTransaction().commit();

        // Read
        User foundUser = em.find(User.class, user.getId());
        System.out.println("Found User: " + foundUser.getName());

        // Update
        em.getTransaction().begin();
        foundUser.setEmail("john.doe@newdomain.com");
        em.getTransaction().commit();

        // Delete
        em.getTransaction().begin();
        em.remove(foundUser);
        em.getTransaction().commit();

        em.close();
        emf.close();
    }
}
```

## JMS (Java Message Service)
Java Message Service (JMS) is a Java API and a standard specification that enables asynchronous communication between distributed systems through message-oriented middleware, allowing applications to send, receive, and process messages reliably.

JMS abstracts the underlying messaging systems, such as message queues (MQ) and publish/subscribe models, providing a standard API that can work with various messaging protocols.

Unlike specific messaging systems, which are platform-specific, JMS provides a unified interface, making it easier to switch between different messaging providers without changing the application code.
### JMS Entities
1. **JMS Provider**: A system that implements the JMS interface for message-oriented middleware (MOM), for example `ActiveMQ` or `RabbitMQ`.
2. **JMS Client**: A software application or process that sends or receives messages using the JMS API.
3. **JMS Producer/Publisher**: A type of JMS client responsible for creating and dispatching messages to a destination.
4. **JMS Consumer/Subscriber**: A JMS client that receives and processes messages.
5. **JMS Message**: The data packet exchanged between JMS clients, encapsulated in an object.
6. **JMS Queue**: A holding area where messages are stored until they are consumed by a single recipient, ensuring each message is processed in the order it was sent and only once.
7. **JMS Topic**: A broadcast mechanism that allows messages to be published and delivered to multiple recipients.

### JMS Patterns

#### Point-to-Point (Queue)
In this model, messages are sent to a specific queue. Each message is consumed by only one recipient.
- Producer sends messages to a queue.
- Consumer receives each message from the queue (one consumer per message).
- Ideal For: Task processing, order handling.

#### Publish/Subscribe (Topic)
In this model, messages are sent to a topic, and all subscribers to that topic receive the message.
- Publisher sends messages to a topic.
- Subscribers receive messages from the topic (all subscribers get the message).
- Ideal For: Broadcasting updates, event distribution.

### Example for JMS Producer and JMS Listener (Point-to-Point)
```java
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;
import jakarta.jms.JMSProducer;
import jakarta.jms.Queue;
import org.apache.activemq.ActiveMQConnectionFactory;

/**
 * JMSProducerExample demonstrates how to create a JMS producer
 * that sends a message to a queue using Jakarta JMS 3.1 and ActiveMQ.
 */
public class JMSProducerExample {
    public static void main(String[] args) {
        // Create a ConnectionFactory instance for connecting to ActiveMQ
        ConnectionFactory factory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        // Create a JMSContext, which represents a session with the JMS provider
        try (JMSContext context = factory.createContext()) {
            // Create a Queue destination named "testQueue"
            Queue queue = context.createQueue("testQueue");
            // Create a JMSProducer instance for sending messages
            JMSProducer producer = context.createProducer();
            // Send a text message to the queue
            producer.send(queue, "Hello, Jakarta JMS 3.1!");
            System.out.println("Message sent.");
        }
    }
}
```

```java
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;
import jakarta.jms.JMSConsumer;
import jakarta.jms.Message;
import jakarta.jms.MessageListener;
import jakarta.jms.Queue;
import org.apache.activemq.ActiveMQConnectionFactory;

/**
 * JMSListenerExample demonstrates how to create a JMS consumer
 * that listens for messages from a queue using Jakarta JMS 3.1 and ActiveMQ.
 */
public class JMSListenerExample implements MessageListener {

    public static void main(String[] args) {
        // Create a ConnectionFactory instance for connecting to ActiveMQ
        ConnectionFactory factory = new ActiveMQConnectionFactory("tcp://localhost:61616");
        // Create a JMSContext, which represents a session with the JMS provider
        try (JMSContext context = factory.createContext()) {
            // Create a Queue destination named "testQueue"
            Queue queue = context.createQueue("testQueue");
            // Create a JMSConsumer instance for receiving messages from the queue
            JMSConsumer consumer = context.createConsumer(queue);
            // Set this class as the message listener for the consumer
            consumer.setMessageListener(new JMSListenerExample());
            System.out.println("Listener started. Waiting for messages...");
            // Keep the listener alive for 10 seconds to receive messages
            Thread.sleep(10000); // Keep the listener alive for 10 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessage(Message message) {
        try {
            // Extract and print the message body
            String body = message.getBody(String.class);
            System.out.println("Received message: " + body);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## CDI (Contexts and Dependency Injection)
Contexts and Dependency Injection (CDI) is a Java API and a standard specification that helps manage how objects in your application interact with each other.

CDI simplifies this process by automatically handling the creation, management, and destruction of objects, allowing developers to focus on the core logic of their applications.

Java CDI (Contexts and Dependency Injection) has several core concepts that are essential to understanding how it works:

- **CDI Container**: The CDI container is the runtime environment that manages CDI beans and their lifecycles. It is responsible for handling dependency injection, managing bean scopes, and coordinating the interactions between beans. The container automatically initializes, injects, and destroys beans as needed, based on the application's configuration and usage.

- **Beans**: In CDI, a bean is any Java object that can be managed by the CDI container. Beans are the main components that get injected into other objects. They can be simple POJOs (Plain Old Java Objects) annotated with CDI-specific annotations like `@Inject`, `@Named`, `@ApplicationScoped`, etc.

- **Dependency Injection (DI)**: DI is a design pattern where an object's dependencies are provided by an external entity rather than being created by the object itself. In CDI, the container automatically injects the required beans into your objects, reducing the need for manual object creation.

- **Scopes**: Scopes define the lifecycle of beans, determining how long they live and in what context they are shared. Common scopes include `@RequestScoped` (beans live for a single HTTP request), `@SessionScoped` (beans live for a user session), and `@ApplicationScoped` (beans live for the entire application's lifetime).

- **Interceptors**: Interceptors allow you to add cross-cutting concerns (like logging, security, or transaction management) to your beans. They are methods that wrap around the business logic and can be applied using annotations like @AroundInvoke (Similar to `AspectJ`).

- **Producers**: Sometimes, a bean cannot be created automatically by the CDI container due to complex initialization requirements. Producers, annotated with `@Produces`, allow you to create and configure such beans manually before they are injected.

- **Events**: CDI supports a publish-subscribe model where beans can fire events and others can observe and react to those events. This is done using `@Observes` to listen for events and `@Inject` Event to fire them.

## Demo
This Jakarta project demo is designed to showcase a microservices architecture, using Docker Compose to orchestrate multiple services.

The project consists of multiple services, each encapsulated in its own Docker container, interconnected through a shared network (app-network).

- **UI Service** (ui-service): This service handles the user interface of the application, built with Alpine.js and running on Node.js with Express. Responsible for presenting data from the backend services to the user.

- **Order Service** (order-service): This backend service manages orders. It connects to a MariaDB database (db-service) and interacts with a messaging service for asynchronous communication.

- **Product Service** (product-service): Similar to the order service, the product service handles product-related data. It also relies on the db-service for persistence and the messaging service for communication.

- **Messaging Service** (messaging-service): This service provides a message broker, using classic ActiveMQ, to facilitate communication between different services. It's essential for handling asynchronous tasks such as processing orders and updating inventory.

- **Nginx Service** (nginx-service): This service acts as a reverse proxy, routing incoming HTTP requests to the appropriate backend services. It exposes port 8080 to the host, making the application accessible to users.

- **Database Service** (db-service): The database service is a MariaDB instance that stores data for the order and product services.

- **phpMyAdmin** (phpmyadmin): This service provides a web interface for managing the MariaDB database. It connects to the db-service and is exposed on port 8004, allowing developers to interact with the database easily.

This demo demonstrates a typical Jakarta microservices architecture, showcasing how different components can work together in a containerized environment.

![](https://shaikezam.com/style/jakarta_hld.png)

### Project Structure

├── messaging-service/

├── nginx-service/

├── order-service/

├── product-service/

├── db-service/

├── ui-service/

├── utils/

├── build.sh

├── pom.xml

├── docker-compose.yml

├── .env

└──uninstall.sh

#### `pom.xml file`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>io.shaikezam</groupId>
    <artifactId>jakarta-system-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <maven-assembly-plugin.version>3.6.0</maven-assembly-plugin.version>
        <maven-compiler-plugin.version>3.13.0</maven-compiler-plugin.version>
        <jetty.version>12.0.12</jetty.version>
        <jakarta.servlet-api.version>6.1.0</jakarta.servlet-api.version>
        <jakarta.enterprise.cdi-api.version>4.0.1</jakarta.enterprise.cdi-api.version>
        <jersey.version>3.1.8</jersey.version>
        <jackson.version>2.17.0</jackson.version>
        <jakarta.ws.rs-api.version>3.1.0</jakarta.ws.rs-api.version>
        <eclipselink.version>4.0.4</eclipselink.version>
        <mariadb-java-client.version>3.3.3</mariadb-java-client.version>
        <jakarta.persistence-api.version>3.1.0</jakarta.persistence-api.version>
        <activemq-client.version>6.0.1</activemq-client.version>
        <jakarta.jms-api.version>3.1.0</jakarta.jms-api.version>
        <lombok.version>1.18.30</lombok.version>
        <flyway-core.version>8.0.5</flyway-core.version>
        <mapstruct.version>1.5.5.Final</mapstruct.version>
        <lombok-mapstruct-binding.version>0.2.0</lombok-mapstruct-binding.version>
        <caffeine.version>3.1.8</caffeine.version>
    </properties>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.glassfish.jersey.containers</groupId>
                <artifactId>jersey-container-servlet-core</artifactId>
                <version>${jersey.version}</version>
            </dependency>
            <dependency>
                <groupId>org.glassfish.jersey.inject</groupId>
                <artifactId>jersey-cdi2-se</artifactId>
                <version>${jersey.version}</version>
            </dependency>
            <dependency>
                <groupId>org.glassfish.jersey.media</groupId>
                <artifactId>jersey-media-json-jackson</artifactId>
                <version>${jersey.version}</version>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.datatype</groupId>
                <artifactId>jackson-datatype-jsr310</artifactId>
                <version>${jackson.version}</version>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>${jackson.version}</version>
            </dependency>
            <dependency>
                <groupId>org.eclipse.jetty</groupId>
                <artifactId>jetty-server</artifactId>
                <version>${jetty.version}</version>
            </dependency>
            <dependency>
                <groupId>org.eclipse.jetty.ee10</groupId> <!-- https://github.com/jetty/jetty.project/issues/10485 -->
                <artifactId>jetty-ee10-servlet</artifactId>
                <version>${jetty.version}</version>
            </dependency>
            <dependency>
                <groupId>jakarta.enterprise</groupId>
                <artifactId>jakarta.enterprise.cdi-api</artifactId>
                <version>${jakarta.enterprise.cdi-api.version}</version>
            </dependency>
            <dependency>
                <groupId>jakarta.ws.rs</groupId>
                <artifactId>jakarta.ws.rs-api</artifactId>
                <version>${jakarta.ws.rs-api.version}</version>
            </dependency>
            <dependency>
                <groupId>jakarta.servlet</groupId>
                <artifactId>jakarta.servlet-api</artifactId>
                <version>${jakarta.servlet-api.version}</version>
            </dependency>
            <dependency>
                <groupId>jakarta.persistence</groupId>
                <artifactId>jakarta.persistence-api</artifactId>
                <version>${jakarta.persistence-api.version}</version>
            </dependency>
            <dependency>
                <groupId>org.eclipse.persistence</groupId>
                <artifactId>eclipselink</artifactId>
                <version>${eclipselink.version}</version>
            </dependency>
            <dependency>
                <groupId>org.eclipse.persistence</groupId>
                <artifactId>org.eclipse.persistence.jpa</artifactId>
                <version>${eclipselink.version}</version>
            </dependency>
            <dependency>
                <groupId>org.mariadb.jdbc</groupId>
                <artifactId>mariadb-java-client</artifactId>
                <version>${mariadb-java-client.version}</version>
            </dependency>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.flywaydb</groupId>
                <artifactId>flyway-core</artifactId>
                <version>${flyway-core.version}</version>
            </dependency>
            <dependency>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct</artifactId>
                <version>${mapstruct.version}</version>
            </dependency>
            <dependency>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>{mapstruct.version}</version>
            </dependency>
            <dependency>
                <groupId>org.apache.activemq</groupId>
                <artifactId>activemq-client</artifactId>
                <version>${activemq-client.version}</version>
            </dependency>
            <dependency>
                <groupId>jakarta.jms</groupId>
                <artifactId>jakarta.jms-api</artifactId>
                <version>${jakarta.jms-api.version}</version>
            </dependency>
            <dependency>
                <groupId>com.github.ben-manes.caffeine</groupId>
                <artifactId>caffeine</artifactId>
                <version>${caffeine.version}</version>
            </dependency>
            <dependency>
                <groupId>io.shaikezam</groupId>
                <artifactId>utils</artifactId>
                <version>${project.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <modules>
        <module>product-service</module>
        <module>order-service</module>
        <module>utils</module>
    </modules>
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-assembly-plugin</artifactId>
                    <version>${maven-assembly-plugin.version}</version>
                    <executions>
                        <execution>
                            <phase>package</phase>
                            <goals>
                                <goal>single</goal>
                            </goals>
                            <configuration>
                                <appendAssemblyId>false</appendAssemblyId>
                                <archive>
                                    <manifest>
                                        <mainClass>io.shaikezam.WebServer</mainClass>
                                    </manifest>
                                </archive>
                                <descriptorRefs>
                                    <descriptorRef>jar-with-dependencies</descriptorRef>
                                </descriptorRefs>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>${maven-compiler-plugin.version}</version>
                    <configuration>
                        <annotationProcessorPaths>
                            <path>
                                <groupId>org.mapstruct</groupId>
                                <artifactId>mapstruct-processor</artifactId>
                                <version>${mapstruct.version}</version>
                            </path>
                            <path>
                                <groupId>org.projectlombok</groupId>
                                <artifactId>lombok</artifactId>
                                <version>${lombok.version}</version>
                            </path>
                            <path>
                                <groupId>org.projectlombok</groupId>
                                <artifactId>lombok-mapstruct-binding</artifactId>
                                <version>${lombok-mapstruct-binding.version}</version>
                            </path>
                        </annotationProcessorPaths>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>
```

This pom.xml file defines a multi-module Maven project that serves as the parent POM for our demo system.

> A parent POM in Maven is a central configuration file that allows you to manage common settings, dependencies, and plugins for multiple projects (or modules) from one place, promoting consistency and reducing redundancy across those projects. Dependency Management and Plugin Management sections within a parent POM are used to specify versions and configurations for dependencies and plugins, respectively, which can then be inherited or overridden by child projects, ensuring consistency and ease of maintenance.

- **Jersey**: For RESTful services.
- **Jersey CDI2 SE**: Integrates Jersey with Jakarta CDI.
- **Jackson**: For JSON processing.
- **Jetty**: To run as a servlet container.
- **Jakarta APIs**:
    - **Jakarta Servlet API** (jakarta.servlet-api): Defines the standard for handling HTTP requests and responses in Java web applications, enabling the creation of dynamic web content.
    - **Jakarta Enterprise CDI API** (jakarta.enterprise.cdi-api): Defines the standard for dependency injection and lifecycle management of Java beans, promoting loose coupling and modular design.
    - **Jakarta RESTful Web Services API** (jakarta.ws.rs-api): Defines the standard of RESTful web services by providing annotations and interfaces for defining and managing RESTful resources.
    - **Jakarta Persistence API** (jakarta.persistence-api): Defines a standard for object-relational mapping (ORM) in Java, allowing seamless interaction between Java objects and relational databases.
    - **Jakarta JMS API** (jakarta.jms-api): Provides a standard way to handle asynchronous messaging between distributed components in a Java application using message-oriented middleware.
- **EclipseLink**: As the JPA provider.
- **MariaDB**: For database connectivity.
- **Lombok & MapStruct**: For reducing boilerplate code and object mapping.
- **ActiveMQ**: For messaging.
- **Caffeine**: For caching.


The above demo can be run after you clone my [repository](https://github.com/shaikezam/Jakarta-EE-Application "repository").

Once executing build.sh script, which builds and runs Docker containers for a Jakarta EE application, the web application will be accessible through `localhost:8080`, and an uninstall.sh script for stopping and removing containers and images.
