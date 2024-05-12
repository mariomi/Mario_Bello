const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Animal Shelter API',
            version: '1.0.0',
            description: 'This is a simple CRUD API for managing an animal shelter',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            },
        ],
        components: {
            schemas: {
                Animal: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the animal', example: 1 },
                        name: { type: 'string', description: 'Name of the animal', example: 'Bella' },
                        species: { type: 'string', description: 'Species of the animal', example: 'Dog' },
                        breed: { type: 'string', description: 'Breed of the animal', example: 'Labrador' },
                        age: { type: 'integer', description: 'Age of the animal', example: 5 },
                        adoptionStatus: { type: 'string', description: 'Adoption status of the animal', example: 'Available' }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the user', example: 100 },
                        username: { type: 'string', description: 'Username of the user', example: 'john_doe' },
                        email: { type: 'string', description: 'Email of the user', example: 'john_doe@example.com' },
                        isAdmin: { type: 'boolean', description: 'Is the user an admin', example: false }
                    }
                },
                Adoption: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the adoption', example: 200 },
                        userId: { type: 'integer', description: 'User ID of the adopter', example: 100 },
                        animalId: { type: 'integer', description: 'Animal ID being adopted', example: 1 },
                        status: { type: 'string', description: 'Status of the adoption', example: 'Pending' }
                    }
                },
                ForumPost: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the post', example: 300 },
                        userId: { type: 'integer', description: 'User ID of the poster', example: 100 },
                        title: { type: 'string', description: 'Title of the post', example: 'Welcome to the Forum' },
                        content: { type: 'string', description: 'Content of the post', example: 'Discuss all things related to our shelter here!' }
                    }
                },
                Comment: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the comment', example: 400 },
                        postId: { type: 'integer', description: 'ID of the post commented on', example: 300 },
                        userId: { type: 'integer', description: 'User ID of the commenter', example: 100 },
                        commentText: { type: 'string', description: 'Text of the comment', example: 'This is a great post!' }
                    }
                },
                PrivateMessage: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the message', example: 500 },
                        senderId: { type: 'integer', description: 'User ID of the sender', example: 100 },
                        receiverId: { type: 'integer', description: 'User ID of the receiver', example: 101 },
                        messageText: { type: 'string', description: 'Text of the message', example: 'Hello there!' }
                    }
                },
                SupportTicket: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID of the ticket', example: 600 },
                        userId: { type: 'integer', description: 'User ID who opened the ticket', example: 100 },
                        subject: { type: 'string', description: 'Subject of the ticket', example: 'Need Help' },
                        description: { type: 'string', description: 'Description of the issue', example: 'Details of the issue...' },
                        status: { type: 'string', description: 'Status of the ticket', example: 'Open' }
                    }
                }
            }
        }
    },
    apis: ['./app/routes/*.js']  // Make sure to adjust the path as needed
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
