# React App with Fake JSON Server

This project is a simple React application that demonstrates how to integrate a fake JSON server for development of Hotel booking app

## Features

- Fetch and display data from a fake JSON server
- Mock API for development without a backend
- Easy-to-extend JSON data

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [JSON Server](https://github.com/typicode/json-server)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/my-react-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd my-react-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Install JSON Server globally (if not installed already):
   ```bash
   npm install -g json-server
   ```

## Usage

### Start the Fake JSON Server

1. Start the JSON Server:
   ```bash
   json-server --watch db.json --port 5000
   ```
   This will start the server on `http://localhost:5000`.

### Start the React App

1. Run the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
my-react-app/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── ...
├── db.json
├── package.json
├── README.md
```

## Dependencies

- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server)

## Future Improvements

- Add support for `POST`, `PUT`, and `DELETE` operations
- Create forms for adding/editing posts
- Enhance UI with styling libraries like TailwindCSS or Material-UI

## Acknowledgments

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [React Documentation](https://reactjs.org/)
