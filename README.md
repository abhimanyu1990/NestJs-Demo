# NestJs-Kickstart

This is boilerplate project for NestJs/Postgres project

## Implementation Details

1. Swagger API Documentation
2. Authroity based Authroization
3. JWT Authentication
4. Global Exception handling
5. Environment based configuration
6. Email Service Implementation and Email Verification
7. Custom logger service

Entity Relations

User --many to many --> Role ---- many to many ----> Permissions (authority)

APIs
1. User Register
2. User Login
3. Create Role (Only Admin)
4. Create Permission ( Only Admin )
5. Assign Role to User ( Only Admin )
6. Assign Permission to Role ( Only Admin )
7. Verify Account/Email

License : MIT License
Please check License for more detail

