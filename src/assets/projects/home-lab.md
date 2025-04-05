# Home Lab

This project is a complete overview of my home lab.

What is a home lab? As the name suggests, a [home lab](https://linuxhandbook.com/homelab/) is essentially the name given to a server that's set up in your home. People often use this to host applications, servers and docker containers.

## Table of Contents

1. [Introduction](#introduction)
2. [Setup](#setup)
3. [Configuration](#configuration)

## Introduction

Ever since I found out about Linux and what *Open Sourcing* is, I've falled deep down a rabbit hole. Amongst the many intricacies of having a computer is being able to self host services for your own personal needs. For instance, in my particular use case, I use PSQL a lot (mainly because its my favourite SQL language but anyways), so I thought to myself "could I not just host this on a machine and make it run 24/7?"; and that's exactly what I did. 

## Setup

The specs of the machine that I am running isn't anything too fancy, I actually picked this up on facebook marketplace, and just added an SSD inside. 

| Component     | Details                              |
|---------------|--------------------------------------|
| **OS**        | Ubuntu 22.04.5 LTS x86_64            |
| **Host**      | HP ProDesk 400 G1 SFF                |
| **Kernel**    | 6.8.0-57-generic                     |
| **CPU**       | Intel i5-4460 (4 cores) @ 3.40GHz    |
| **GPU 1**     | Intel HD Graphics                    |
| **GPU 2**     | NVIDIA Quadro 600                    |
| **Memory**    | 15.6 GiB RAM                         |
| **Storage**   | 128GB SSD (need to add the hard drive too, but this is okay for the *current* use case) |


```mermaid
graph TD
    %% Layout direction
    classDef titleBox fill:#f0f0f0,stroke:#333,stroke-width:2px,font-weight:bold
    classDef groupBox fill:#fff,stroke:#bbb,stroke-dasharray: 5 5

    %% Outer wrapper
    subgraph HOMELAB_SYSTEM["Homelab System"]
        class HOMELAB_SYSTEM titleBox

        internet[Internet Users]
        nginx[NGINX Reverse Proxy: home.ip.address]

        %% Internet Flow
        internet --> nginx

        %% NGINX Routing
        nginx --> homepage
        nginx --> pgadmin
        nginx --> stirlingpdf
        nginx --> miniflux
        nginx --> jupyter

        %% Docker Subsystems
        subgraph Homepage_Stack["Homepage Service"]
            class Homepage_Stack groupBox
            homepage[Homepage Port: 3000]
        end

        subgraph PostgreSQL_Stack["PostgreSQL Stack"]
            class PostgreSQL_Stack groupBox
            postgres[PostgreSQL Port: 5432]
            pgadmin[PGAdmin4 Port: 5050]
            pgadmin --> postgres
        end

        subgraph StirlingPDF_Stack["StirlingPDF Service"]
            class StirlingPDF_Stack groupBox
            stirlingpdf[StirlingPDF Port: 8002]
        end

        subgraph Miniflux_Stack["Miniflux Service"]
            class Miniflux_Stack groupBox
            miniflux[Miniflux Port: 9433]
            miniflux_db[PostgreSQL DB Internal]
            miniflux --> miniflux_db
        end

        subgraph Jupyter_Stack["JupyterLab Service"]
            class Jupyter_Stack groupBox
            jupyter[JupyterLab Port: 8888]
        end
    end

```
