## Spring Scheduling Task with fixed number of executions

_25-01-2024- Shai Zambrovski_

---

In a typical Spring application, scheduling tasks is a powerful feature to automate recurring processes.

However, there are scenarios where developers might seek to limit the number of executions for a scheduled task, a feature not directly supported by Spring's APIs.

The motivation behind such a limitation could stem from specific use cases where the task's execution should be restricted to a fixed number of occurrences. 

For instance, in scenarios where resource constraints or business requirements dictate that a particular process should only run a predetermined number of times.

While Spring provides robust support for task scheduling, it encourages developers to implement custom logic within the scheduled method to control the number of executions programmatically.

This approach ensures flexibility and allows developers to tailor the scheduling behavior according to the unique requirements of their applications.

## Wrapper Class

A wrapper class is a class that contains and manages another class or object, often providing additional functionality or abstraction

In the context of scheduling tasks with a fixed number of executions, a wrapper class can encapsulate a `ScheduledFuture<?>` and a `TaskScheduler`.

The `FixedExecutionTaskWrapper` class will implements the `ISchedulerWrapper` interface, which includes the cancelSchedulerTask() and `startSchedulerTask(long delay)` methods. 

These methods provide control over canceling and starting the scheduler task with a specified delay.

This wrapper class can implement the `Runnable` interface to achieve the desired behavior. Let's create a simple example:

This wrapper class provides a way to control the number of executions for a scheduled task by encapsulating the original `ScheduledFuture<?>` and `TaskScheduler` instances.

It demonstrates a dynamic approach to scheduling tasks with a fixed number of executions.