## Architecture

This application uses a modular architecture with the following components and data flow:

```mermaid
graph LR
    subgraph "Client"
        User[User Request]
    end
    
    subgraph "NestJS Application"
        subgraph "Homepage Module"
            HC[Homepage Controller]
            HS[Homepage Service]
            DTO[DTOs]
            Mapper[Mappers]
            Const[Constants]
        end
        
        subgraph "Core Modules"
            AM[App Module]
            CM[Config Module]
            CacheM[Cache Module]
        end
        
        subgraph "External"
            Redis[(Redis Store)]
        end
    end
    
    User --> HC
    HC --> HS
    HS --> CacheM
    CacheM --> Redis
    HS --> DTO
    HS --> Mapper
    HS --> Const
    AM --> CM
    AM --> CacheM
    AM --> HM[Homepage Module]
    CM -.->|provides config| CacheM
    CacheM -.->|caches data| HS
    
    style AM fill:#e1f5fe
    style CM fill:#f3e5f5
    style CacheM fill:#e8f5e8
    style HM fill:#fff3e0
    style Redis fill:#ffebee
    style DTO fill:#fce4ec
    style Mapper fill:#f8bbd9
    style Const fill:#e1bee7
```

## Description

A NestJS application with Redis caching for efficient data storage and retrieval. This project demonstrates how to integrate Redis as a cache store in a NestJS application using the `@nestjs/cache-manager` module.

## Installation

```bash
$ pnpm install
```

## Running the application

### Using Docker (Recommended)

1. Ensure Docker and Docker Compose are installed.
2. Run the following command to start the application and Redis:

```bash
docker-compose up
```

The application will be available at http://localhost:3000.

### Using npm/pnpm scripts

1. Install dependencies:

```bash
pnpm install
```

2. Start Redis (if not using Docker):

Make sure Redis is running on your system.

3. Run the application:

```bash
pnpm run start:dev
```

The application will be available at http://localhost:3000.

### Key Components:
- **App Module**: The root module that orchestrates all other modules.
- **Config Module**: Manages environment variables for configuration (e.g., Redis host and port).
- **Cache Module**: Integrates Redis as the cache store, configurable via environment variables.
- **Homepage Module**: Demonstrates cache usage with controller, service, DTOs, mappers, and constants for handling requests.
- **DTOs**: Data Transfer Objects for structuring request/response data.
- **Mappers**: Utility functions to transform data between different formats.
- **Constants**: Centralized constants like API URLs.
- **Redis Store**: External Redis instance for data caching.

The diagram shows the request flow from user to controller, through service to cache, and finally to Redis storage.

## Logging

This application implements comprehensive logging throughout using NestJS's built-in `Logger` class:

- **Service Layer**: Logs method entry points, successful operations (e.g., "Fetched data from API and cached it"), and errors with stack traces.
- **Error Handling**: Structured error logging with context, including method names and error details.
- **Cache Operations**: Implicit logging through cache manager for cache hits/misses (via Redis).

Logging helps with debugging, monitoring application health, and tracking performance in development and production environments.

## Project Structure

```
redis-cache-store/
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── .env
├── .env.example
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── homepage/
│       ├── constant/
│       │   ├── homepage-api-url.constant.ts
│       │   └── index.ts
│       ├── dto/
│       │   ├── homepage.response.dto.ts
│       │   └── index.ts
│       ├── mapper/
│       │   ├── homepage.response.mapper.ts
│       │   └── index.ts
│       ├── homepage.controller.ts
│       ├── homepage.module.ts
│       └── homepage.service.ts
└── test/
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

## Stay in touch

- Author - Sandip Das (Full Stack Developer | NodeJs | ReactJs | AWS)
- Email - sandip4991@gmail.com
- LinkedIn - https://www.linkedin.com/in/sandipdas-software/

## License

This application is [MIT licensed](LICENSE).
