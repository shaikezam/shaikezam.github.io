# Step-by-Step Data Integration: Tutorial for Building Robust Star Schema in Data Warehouses
*25-08-2024 - Shai Zambrovski*

------------
## Introduction

In the early days of business data processing, databases were mainly built to manage transactions tied to commercial activities—such as making sales, placing orders, or processing payroll.

These transactions were critical to daily operations, with a focus on ensuring fast and reliable updates to the database as these activities took place.

Over time, the term "transaction" became closely associated with any group of database operations that formed a logical unit of work.

As databases evolved to store a wider variety of data—like user interactions, game activities, or social media comments—the fundamental approach remained transactional.

Applications would typically retrieve and update small amounts of data using specific keys, a method known as** online transaction processing (OLTP)**.

However, as businesses increasingly relied on data for decision-making, a new approach to data access emerged.

This approach focused on analyzing large datasets to extract meaningful insights.

Unlike transactional queries, these analytic queries involved scanning extensive records, performing aggregations, and generating statistics to support business strategy.

This shift led to the development of **online analytic processing (OLAP)** systems, which were tailored to handle complex queries over large datasets.

By the late 1980s and early 1990s, it became evident that using the same databases for both OLTP and OLAP was not efficient.

To better support the demands of data analysis, organizations began separating their analytic workloads from transactional systems.

This gave rise to the data warehouse—a specialized database designed to store vast amounts of historical data and facilitate robust data analytics and business intelligence.

## Five key differences between OLTP and OLAP

| **Property**        | **OLTP (Online Transaction Processing)**  | **OLAP (Online Analytical Processing)**      |
|---------------------|-------------------------------------------|----------------------------------------------|
| **Primary Purpose** | Manage day-to-day operations              | Support data analysis and decision-making    |
| **Query Type**      | Short, simple transactions                | Complex queries with aggregations            |
| **Data Volume**     | Smaller, often gigabytes to terabytes     | Large, often terabytes to petabytes          |
| **Data Type**       | Current, real-time data                   | Historical data, often aggregated            |
| **User Type**       | End-users/customers via applications      | Analysts and management for insights         |

The concept of the data warehouse emerged as businesses began to realize that using the same database for both transactional processing (OLTP) and data analytics (OLAP) was not efficient.

Initially, companies used their OLTP databases for both types of operations—managing day-to-day transactions and running analytic queries.

However, this dual use presented challenges, as OLTP systems are optimized for fast, small transactions, while OLAP requires scanning and aggregating large volumes of data.

As the need for in-depth analysis and decision-making grew, it became clear that separating these workloads would improve performance and efficiency.

This led to the creation of dedicated databases for analytics, known as **data warehouses**.

These specialized systems were designed to handle large-scale data aggregation and analysis, allowing companies to perform complex queries on historical data without impacting the performance of their transactional systems.

Thus, the data warehouse was born out of the need to support robust data analytics separate from the operational demands of OLTP systems.

Data warehouses were developed as separate databases dedicated to analytical tasks.

These warehouses enable analysts to perform extensive queries without interfering with the OLTP systems.

The data warehouse contains a read-only copy of the data from the organization’s various OLTP systems.

This data is either periodically or continuously extracted from the OLTP systems. It is then either transformed into a structure optimized for analysis before being loaded into the data warehouse (**ETL: Extract–Transform–Load**) or loaded directly into the warehouse where transformation occurs afterward (**ELT: Extract–Load–Transform**).

Both methods ensure the data is cleaned and prepared for in-depth analysis.

### ETL (Extract–Transform–Load) vs ELT (Extract–Load–Transform)

- **ETL (Extract, Transform, Load)**: A data integration process where data is extracted from sources, transformed into the required format, and then loaded into a target system.
- **ELT (Extract, Load, Transform)**: A data integration process where data is extracted from sources, loaded directly into a target system, and then transformed within the target system.

<ins>Differences</ins>
- **Order**: ETL transforms before loading; ELT loads before transforming.
- **Processing Location**: ETL uses a staging area; ELT uses the target system.
- **Complexity**: ETL handles complex transformations before loading; ELT relies on the target system for transformations.
- **Performance**: ETL may have bottlenecks in the transformation phase; ELT leverages target system scalability.
- **Flexibility**: ETL is less flexible for changes; ELT allows more on-the-fly transformations.
