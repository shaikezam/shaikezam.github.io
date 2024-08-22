# Step-by-Step Data Integration: Tutorial for Building Robust Star Schema in Data Warehouses
*25-08-2024 - Shai Zambrovski*

------------
## Introduction

In the early days of business data processing, databases were mainly built to manage transactions tied to commercial activities—such as making sales, placing orders, or processing payroll. These transactions were critical to daily operations, with a focus on ensuring fast and reliable updates to the database as these activities took place. Over time, the term "transaction" became closely associated with any group of database operations that formed a logical unit of work.

As databases evolved to store a wider variety of data—like user interactions, game activities, or social media comments—the fundamental approach remained transactional. Applications would typically retrieve and update small amounts of data using specific keys, a method known as online transaction processing (OLTP).

However, as businesses increasingly relied on data for decision-making, a new approach to data access emerged. This approach focused on analyzing large datasets to extract meaningful insights. Unlike transactional queries, these analytic queries involved scanning extensive records, performing aggregations, and generating statistics to support business strategy. This shift led to the development of online analytic processing (OLAP) systems, which were tailored to handle complex queries over large datasets.

By the late 1980s and early 1990s, it became evident that using the same databases for both OLTP and OLAP was not efficient. To better support the demands of data analysis, organizations began separating their analytic workloads from transactional systems. This gave rise to the data warehouse—a specialized database designed to store vast amounts of historical data and facilitate robust data analytics and business intelligence.

## Five key differences between OLTP and OLAP
| **Property**        | **OLTP (Online Transaction Processing)**  | **OLAP (Online Analytical Processing)**      |
|---------------------|-------------------------------------------|----------------------------------------------|
| **Primary Purpose** | Manage day-to-day operations              | Support data analysis and decision-making    |
| **Query Type**      | Short, simple transactions                | Complex queries with aggregations            |
| **Data Volume**     | Smaller, often gigabytes to terabytes     | Large, often terabytes to petabytes          |
| **Data Type**       | Current, real-time data                   | Historical data, often aggregated            |
| **User Type**       | End-users/customers via applications      | Analysts and management for insights         |

