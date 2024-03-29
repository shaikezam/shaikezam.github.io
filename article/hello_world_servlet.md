# Servlets Made Easy: A Beginner's Guide with Hello World
*04-03-2024 - Shai Zambrovski*

------------
## What is it Java Servelt?
Java servlets are the foundation of dynamic web applications in Java.

They provide a way to extend the capabilities of web servers and serve dynamic content to users.

It receives and responds to requests from web clients, such as web browsers, and can generate dynamic content like HTML pages or handle form submissions.

In this blog post, we'll introduce servlets and create a simple "Hello World" example to get you started.

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

### What is it `Jetty`
[Jetty](https://eclipse.dev/jetty/ "Jetty") is a lightweight, open-source web server and servlet container written in Java.

Jetty has a long history and is one of the oldest Java servlet containers still in active development.

Over the years, Jetty has evolved into a versatile and highly performant web server that is used in a wide range of applications, from small embedded devices to large-scale web applications.

One of the key features of Jetty is its embeddable nature, which allows it to be easily integrated into Java applications.

This makes Jetty a popular choice for developers who want to build lightweight and modular web applications.

Jetty also has a strong focus on performance and scalability, making it suitable for high-traffic websites and applications.

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
3. `jakarta.servlet-api` for the Jakarta Servlet API. The `<scope>provided</scope>` indicates that this dependency is provided by the servlet container (`Jetty`) at runtime.
4. slf4j-nop for the SLF4J NOP logger implementation (we will use the old JUL by the JDK).

We will use the Maven Assembly Plugin (`maven-assembly-plugin`) to create a standalone JAR file with dependencies included.

The `<configuration>` section specifies the main class (io.shaikezam.App) that should be executed when the JAR file is run.

### Creating the Servlet
Next, we'll create a simple http servlet that responds with a relevant message for each http method in which handles HTTP GET, POST, PUT, and DELETE requests.

Overall, this servlet provides a simple way to handle different types of HTTP requests and respond with a message confirming the request was received.

```java
package io.shaikezam.servlet;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.logging.Logger;

public class SimpleServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(SimpleServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        LOGGER.info("Received GET request");
        resp.getWriter().println("Hello, GET request received");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        LOGGER.info("Received POST request");
        resp.getWriter().println("Hello, POST request received");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        LOGGER.info("Received PUT request");
        resp.getWriter().println("Hello, PUT request received");
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        LOGGER.info("Received DELETE request");
        resp.getWriter().println("Hello, DELETE request received");
    }
}

```

### Add filter to intercept the http servelt requests

In Java servlets, filters play a crucial role in intercepting and processing incoming requests before they reach the servlet.

Filters provide a way to perform common pre-processing and post-processing tasks, such as authentication, logging, data transformation, and request validation, without modifying the servlet code.

This allows for modular and reusable code that can be applied to multiple servlets or web applications.

We'll explore how to enhance a servlet application by adding two filters:
#### AuthenticatingFilter for authentication.
The AuthenticatingFilter checks if a specific cookie, sessionId, is present in the incoming request.

If the cookie is not found, the filter responds with a 401 Unauthorized status code and a message indicating that the user is not authorized.

This filter adds a layer of security to the servlet application by ensuring that only authenticated users can access certain endpoints.

```java
package io.shaikezam.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.logging.Logger;

public class AuthenticatingFilter implements Filter {

    private static final Logger LOGGER = Logger.getLogger(AuthenticatingFilter.class.getName());

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        // Check if the sessionId cookie is present
        Cookie[] cookies = request.getCookies();
        boolean sessionIdCookiePresent = false;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("sessionId".equals(cookie.getName())) {
                    sessionIdCookiePresent = true;
                    break;
                }
            }
        }
        if (!sessionIdCookiePresent) {
            LOGGER.warning("sessionId cookie not present");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set 401 Unauthorized status code
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized will redirect to login page...");
            return;
        }
        // Log the request details
        LOGGER.info("Request from " + request.getRemoteAddr() + " authorized");

        filterChain.doFilter(servletRequest, servletResponse);
    }
}

```

#### RequestSizeLimitFilter for limiting the size of incoming requests.
The RequestSizeLimitFilter limits the size of incoming requests to prevent potential denial-of-service (DoS) attacks or excessive resource consumption.

It checks the content length of the request and if it exceeds a predefined limit (1KB in this case), it responds with a 413 Request Entity Too Large status code.

This filter helps in maintaining the performance and stability of the servlet application by rejecting overly large requests.

```java
package io.shaikezam.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.logging.Logger;

public class RequestSizeLimitFilter implements Filter {

    private static final Logger LOGGER = Logger.getLogger(RequestSizeLimitFilter.class.getName());
    private static final int MAX_REQUEST_SIZE = 1024; // 1KB

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        if (request.getContentLength() > MAX_REQUEST_SIZE) {
            LOGGER.warning("Request size exceeds limit");
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.sendError(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE, "Request entity too large");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}

```

Both filters demonstrate how servlet filters can be used to enhance the functionality and security of a servlet application.

By adding these filters to your servlet application, you can improve its overall robustness and reliability.

### Wrap it all together using the embedded Jetty server
Finally, we'll configure Jetty to use our servlet and start the server.

First, we create a `ServletContextHandler` to manage servlets and filters.

We set the context path to `/` to handle all requests to the server. Then, we add the two filters we mentioned above: `AuthenticatingFilter` and `RequestSizeLimitFilter`.

Both filters are mapped to `/*`, indicating that they will apply to all requests.

In Jetty embedded, the order of filters is determined by the order in which they are added to the `ServletContextHandler`.

Filters are added using the `addFilter` method, and their order is specified by the order in which they are added to the `FilterHolder` list.

Next, we add a servlet, SimpleServlet, using a `ServletHolder`, and map it to `/my-servlet/*`.
This servlet will handle requests under this path.

`AuthenticatingFilter` will be executed before `RequestSizeLimitFilter` for requests matching the specified path pattern.

This order is important, as it determines the sequence in which filters are applied to incoming requests.

Moving on, we create a Server instance (on port 8000) and set its handler to the `ServletContextHandler` we configured earlier.

We start the server, and if successful, log a message indicating that the server has started.

Finally, we call server.join() to keep the server running until it is explicitly stopped.

```java
package io.shaikezam;

import io.shaikezam.filter.AuthenticatingFilter;
import io.shaikezam.filter.RequestSizeLimitFilter;
import io.shaikezam.servlet.SimpleServlet;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import java.util.logging.Logger;

public class App {

    private static final Logger LOGGER = Logger.getLogger(App.class.getName());

    public static void main(String[] args) throws Exception {
        ServletContextHandler context = new ServletContextHandler();
        context.setContextPath("/");
        context.addFilter(AuthenticatingFilter.class, "/*", null);
        context.addFilter(RequestSizeLimitFilter.class, "/*", null);
        context.addServlet(new ServletHolder(new SimpleServlet()), "/my-servlet/*");

        Server server = new Server(8000);
        server.setHandler(context);
        server.start();
        LOGGER.info("Start server at port 8000");
        server.join();
    }
}

```

### Run the demo

After all, in the root of the project, le'ts execute `mvn clean install` to build the executable jar

Then, we can nevigate to the `target` folder and execute `java -jar servlet-1.0-SNAPSHOT-jar-with-dependencies.jar` to run our server; we will get a log message:

`INFO: Start server at port 8000` indicated that our server is up and running on port 8000.

Let's execute `curl -i -X POST http://localhost:8000/my-servlet/`, we will get `Error 401 Unauthorized will redirect to login page...` as the filter did, no `sessionId` cookie exists.

Now, let's create a 2KB data for large payload `data=$(printf "%02048d" 0)`, but execute request with dummy session cookie: `curl -i -X POST http://localhost:8000/my-servlet/ -d "$data" -H "Cookie: sessionId=dummy"`, we will get `Error 413 Request entity too large`

Finally, we will create a successfuly request: `curl -i -X GET http://localhost:8000/my-servlet/ -H "Cookie: sessionId=dummy"` and we get `200 OK` with resposne body `Hello, GET request received`

The above demo can be run after you clone my [repository](https://github.com/shaikezam/Embedded-jetty-simple-servelt "repository").
