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

In essence, Jakarta EE is about standardization and enterprise-level consistency, while Spring emphasizes flexibility and rapid development. Both are powerful, but the choice depends on project needs and developer preferences.



The above demo can be run after you clone my [repository](https://github.com/shaikezam/Jakarta-EE-Application "repository").
