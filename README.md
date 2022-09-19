to start project run:

    npm run start:dev

DB automatically would run migrations

1) Create user


    POST: http://localhost:8080/user

    {
        "firstName": "test firstName",
        "lastName": "test lastName"
    }


2) Create user's task


    POST: http://localhost:8080/task/userId
    {
       "title": "test title",
       "description": "test description"
    }

3) Get user's task


    POST: http://localhost:8080/task/userId


3) Update task


    PATCH: http://localhost:8080/task/1
    {   
        "userId": 2,
        "title": "test title2",
        "description": "test description3",
        "status": "TODO"
    }

