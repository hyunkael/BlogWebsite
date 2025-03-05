# Blog Website

A fully functional blog website built with Node.js, Express, MongoDB, and EJS templating engine. The website features a modern, responsive design using Tailwind CSS.

## Features

- Create, Read, Update, and Delete blog posts
- Image upload support
- Responsive design
- Flash messages for user feedback
- Clean and modern UI with Tailwind CSS
- MongoDB database integration
- Error handling

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (Make sure MongoDB server is running)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/blog
SESSION_SECRET=your-secret-key
PORT=3000
```

4. Start the application:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
blog/
├── src/
│   ├── config/
│   ├── models/
│   │   └── Post.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── routes/
│   │   ├── index.js
│   │   └── posts.js
│   ├── views/
│   │   ├── layout.ejs
│   │   ├── index.ejs
│   │   ├── error.ejs
│   │   └── posts/
│   │       ├── new.ejs
│   │       ├── edit.ejs
│   │       └── show.ejs
│   └── app.js
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS (Embedded JavaScript templates)
- Tailwind CSS
- Multer (for file uploads)
- Method Override (for PUT/DELETE requests)
- Express Session
- Connect Flash (for flash messages)

## Contributing

Feel free to submit issues and enhancement requests!
