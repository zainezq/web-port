# Home Lab

This project is a complete overview of my home lab.

What is a home lab? As the name suggests, a [home lab](https://linuxhandbook.com/homelab/) is essentially the name given to a server that's set up in your home. People often use this to host applications, servers and docker containers.

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Configuration](#configuration)
  - [Glance](#glance)
  - [Postgres](#postgres)
  - [StirlingPDF](#stirling-pdf)
  - [Miniflux](#miniflux)
  - [Calibre Web](#calibre-web)
  - [Filebrowser](#file-browser)
  - [Portainer](#portainer)

## Introduction

Ever since I found out about Linux and what *Open Sourcing* is, I've fallen deep down a rabbit hole. Amongst the many intricacies of having a computer is being able to self host services for your own personal needs. For instance, in my particular use case, I use PSQL a lot (mainly because its my favourite SQL language but anyways), so I thought to myself "could I not just host this on a machine and make it run 24/7?"; and that's exactly when the absorption began.

## Setup

The specs of the machine that I am running isn't anything too fancy, I actually picked this up on facebook marketplace, and just added an SSD inside.

| Component   | Details                                                                                 |
|-------------|-----------------------------------------------------------------------------------------|
| **OS**      | Ubuntu 22.04.5 LTS x86_64                                                               |
| **Host**    | HP ProDesk 400 G1 SFF                                                                   |
| **Kernel**  | 6.8.0-57-generic                                                                        |
| **CPU**     | Intel i5-4460 (4 cores) @ 3.40GHz                                                       |
| **GPU 1**   | Intel HD Graphics                                                                       |
| **GPU 2**   | NVIDIA Quadro 600                                                                       |
| **Memory**  | 15.6 GiB RAM                                                                            |
| **Storage** | 128GB SSD (need to add the hard drive too, but this is okay for the *current* use case) |

## Configuration

Below is a `plantuml`-like diagrammatical representation of the services I use and how they interact with another.

![PlantUML](./assets/homelab_1.png)

Each of these services hold a purpose, the `docker-compose.yml` of each of these can be found below:

### Glance

Glance[^1] is the dashboard that I use to easily navigate through these self-hosted services; the neat part is that it's reverse-proxied (as all of them are, but since this one is, I don't need to remember the URL's for the rest). I used to use homepage[^2], but decided to go with glance now for absolutely no reason whatsoever. The `.yml` is found below:

```yml
services:
  glance:
    container_name: glance
    restart: unless-stopped
    image: glanceapp/glance
    volumes:
      - ./config:/app/config
      - ./assets:/app/assets
      # Optionally, also mount docker socket if you want to use the docker containers widget
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 8085:8080
    env_file: .env
```

### Postgres

Postgres[^3] is the database that I use for most of my projects, as you can see, there are two services running here: one is the actual database and the other is the UI[^4] for it. the `.yml` is found below:

```yml
version: '3.8'

services:
  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      POSTGRES_USER: name
      POSTGRES_PASSWORD: password
      POSTGRES_DB: db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - postgres_network
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: email
      PGADMIN_DEFAULT_PASSWORD: password
    ports:
      - "5050:80"
    networks:
      - postgres_network
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  postgres_network:
```

One thing to note here is that `unless-stopped` is used as the restart policy, which means that the container will restart automatically if it exits, and will only stop on manual intervention.

### Stirling PDF

Stirling PDF[^5] is a tool that I use to handle PDFs. There are quite a few features on this, but I mainly use this for converting .docx to .pdf. The `.yml` is found below:

```yml
version: '3.3'
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    restart: unless-stopped
    ports:
      - '8002:8080'
    volumes:
      - ./StirlingPDF/trainingData:/usr/share/tessdata # Required for extra OCR languages
      - ./StirlingPDF/extraConfigs:/configs
      - ./StirlingPDF/customFiles:/customFiles/
      - ./StirlingPDF/logs:/logs/
      - ./StirlingPDF/pipeline:/pipeline/
    environment:
      - DOCKER_ENABLE_SECURITY=false
      - LANGS=en_GB
      - SYSTEM_ROOTURIPATH=/pdf
```

### Miniflux

Miniflux[^6] is a feed reader that I use to read various RSS feeds. As mentioned in their website: "The content is the most important thing. Everything else is just noise", which is the reason why I use it, for readability. The `.yml` is found below:

```yml
version: '3.8'

services:
  miniflux:
    image: miniflux/miniflux:latest
    container_name: miniflux
    restart: unless-stopped
    ports:
      - "9433:8080"
    environment:
      - DATABASE_URL=postgres://miniflux:supersecret@db/miniflux?sslmode=disable
      - BASE_URL=https://server/miniflux
      - RUN_MIGRATIONS=1
      - CREATE_ADMIN=1
      - ADMIN_USERNAME=user
      - ADMIN_PASSWORD=password

  db:
    image: postgres:15-alpine
    container_name: miniflux_db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=miniflux
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=miniflux
    volumes:
      - miniflux_db_data:/var/lib/postgresql/data

volumes:
  miniflux_db_data:
```

There are two services that are running, one is the miniflux service adn the other is the database.

### Jupyter Lab

Jupyter Lab[^7] is a notebook environment that I use to do some ML experiments. The `.yml` is found below:

```yml
version: '3.8'

services:
  jupyterlab:
    image: jupyter/base-notebook:latest
    container_name: jupyterlab
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
    environment:
      - JUPYTER_ENABLE_LAB=yes
    command: >
      start-notebook.sh
      --NotebookApp.base_url=/jupyter
      --NotebookApp.allow_origin='*'
      --NotebookApp.token=''
      --NotebookApp.password=''
      --NotebookApp.trust_xheaders=True
      --NotebookApp.allow_remote_access=True
    restart: unless-stopped
```

### Calibre Web

Calibre Web[^8] is a book manager that I use to manage my e-books. The `.yml` is found below:

```yml
version: "3.8"

services:
  calibre-web:
    image: lscr.io/linuxserver/calibre-web:latest
    container_name: calibre-web
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - DOCKER_MODS=linuxserver/mods:universal-calibre # optional
      - OAUTHLIB_RELAX_TOKEN_SCOPE=1 # optional
    volumes:
      - /home/user/master-folder/projects/calibre/data:/config
      - /home/user/master-folder/projects/calibre/library:/books
    ports:
      - 8083:8083
    restart: unless-stopped
```

### File Browser

File Browser[^9] is a tool that I use to manage my files through the web. The `.yml` is found below:

```yml
version: "3"

services:
  filebrowser:
    image: hurlenko/filebrowser
    user: "${UID}:${GID}"
    ports:
      - 9991:8080
    volumes:
      - /home/user:/data
      - /CONFIG_DIR:/config
    environment:
      - FB_BASEURL=/filebrowser
    restart: unless-stopped
```    

### Portainer

Portainer[^10] is a tool that I use to manage my docker containers. The `.yml` is found below:

```yml
version: "3"
services:
  portainer:
    image: portainer/portainer-ce:latest
    ports:
      - "9443:9443"
    volumes:
      - data:/data
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped

volumes:
  data:
```

[^1]: https://github.com/glanceapp/glance

[^2]: https://gethomepage.dev/

[^3]: https://www.postgresql.org/

[^4]: https://pgadmin.org/

[^5]: https://www.stirlingpdf.com/

[^6]: https://miniflux.app/

[^7]: https://jupyter.org/

[^8]: https://calibre-ebook.com/

[^9]: https://filebrowser.org/

[^10]: https://www.portainer.io/
