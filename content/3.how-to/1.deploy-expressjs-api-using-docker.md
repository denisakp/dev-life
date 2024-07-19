---
title: Deploy Express.js API using Docker
description: "In this post, we'll discuss about how to deploy Express.js RESTFull API using Docker, with a focus on MongoDB performance, docker multi-stage builds, Jest for testing, and Nginx as a reverse proxy."
tags: [ Express.JS, API, Node.js, Mongo, CI/CD, Docker ]
topics: [ expressjs, api, nodejs, mongo, docker ]
date: 2024-04-11
slug: deploy-expressjs-api-using-docker
img: "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/articles/docker-nodejs-mongodb"
---

## Introduction

In today's technological landscape, delivering apps swiftly and reliably is critical. Docker, with its containerization
technology, provides an easy way to deploy Node.js apps. This post discusses how to deploy an Express.js API
using MongoDB, focusing on Docker containers recommended practices, and testing methodologies. We'll skip the basics of
building an Express.js application and connecting to MongoDB. Instead, we're concentrating on using Docker's
capabilities, following MongoDB best practices, creating thorough testing with Jest, and using Nginx as a reverse proxy.

The whole code <a href="https://github.com/denisakp/expressjs-mongo-docker" target="_blank">repository on GitHub</a>,
serves as a practical illustration of the concepts and practices covered in this guide.

## Express.js

Express.js is a popular Node.js framework that speeds up and facilitates the development of web applications and APIs.
It provides a powerful collection of capabilities that simplify the server creation process,
allowing the developers to set up complicated routes, middlewares and server-side features with less code.
Because of its wide popularity, Express.js is supported by a big community, which provides a set of middleware that
improves its capability, making it a popular choice among developers wishing to build high-performance web applications.
If you're not familiar with Express.js, check the <a href="https://expressjs.com/" target="_blank">documentation</a>.

## MongoDB

MongoDB is a NoSQL database built for simple development and scaling. It is known as a document database and stores
data in flexible, JSON-like documents, which means that fields can differ from document to document and data structures
can change over time. This architecture allows you to easily define hierarchical relationships, store arrays, and create
other more complicated structures. MongoDB is well-known for its agility, high availability, and security oriented,
making it a popular choice for modern web applications which require rapid access to huge amounts of data.
If you're new to MongoDB, check the <a href="https://www.mongodb.com/docs/" target="_blank">documentation</a>.

## Singleton Pattern

The Singleton pattern is a software design pattern that assures a class has only one instance while also giving a global
point of access to it. According to <a href="https://refactoring.guru/design-patterns/singleton" target="_blank">
Refactoring Guru</a>, the Singleton pattern is frequently used when handling database
connections since it allows a class to be instantiated only once. This is especially beneficial when a single shared
resource, such as a database connection, is required to conduct activities across multiple components of an application.
By using the Singleton pattern, we can avoid mistakenly creating several instances of a class, saving resources
and ensuring consistent behavior throughout the program.

### Benefits of the Singleton for MongoDB client

- Consistent connection: Maintaining a single MongoDB connection avoids the overhead of opening and closing multiple
  connections, enhancing performance.
- Resource optimization: Singleton ensures optimal use of resources, preventing the pitfalls of redundant connections.
- Avoid connection leaks: You may avoid potential connection leaks caused by separate components of an application
  inappropriately handling individual connection instances. A connection leak can drain the database server's resources,
  resulting in performance degradation.

### Implement singleton pattern for MongoDB client

```javascript [database.config.mjs]
// this snippet is based on official mongodb npm module, not mongoosejs module. 
class MyDatabase {
  static client;
  static db;

  /**
   * @static
   * @return {Promise<MongoClient>}
   */
  static async connect() {
    if (!this.client) {
      try {
        this.client = new MongoClient("mongodb://localhost:27017/", { serverApi: ServerApiVersion.v1 });
        await this.client.connect();
        console.info('connected to database'); // we may use proper logging system instead of console.log
      } catch (error) {
        console.error("failed to connect to MongoDB: ", error.message);
        throw error
      }
    }
    return this.client;
  }

  /**
   * Retrieves the MongoDB database instance.
   * @static
   * @returns {Promise<Db>}
   */
  static async getDB() {
    if (!this.db) {
      const client = await this.connect();
      this.db = client.db("express"); // express is our database name
    }
    return this.db
  }
}
```

This code makes sure that throughout your application, you're working with the same instance of the MongoDB client
whenever you need it.

- **Static Properties**: For storing single instances of MongoClient, the database (Db)
- **Connect Method**: Establishes a connection to MongoDB, ensuring only one MongoClient instance is active
- **GetDB Method**: For retrieving the database while maintaining the Singleton pattern

