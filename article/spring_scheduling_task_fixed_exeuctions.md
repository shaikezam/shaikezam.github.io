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

A wrapper class is a class that contains and manages another class or object, often providing additional functionality or abstraction.

In the context of scheduling tasks with a fixed number of executions, a wrapper class can encapsulate a `ScheduledFuture<?>` and a `TaskScheduler`.

The `FixedExecutionTaskWrapper` class will implements the `ISchedulerWrapper` interface, which includes the `cancelSchedulerTask()` and `startSchedulerTask(long delay)` methods. 

These methods provide control over canceling and starting the scheduler task with a specified delay.

This wrapper class can implement the `Runnable` interface to achieve the desired behavior. Let's create a simple example:

#### ISchedulerWrapper

```java
public interface ISchedulerWrapper {
    void startSchedulerTask(long delay);
    void cancelSchedulerTask();
}
```

#### FixedExecutionTaskWrapper:

```java
@RequiredArgsConstructor
public class FixedExecutionTaskWrapper implements ISchedulerWrapper, Runnable {

    private static final Logger logger = Logger.getLogger(FixedExecutionTaskWrapper.class.getName());

    private ScheduledFuture<?> scheduledFuture;
    private int currentCounter;

    private final TaskScheduler taskScheduler;
    private final int maxRetries;

    @Override
    public void startSchedulerTask(long delay) {
        logger.info("Register scheduler task");
        this.scheduledFuture = taskScheduler.scheduleWithFixedDelay(
                this,
                delay
        );

    }

    @Override
    public void cancelSchedulerTask() {
        logger.info("Cancel scheduler task");
        if (this.scheduledFuture != null) {
            this.scheduledFuture.cancel(true);
            this.scheduledFuture = null;
        }

    }

    @Override
    public void run() {
        if (currentCounter < maxRetries) {
            logger.info("iteration " + currentCounter + " out from " + maxRetries);
            // do you logic ...
        } else {
            this.cancelSchedulerTask();

            return;
        }
        currentCounter++;
    }
}
```

The `FixedExecutionTaskWrapper` class is designed to manage a scheduled task with a fixed number of iterations or retries.

It implements the `ISchedulerWrapper` interface and the `Runnable` interface.

The class uses a `TaskScheduler` for scheduling tasks and allows the task to be started with a specified delay through the `startSchedulerTask` method.

The `run` method is executed on each iteration, logging information about the current iteration count and canceling the scheduled task if the maximum number of retries (`maxRetries`) is reached.

The `cancelSchedulerTask` method is provided to manually cancel the scheduled task.

This wrapper class provides a way to control the number of iterations for a scheduled task by encapsulating the original `ScheduledFuture<?>` and `TaskScheduler` instances.

It demonstrates a dynamic approach to scheduling tasks with a fixed number of executions.

#### SchedulerConfiguration

```java
@Configuration
public class SchedulerConfiguration {

    @Value("${scheduler.task.max.retries:6}")
    private int schedulerTaskMaxRetries;

    @Bean
    public TaskScheduler schedulerTaskScheduler() {
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setPoolSize(1); // Set the number of threads in the pool
        taskScheduler.setThreadNamePrefix("scheduler-task-");
        taskScheduler.setAwaitTerminationSeconds(60); // Set the time to wait for scheduled tasks to finish
        taskScheduler.setWaitForTasksToCompleteOnShutdown(true);

        return taskScheduler;
    }

    @Bean
    ISchedulerWrapper FixedExecutionTaskWrapper(TaskScheduler schedulerTaskScheduler) {

        return new FixedExecutionTaskWrapper(schedulerTaskScheduler, schedulerTaskMaxRetries);
    }

}
```

The `SchedulerConfiguration` class is a Spring configuration class responsible for defining and configuring beans related to task scheduling. 

It reads a property `scheduler.task.max.retries` with a default value of 6. It creates a `TaskScheduler` bean using `ThreadPoolTaskScheduler` and sets properties such as pool size and thread prefix for task execution.

Additionally, it defines a bean of type `ISchedulerWrapper` named `FixedExecutionTaskWrapper`, injecting the configured `TaskScheduler` and the maximum number of retries into the `FixedExecutionTaskWrapper` constructor. 

This configuration class centralizes the setup for scheduling tasks and provides a flexible way to manage scheduled tasks with a specified maximum retry count.

#### The entry point

```java
public class Main {

    public static void main(String[] args) {
        Supplier<String> text = Main::getText;

        System.out.println(text.get());
    }

    public static String getText() {
        return "Hello shaikezam.com";
    }

}
```


In the last part of our demonstration, the `Application` class serves as the entry point for the Spring Boot application.

It implements `CommandLineRunner` (Spring Boot interface that provides a convenient way to execute code after the application context is fully initialized, allowing the execution of custom logic or tasks on application startup), and upon startup, it logs an info message confirming the application's start.

The class injects an `ISchedulerWrapper` bean and starts a scheduled task with a specified delay (defaulting to 1000 milliseconds) using the injected scheduler wrapper.