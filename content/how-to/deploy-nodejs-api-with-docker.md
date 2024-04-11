---
title: Deploy Node.js API with Express using Docker
description: In this post, we'll discuss about how to deploy Node.js APIs using Docker, with a focus on MongoDB performance, multi-stage builds, Jest for testing, and Nginx as a reverse proxy.
tags: [ API, Node.js, Mongo, CI/CD, Docker ]
topics: [ api, nodejs, mongo, docker ]
date: 2024-04-11
slug: deploy-nodejs-api-with-docker
img: "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/articles/docker-nodejs-mongodb"
---

## Introduction

In today's technological landscape, delivering apps swiftly and reliably is critical. Docker, with its containerization
technology, provides an easy way to deploy Node.js apps. This post discusses how to deploy an Express.js application
using MongoDB, focusing on Docker containers, recommended practices, and testing methodologies. We'll skip the basics of
building an Express.js application and connecting to MongoDB. Instead, we're concentrating on using Docker's
capabilities, following MongoDB best practices, creating thorough testing with Jest, and
using Nginx as a reverse proxy.

The whole code [repository on GitHub](https://github.com/denisakp/expressjs-mongo-docker) serves as a practical
illustration of the concepts and practices covered in this
guide.

## Best Practices for MongoDB Client: Singleton Pattern

The Singleton Pattern is a key component of effective database management in Node.js applications. This design pattern
assures that a class has just one instance and offers global access to it. For an in-depth understanding of the
Singleton Pattern, check
out [Refactoring Guru's comprehensive guide](https://refactoring.guru/design-patterns/singleton).

### Why Singleton for MongoDB

- Consistent Connection: Maintaining a single MongoDB connection avoids the overhead of opening and closing multiple
  connections, enhancing performance.
- Resource Management: Singleton ensures optimal use of resources, preventing the pitfalls of redundant connections.

### Implementing Singleton in Node.js

```javascript
class MyDatabase {
  static client;
  static db;

  /**
   * It uses a singleton pattern to ensure that only one database connection is maintained throughout the application.
   * @static
   * @return {Promise<MongoClient>}
   */
  static async connect() {
    if (!this.client) {
      try {
        this.client = new MongoClient("mongodb://localhost:27017/", { serverApi: ServerApiVersion.v1 });
        await this.client.connect();
        console.info('connected to database');
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

## Dockerized Your Node.js Application: Multi-Stage Layers

Docker provides a chic method for packaging programs. Multi-stage Docker builds enable you to use a single Dockerfile
with several layers, which helps to optimize the build process for size, security, and efficiency.

### Understanding the Dockerfile

Here’s a breakdown of the Dockerfile provided:

1. **Base stage**

```dockerfile
FROM node:lts-alpine AS base
RUN apk add --no-cache libc6-compat && apk add --no-cache dumb-init
WORKDIR /app
```

- Base Image: Use node:lts-alpine for a lightweight Node.js environment
- Essential Packages: Installs libc6-compat for compatibility and dumb-init for process management.
- Working Directory: Sets /app as the working directory for subsequent commands.

2. **Dependencies stage**

```dockerfile
FROM base AS dependencies
COPY package*.json ./
RUN npm install
```

Copy both package.json and package-lock.json. Installs only production dependencies, with no
development dependencies included.

3. **Prune stage**

```dockerfile
FROM dependenices AS prune
RUN npm prune --omit=dev
```

Removes extraneous files and development dependencies to further minimize the size of node_modules.

4. **Production stage**

```dockerfile
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

- **Assembling the Final Image**: Starts from the base stage, adds pruned node_modules, and then copies the application
  source code.
- **Non-root User**: Creates and switches to a non-root user (😅Vegata because I feel like a Saiyan too) for security.
- **Environment Variables**: Set NODE_ENV to production.
- **Port Expose and EntryPoint**: Exposes the application port and sets dumb-init as the entrypoint, followed by the
  command to start the Node.js server.

### Advantages of This Approach

1. **Lightweight Final Image**:
   Minimizes the picture size and potential attack surface by only including what is required to operate the
   application.
2. **Security**:
   Running as a non-root user enhances the container's security.
3. **Optimized Build Time**:
   By caching dependencies in an earlier stage, re-building images after source code changes becomes faster.

## E2E Testing with Jest

End-to-end testing validates every process in the application workflow. Jest, a delightful JavaScript Testing Framework,
makes e2e testing efficient and effective.

```javascript
//healthcheck.test.mjs
import supertest from 'supertest';
import server from 'src/server.mjs';

describe('Healthcheck E2E tests', () => {
  it('/GET /api/healthcheck', async () => {
    const response = await supertest(server).get('/api/healthcheck');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("mongo", true);
  });
});
```

This test checks whether the API is up and running.

## Using Nginx as a Reverse Proxy

Nginx serves as a reverse proxy, sending client requests to the proper server. Nginx can transport traffic to your
Express.js API in a Dockerized environment, improving speed, security, and performance through caching.

### Setting up Nginx config

```nginx
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";

        # Proxy Pass to Node.js App
        location / {
            proxy_pass http://app:3000;
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

## Docker compose

Docker Compose is a tool for creating and managing multi-container Docker applications. It allows you to configure
your application's services, networks, and volumes using a YAML file. Then, using a single command, you can run all the
services listed in your configuration.

### Our project Docker compose

```yaml
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
default (you can use 8000 for development purpose). We also include volumes to store application data. This is critical
for the Mongo database since we may need to do backup operations. Long-term retention of application logs may require
volumes for nginx and app service.

## Conclusion

To summarize, this post has guided you through a complete technique to deploying a Node.js API with Express using
Docker,
focusing on key aspects such as MongoDB performance, multi-stage Docker builds, end-to-end testing using Jest, and using
Nginx as a reverse proxy. We've seen how Docker can help to speed the development and deployment process while also
maintaining consistency across environments. MongoDB's Singleton style ensures a steady and efficient connection, while
multi-stage Docker builds reduce final image size without sacrificing security or functionality. Furthermore,
incorporating Jest for end-to-end testing ensures that the application is reliable and resilient before it goes live.
Finally, Nginx as a reverse proxy improves performance while also providing an added layer of protection.

Whether you're an experienced developer or new to Docker, this arrangement is intended to strike
a balance between simplicity, security, and performance, making it an excellent starting point for delivering scalable
and efficient web apps.

