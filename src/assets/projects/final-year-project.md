
# Final Year Project

This project is titled "Overcoming Cognitive Overload - Designing an AI-Based Note-Taking Solution". This is my final year project at the University Of Birmingham, as well as being my biggest project to date. In this project I aim to design a note taking solution that is both easy to use and effective whilst reducing the overload of information through the use of AI and NLP.

**The dissertation has officially been submitted on: 17-04-2025**

## Table of Contents

1. [Introduction](#introduction) 
2. [Design](#design)

## Introduction

I don't want to talk too much about the literature side of this, but the key point I want to mention is that notetaking, as deep as the rabbit hole may be, is up to the preference of the *individual*. If you like to use pen and paper, go for it! If you prefer to leverage digital ubiquity, go for it! The important thing is that we find something that works for us. This project provides the foundation for solving the **cognitive overload** issue[^1] that is faced amongst researchers and students alike. 


## Design

### Default Page

When the user goes onto the wesbite, they are greeted with an intuitive home page that showcases the features of the system, as well as links to direct them to the login or register page.

![Home Page](./assets/default_page.png)


### Dashboard Page

Once the user is logged in and given a JWT token[^2], they are then able to access their dashboard page:

![Dashboard Page](./assets/dashboard.png)


[^1]: B. G. S. Cezar and A. C. G. Maçada, "Cognitive Overload, Anxiety, Cognitive Fatigue, Avoidance Behavior and Data Literacy in Big Data environments," Information Processing & Management, vol. 60, no. 6, p. 103482, 2023. [Online]. Available: https://doi.org/10.1016/j.ipm.2023.103482
[^2]: https://jwt.io/introduction