## Docker

<a href="https://docs.docker.com/get-started/overview/" target="_blank">Docker</a> is a powerful platform that makes it
easy to create, deploy, and operate applications via containers.
Containers allow developers to bundle a program with all of its elements, including as libraries and other dependencies,
and ship it all out as one package.

### Dockerfile

A Dockerfile is a text document that contains all the necessary commands that a user can use on the command line to
build an image. It serves as a blueprint for creating Docker images. The Dockerfile includes directives like `FROM` for
creating a new build stage from a base image. Many examples can be found on the
Docker <a href="https://docs.docker.com/reference/dockerfile/" target="_blank">documentation page</a>.

### Multistage layer

Docker multistage build is a feature that enables you to build an image in multiple stages using a single Dockerfile.
Each stage can use a different basis image and build on the work of previous stages, selecting just the artifacts
required for the next level.
This is very beneficial for optimizing Dockerfiles, making them more efficient and easier to manage.
Here are some benefits of using multistage builds:

- Smaller image sizes: Using multistage builds allows you to considerably reduce the size of the final image.
  Unnecessary files and dependencies from earlier stages are not required in the final image,
  resulting in a smaller deployment artifact.
- Security Improvements: Because the final image contains only the necessities, it reduces the attack surface area,
  which
  improves security.
  Less runtime dependencies equal fewer opportunities for vulnerabilities.
- Faster Build Times:
  By dividing Dockerfiles into many stages, you can cache and reuse previous stages without rebuilding
  the complete image.
  This accelerates the build process, particularly during development and testing.

You can read more about Docker multistage build through
the <a href="https://docs.docker.com/build/building/multi-stage/" target="_blank">documentation</a>.

### Our Express.js API Dockerfile

```dockerfile [Dokerfile]
FROM node:lts-alpine AS base
RUN apk add --no-cache libc6-compat && apk add --no-cache dumb-init
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM dependenices AS prune
RUN npm prune --omit=dev

FROM base AS production
COPY --from=prune /app/node_modules ./node_modules
COPY . .
RUN addgroup -S vegeta && adduser -S vegeta -G vegeta
USER vegeta
ENV NODE_ENV production
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/server.mjs"]
```

Here’s a breakdown of the provided Dockerfile:

1. **Base stage**

    - Base Image: Use node:lts-alpine for a lightweight Node.js environment
    - Essential Packages: Installs libc6-compat for compatibility and dumb-init for process management.
    - Working Directory: Sets /app as the working directory for later instructions.
2. **Dependencies stage**

    - Copy both package.json and package-lock.json.
    - Installs only production dependencies
3. **Prune stage**

    - Removes extraneous files and development dependencies to further minimize the size of node_modules.
4. **Production stage**

    - Base Image Reuse: starts again from the base stage to ensure a clean environment
    - Modules and Code: Adds the pruned node_modules and copies the application source code into the container
    - Security: Set up a non-root user to enhance security, avoiding running the container with root privileges
    - Configuration: Sets NODE_ENV to production to optimize the Node.js environment for production
    - Runtime Setup: Configures dumb-init as the entry point to manage the main process, ensuring clean startup and
      shutdown

## E2E Testing with Jest

E2E tests evaluate the application's workflow from start to finish. This sort of testing validates the system's
integration with other interfaces, evaluates its dependent on other environments, and guarantees all pieces of the
system work together as intended under changing situations.

End-to-end (E2E) tests can be performed on an Express.js API using a variety of tools. These tools allow you to
replicate real-world usage by sending HTTP queries to the API and verifying the answers, ensuring that the entire system
works properly. Commonly used tools for E2E testing of Express.js applications include
<a href="https://learning.postman.com/docs/introduction/overview/" target="_blank">Postman</a>,
<a href="https://jestjs.io/" target="_blank">JestJS</a>,
<a href="https://mochajs.org/" target="_blank">MochaJS</a>,
<a href="https://docs.cypress.io/guides/overview/why-cypress" target="_blank">Cypress</a>

For this guide, we will go through JestJS, known as a unit testing framework for JavaScript. We'll pair it
to <a href="https://github.com/ladjs/supertest" target="_blank">SuperTest</a> to handle our E2E tests, since It
includes a clear syntax for
authoring tests and decent support for asynchronous test handling.

Here's a test case that ensures our server is up and functioning.

