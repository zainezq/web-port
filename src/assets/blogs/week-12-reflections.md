# Week 12 reflections

By Zaine Qayyum

---

12 out of the 52 weeks are now completed (following the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)), and I guess this blog post will be a little different from the usual *information-centric* posts. 12 weeks having passed from this year means there's only 9 months left of 2025, and i've come to realise that time is moving *quick*. The question then arose, "how can I maximise the time that I have?", the answer to which isn't as simple as one may think. Albeit this, let's take a look at one particularly useful equation that may serve as a guide to modelling the value of time:

## Value of Time

$$
V_t = \frac{O}{T}
$$

Where $V_t$ is the value of time at time $t$, $O$ is the output/impact of an activity, and $T$ is the amount of time that you have available. In order to maximise the $V_t$, one must either increase $T$ or decrease $O$. Essentially what this means is that we need to either increase the output and/or decrease the amount of time spent.


Take for example the following scenario:
Let's say our $T$ is 12 hours, and we have a task that requires 8 hours to complete. This task has a $O$ of 2. In this scenario, the value of this task is:

$$
V_t = \frac{2}{8} = \frac{1}{4} = 0.25
$$

Now let's say we have a task that requires 4 hours to complete. This task has a $O$ of 3. In this scenario, the value of this task is:

$$
V_t = \frac{3}{4} = 0.75
$$

What this shows us is that in the first example, the value of $V_t$ is $0.25$, which is less than the value of the second example, $0.75$. This means that the second example is worth more to us than the first.

This is a very simple example, but it shows us that it is important to maximise $V_t$ by either increasing $T$ or decreasing $O$.

## Exponential Time Decay (Forgetting Curve)

In addition to understanding the value of time, it's also important to use this time to learn new things or reinforce existing knowledge. This is where the **exponential time decay** comes in.

A well-known concept in learning and memory retention is the **Forgetting Curve** [^1], which models how information is lost over time when there is no attempt to retain it. This can be described mathematically as:

$$
R = e^{-t/S}
$$
Where:
- $ R $ is the retrievability of the information.
- $ S $ is the stability of the memory.
- $ t $ is the time.
- $ e $ is Euler's number $ \approx 2.718 $.

### Understanding the Forgetting Curve

This equation shows that without reinforcement, knowledge decays exponentially. The higher the value of $ k $, the faster information is forgotten. However, **spaced repetition** (reviewing information at increasing intervals) can counteract this decay, reinforcing the memory over time.

## Takeaways

These two concepts made me think a lot about the remainder of this year and what's to come. Life is a journey of learning, and this fundamentally starts when we understand the value of the time we have.
Not sure if this kind of styled blogs are better (was not intending for maths to be involved but it just made its way into my mind). Hope you find this somewhat useful :)

[^1]: https://en.wikipedia.org/wiki/Forgetting_curve
