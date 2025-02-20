# C-Programmes

This is a project that I have been working on for some time. Here I will explain in detail the purpose of this, what each program does, and how you can learn C through creating projects.


## Table of Contents

1. [Introduction](#introduction)  
2. [Programmes](#programmes)  
   2.1 [Simple Sum Calculator](#simple-sum-calculator)  
   2.2 [Factorial Calculator](#factorial-calculator)  
   2.3 [Word Occurrence Counter](#word-occurrence-counter)  
   2.4 [Basic Calculator](#basic-calculator)  
   2.5 [Meet And Greet](#meet-and-greet)  
   2.6 [Guess the Number](#guess-the-number)  
   2.7 [Single Threaded Client-Server Chat](#single-threaded-client-server-chat)  
   2.8 [Simple Lexers for Learning Purposes](#simple-lexers-for-learning-purposes)  
   2.9 [Firewall Configuration Program](#firewall-configuration-program)  
   2.10 [Simple File Management Program](#simple-file-management-program)  
   2.11 [Multi-Threaded Client-Server TCP Chat Application](#multi-threaded-client-server-tcp-chat-application)  
3. [Conclusion](#conclusion)  


## Introduction

C is considered a low level programming language, meaning the things that you normally rely on being taken care of, you will have to manually do. Albeit it sounding like a chore, it does give you a lot more flexibility in the sense that you have more control over what is going on. Let's consider memory management, Java has it's built in `Java Virtual Machine (JVM)` that handles allocation and deallocation of objects (see [Java Memory Management](https://www.geeksforgeeks.org/java-memory-management/)), C doesn't have that, instead you have to manually allocate memory and deallocate it, which, although makes you more prone to making mistakes, gives you complete control of how much memory the program is using. 
This page will hopefully give you the building blocks to making yourself proficient in C through practical learning.

## Programmes




### Simple Sum Calculator
**Description**: This C program calculates the sum of two numbers. It's a basic utility designed to add any two numbers entered by the user and display the result.
Let's take a little closer look at what is going on:

```c
#include <stdio.h>

int main() {
    int num1, num2, sum;

    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);

    sum = num1 + num2;

    printf("Sum: %d\n", sum);
    return 0;
}
```

This may look daunting at first, but it follows a sequential execution where each line isn't as bad as it seems.

`#include <stdio.h>` This line includes the Standard Input Output (stdio.h) library, which is required for input (scanf) and output (printf) operations.
The `int main()` is the main function, it is the *entry point* of the program, everything under it is what will be executed. 
`int num1, num2, sum;` these are *declarations*, we are saying that `num1` will hold the first number, `num2` will hold the second number and `sum` will hold the output.
`printf("Enter two numbers: ");` and `scanf("%d %d", &num1, &num2);` are displaying text to the user then taking their input, you'll notice that `%d %d` is being used, this is so that it is specified the user will be entering 2 *integers*. `&num1` and `&num2` are memory addresses where the entered values will be stored. 
The next two lines perform the calculation and prints it back out to the user. 
`return 0;` This statement terminates the program and returns 0 to indicate successful execution.

Here is a screenshot of an example:

![Simple Sum Calculator](./assets/sum-c-example.png)

### Factorial Calculator
- **Description**: The Factorial Calculator is a C program that computes the factorial of a given number. Factorial is the product of all positive integers from 1 to the given number. This program allows users to find the factorial of a number they specify.

### Word Occurrence Counter
- **Description**: The Word Occurrence Counter is a C program that analyses a text file and counts the occurrences of a specific word or phrase. It's a helpful tool for text analysis and can be used for various applications such as data processing and text mining.

### Basic Calculator
- **Description**: This Basic Calculator C program is a versatile utility that performs four fundamental arithmetic operations: addition, subtraction, multiplication, and division on two numbers. Users can input two numbers and choose the operation they want to perform, and the program returns the result.

### Meet And Greet
- **Description**: A simple C program that asks the user for their name and then greets them.

### Guess the Number
- **Description**: A simple C program that asks the user for a number between 0-19 and then checks if it matches the random number generated.

### Single Threaded Client-Server Chat
- **Description**: A basic client and server programs that allow a single client to send a message to the server, and the server echoes the message back to the client.

### Simple Lexers for Learning Purposes
- **Description**: This repository contains two example lexers written in C that are intended for learning purposes. The lexers are not complete and do not handle all possible cases. They serve as a starting point for understanding the basics of lexer implementation in the context of compiler construction.

### Firewall Configuration Program
- **Description**: This project consists of a multi-threaded server and a client program written in C to manage firewall configurations. The server listens on a specified port and processes requests from clients to add, delete, or check firewall rules. The client program allows users to interact with the server and manage firewall rules remotely.

### Simple File Management Program
- **Description**: This program is a basic command-line file management tool written in C. It provides several options for interacting with files and directories in the current working directory. The program includes functionalities such as displaying the current directory, creating new files, listing all files, removing files, and displaying the content of a file.

### Multi Threaded Client Server TCP Chat Application
- **Description**: This is a basic multi-threaded TCP client-server chat application written in C, where multiple clients can connect to the server and exchange messages. A custom (valid) port number can

## Getting Started

These instructions will guide you on how to get a copy of the projects up and running on your local machine for development and testing purposes.

**Prerequisites**:

Before you begin, make sure you have the following prerequisites installed:
- C Compiler: You need a C compiler like GCC to build and run the C programs.

**Installation**
1. Clone the repository to your local machine using Git:
  ```bash
  git clone https://github.com/zainezq/C-Programmes.git
  ```

2. Navigate to the project directory:

  ```bash
  cd C-Programmes/
  ```

4. Compile the C program. If the project has it's own README.md, then refer to that for more instructions, otherwise use the below example to compile a standalone program. For example, to compile a C file named `program.c`:

  ```bash
  gcc -o program program.c
  ```

4. Run the program:
  ```bash
  ./program
  ```

Replace `program` with the respective `program.c` file name that you have given in step 3

5. Follow the above compilation and execution steps for the specific project you want to work on. Each project may have its own source file (e.g., `program.c`), so make sure you are in the correct project directory and compile and run the corresponding source file.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