```javascript [healthcheck.test.mjs]
import supertest from 'supertest';
import server from 'src/server.mjs';

describe('Healthcheck E2E tests', () => {
  afterAll(async () => {
    await server.close(); // Ensure the server is closed after tests
  });

  it('/GET /api/healthcheck', async () => {
    const response = await supertest(server).get('/api/healthcheck');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("uptime");
    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.uptime).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("mongo", true);
  });
});
```

## Nginx

<a href="https://nginx.org/en/docs/" target="_blank">Nginx</a> is a powerful, high-performance software that acts as a
web server and reverse proxy.

Nginx, as a web server, can handle HTTP/HTTPS requests and provide static content quickly by sending files from disk to
network. It is quite effective at delivering static content such as pictures, JavaScript, and CSS files.

Nginx serves as a reverse proxy, directing traffic to different backend services based on URLs or headers. It also
manages load balancing across multiple servers. This is particularly useful in microservice designs, where several
services handle different portions of a web application.

Thus, using Nginx as a reverse proxy for an Express.js API provides a robust, secure, and efficient way to manage client
connections, security, and static content delivery, all of which contribute to a more scalable and maintainable
application architecture.

### Setting up Nginx configuration file

The `nginx.conf` file is the primary configuration file for Nginx. It specifies how the server responds to incoming
HTTP requests, manages many virtual servers, processes SSL/TLS settings, directs requests to backend apps, and more.
Here is the server block definition of our nginx.conf file.

```nginx [default.conf]
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";

        # Proxy Pass to Node.js App
        location / {
            proxy_pass http://app:3000; # app is the name of our app service name in docker
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Error Handling
        error_log /var/log/nginx/error.log;
        access_log /var/log/nginx/access.log;
    }
```

This Nginx configuration listens to port 80 for HTTP traffic and supports both IPv4 and IPv6 connections. It's
configured as a default catch-all server, responding to any HTTP request, and include important security headers:
`X-Frame-Options` set to `SAMEORIGIN` to prevent against clickjacking attacks, and `X-Content-Type-Options` to `nosniff`
to prevent the browser from MIME-sniffing responses that do not match the defined content type.

Additional setting options include caching static files such as uploads folders, SSL/TLS configuration, and, why not,
rate limits. Maybe we'll cover them in another iteration of this project.

## Docker compose

<a href="https://docs.docker.com/compose/" target="_blank">Docker Compose</a> is a tool for creating and managing
multi-container Docker
applications. It allows you to configure your application's services, networks, and volumes using a YAML file. Then,
using a single command, you can run all the
services listed in your configuration.

### Our project Docker compose

```yaml [docker-compose.yml]
version: '3'

services:
  mongo:
    image: mongo:7.0-jammy
    networks:
      - express
    volumes:
      - $PWD/docker/mongo/init.js:/docker-entrypoint-initdb.d/mongo-init.js
      - mongo-data:/data/db
  app:
    build:
      context: .
      dockerfile: Dockerfile
    networks:
      - express
    environment:
      MONGODB_HOST: mongodb://express:password@mongo:27017/express # do not use this credential in production 
      NODE_ENV: development
    volumes:
      - app-data:/app
    depends_on:
      - mongo
  nginx:
    image: nginx:stable-alpine3.17-slim
    networks:
      - express
    ports:
      - '${NGINX_PORT:-80}:80'
    volumes:
      - $PWD/docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - nginx-logs:/var/logs/nginx
    depends_on:
      - app

networks:
  express:
    driver: bridge

volumes:
  mongo-data:
  app-data:
  nginx-logs:
```

Our Docker compose includes three services (`mongo`, `nginx`, and `app`) connected via a docker network to isolate our
application from other projects. The Node.js service is served via the Nginx server, which listens to port 80 by
default (you can use 8000 for development). We also include volumes to store application data. This is critical
for the Mongo database since we may need to do backup operations. Long-term retention of application logs may require
volumes for nginx and app service.

## Conclusion

To summarize, this post has guided you through a complete technique to deploying an Express using Docker,
focusing on key aspects such as MongoDB performance, multi-stage Docker builds, end-to-end testing using Jest, and using
Nginx as a reverse proxy. We've seen how Docker can help to speed the development and deployment process while also
maintaining consistency across environments. MongoDB's Singleton style ensures a steady and efficient connection, while
multi-stage Docker builds reduce final image size without sacrificing security or functionality. Furthermore,
incorporating Jest for end-to-end testing ensures that the application is reliable and resilient before it goes live.
Finally, Nginx as a reverse proxy improves performance while also providing an added layer of protection.

Whether you're an experienced developer or new to Docker, this guide is intended to strike
a balance between simplicity, security, and performance, making it an excellent starting point for delivering scalable
and efficient web apps.

