Auto-gnerated index id 17 testing #2. 

git add .

git commit -m "Auto testing blah"

git push

body:

Logs:

-- script init

ERROR: [Errno 2] No such file or directory: 'assets/blogs/recipes.md'

Continuing with development mode

-- script init x2

total files: 3

randomised: yes (will remove)

{cv_sent_latest}

-- converting cv_sent_latest from raw to md...

-- success!

```
CV

Name: Zaine Ul Abideen Qayyum

Gender: Male

Age: 21

Height: 5’7

Ethnicity: Pakistani

Qualifications:

Alhamdulillah Hafjz of Quran

Currently studying Alimiyyah course as well as sab’a Qiraat.

BA in Computer Science

Occupation:

- Starting new job as a software engineer this Autumn 2025 in’sha’Allah

Current location: Birmingham

Languages spoken: English (Native), French (Intermediate), bit of Urdu and Arabic

Sect/madhab: Sunni, Hanafi

Prays 5x Salah: Yes

Marital status: Single, never married

Consider marrying out of one’s ethnicity? Yes

About me:

Born in France but moved to the UK since the age of 6. A practising, family-oriented, and friendly individual. Has an easygoing and relaxed nature but mature when the situation calls for it. Enjoys cooking, going for walks, and keeping fit by going to the gym and swimming. Also enjoy reading Islamic books and tinkering with electronics. Plays sports from time to time.

REQUIREMENTS IN A SPOUSE

Age range: 18 to 23

Height: 5’4 or shorter

 Education: any level

 Location: UK 

Ethnicity: Pakistani preferably 

Hijab: Hijab (Niqab would be a plus but not a must, as long as willing to wear it one day in’sha’Allah)

Salah: must pray 5x salah or at least working towards this 

Prospective partner:

Someone who is loving and caring, with good family ethics, humour, and an easygoing personality. A person who is appreciative and likes to look after their health and dresses modestly. She should be seeking or willing to seek ilm and have the passion to learn and grow as a Muslimah. Understands her role as a wife.

Father: 07909061040

Mother: 07405174151

-- sent to 5 places, 1 London, 1 Birmingham, rest up north on 22/05/25

-- 0 responses as of 07/06/25
```

{advanced-networking.md}

already md file, script will not convert

```
---
title: Advanced Networking
tags: ["uni", "technical"]
---

# Advanced Networking

This module was taught in the first semester of my final year at university. There were a wide range of topics that were covered, and best efforts were made in not talking about the security aspects of networks, although it is the case that when we talk about networks we are talking about secure networks (who even needs insecure networks?).

The following core topics were covered:

1. Lower Layer Protocols
    - Packet vs Circuit Switching, Ethernet, layer models (DoD 4/5, OSI 7).
    - Network Hardware: Switches, Routers, data/control/management plane. Software defined networks.
    - LAN/WAN split, Arpanet, DoD, OSI. Why OSI Failed
    - Link aggregation and VLANs
2. IP Addressing
    - Addressing, routing, concepts. Why IPv6 is needed
    - Address allocation, bootp, DHCP, SLAAC
    - NAT and Proxying
3. TCP/UDP
    - UDP: applications, advantages and disadvantages
    - TCP: applications, advantages and disadvantages, mechanisms and operation, sequence numbers, receive windows, slow start, window scaling, PAWS, timestamping, multipathing
    - Demultiplexing, multiplexing
4. DNS
    - DNS: concepts, resource records, RR sets, basic operation, recursive and authoritative servers, caching, DNSSEC 
5. Higher layer protocols
   - Basic operation of HTTP, FTP, SMTP

```

{Dockerfile}

-- converting Dockerfile from raw to md...

-- success!

```
FROM node:22-slim AS builder
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* .
RUN npm ci

FROM node:22-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/
COPY . .
CMD ["npx", "quartz", "build", "--serve"]
```

ERROR parsing blog.script line 1: Expected '---' but found 'EOF'

BLANK LINE

script finished, 3 blog(s) added

