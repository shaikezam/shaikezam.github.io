# Servlets Made Easy: A Beginner's Guide with Hello World
*04-03-2024 - Shai Zambrovski*

------------
## What is it Java Servelt?
Java servlets are the foundation of dynamic web applications in Java.

They provide a way to extend the capabilities of web servers and serve dynamic content to users.

In this blog post, we'll introduce servlets and create a simple "Hello World" example to get you started.

A servlet is a Java class that extends the capabilities of a server.

It receives and responds to requests from web clients, such as web browsers, and can generate dynamic content like HTML pages or handle form submissions.

### More detailed
Servlets are the Jakarta EE (formally known as JavaEE or J2EE) standard for developing server-side applications.

Here's a more detailed explanation of how servlets work:

- Server Initialization: When a servlet container (such as Apache Tomcat or Jetty) starts up, it initializes servlets by creating instances of the servlet classes and calling their init() method.
  This method is used for one-time initialization tasks, such as loading configuration files or setting up resources.

- Request Handling: When a client (such as a web browser) sends a request to the server, the servlet container determines which servlet should handle the request based on the URL pattern specified in the servlet mapping.
  The servlet container then creates a HttpServletRequest object to represent the client's request and a HttpServletResponse object to represent the response.

- Servlet Execution: The servlet container calls the servlet's `service()` method, passing the `HttpServletRequest` and `HttpServletResponse` objects as arguments.
  The servlet's `service()` method processes the request and generates a response. The `service()` method is typically implemented to handle different types of HTTP requests (e.g., GET, POST, PUT, DELETE) by delegating to specific methods (e.g., `doGet()`, `doPost()`, `doPut()`, `doDelete()`).

- Response Generation: The servlet generates the response by writing content to the HttpServletResponse object.
  This content can be HTML, XML, JSON, or any other format supported by the client.
  The servlet can also set response headers (e.g., content type, cache control) and cookies as needed.

- Request Cleanup: After the servlet has generated the response, the servlet container calls the destroy() method on the servlet instance to perform any cleanup tasks.
  This method is called only once during the servlet's lifecycle, just before the servlet instance is destroyed.

- Lifecycle Management: Servlet containers manage the lifecycle of servlet instances, creating instances when needed and destroying them when they are no longer needed.
  Servlet containers also handle multithreading, ensuring that servlets can handle multiple requests concurrently.

## Hello world Servelt
In this blog post, we will demonstrate how to create a simple "Hello World" servlet using Jetty embedded in a Maven project.

We will also show how to use servlet filters to intercept and process requests before they reach the servlet.

Jetty is a lightweight servlet container that allows you to run servlets and web applications without the need for a separate server installation.

### Legacy `web.xml` vs Programming API

The traditional approach to configuring servlets and web applications in Jakarta EE is to use the web.xml deployment descriptor.

This XML file contains mappings for servlets, filters, and other web components, as well as configuration settings for the web application.

However, this approach can be cumbersome and verbose, especially for simple applications.

In contrast, using Jetty's programming API allows developers to configure servlets and web applications programmatically, without the need for a web.xml file.

This approach is more flexible and concise, as it allows developers to configure servlets, filters, and other web components directly in Java code.

Additionally, using the programming API allows for easier integration with other Java libraries and frameworks, making it a more modern and flexible approach to developing web applications.

### Setting Up the Project
To get started, we need to set up a Maven project with the necessary dependencies.

Here's a basic pom.xml file that includes the Jetty dependency:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>io.shaikezam</groupId>
    <artifactId>servlet</artifactId>
    <packaging>jar</packaging>
    <properties>
        <jetty.version>11.0.20</jetty.version>
        <jakarta.servlet-api.version>6.0.0</jakarta.servlet-api.version>
        <maven-assembly-plugin.version>3.6.0</maven-assembly-plugin.version>
        <slf4j-nop.version>2.0.12</slf4j-nop.version>
    </properties>
    <version>1.0-SNAPSHOT</version>
    <name>servlet</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-server</artifactId>
            <version>${jetty.version}</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-servlet</artifactId>
            <version>${jetty.version}</version>
        </dependency>
        <dependency>
            <groupId>jakarta.servlet</groupId>
            <artifactId>jakarta.servlet-api</artifactId>
            <version>${jakarta.servlet-api.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-nop</artifactId>
            <version>${slf4j-nop.version}</version>
        </dependency>
    </dependencies>
    <build>
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
                            <archive>
                                <manifest>
                                    <mainClass>io.shaikezam.App</mainClass>
                                </manifest>
                            </archive>
                            <descriptorRefs>
                                <descriptorRef>jar-with-dependencies</descriptorRef>
                            </descriptorRefs>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

Let's lists the dependencies for the project:
1. `jetty-server` from the org.eclipse.jetty group for embedding Jetty server.
2. `jetty-servlet` from the org.eclipse.jetty group for servlet support.
3. `jakarta.servlet-api` for the Jakarta Servlet API. The `<scope>provided</scope>` indicates that this dependency is provided by the servlet container at runtime.
4. slf4j-nop for the SLF4J NOP logger implementation (we will use the old JUL by the JDK).

We will use the Maven Assembly Plugin (`maven-assembly-plugin`) to create a standalone JAR file with dependencies included.

The `<configuration>` section specifies the main class (io.shaikezam.App) that should be executed when the JAR file is run.