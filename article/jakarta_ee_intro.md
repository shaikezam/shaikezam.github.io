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
### JMS entities
1. **JMS Provider**: A system that implements the JMS interface for message-oriented middleware (MOM), either as a native Java JMS implementation or as a bridge to a non-Java MOM system.
2. **JMS Client**: A software application or process that sends or receives messages using the JMS API.
3. **JMS Producer/Publisher**: A type of JMS client responsible for creating and dispatching messages to a destination.
4. **JMS Consumer/Subscriber**: A JMS client that receives and processes messages.
5. **JMS Message**: The data packet exchanged between JMS clients, encapsulated in an object.
6. **JMS Queue**: A holding area where messages are stored until they are consumed by a single recipient, ensuring each message is processed in the order it was sent and only once.
7. **JMS Topic**: A broadcast mechanism that allows messages to be published and delivered to multiple recipients.
## CDI (Contexts and Dependency Injection)
## Demo
![](https://shaikezam.com/style/jakarta_hld.png)


The above demo can be run after you clone my [repository](https://github.com/shaikezam/Jakarta-EE-Application "repository").
