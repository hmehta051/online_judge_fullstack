# Online Judge

## Overview
The **Online Judge** project is a comprehensive platform designed to provide users with the ability to write, test, and submit code in various programming languages. It features a robust tech stack, multi-language support, and both user and admin interfaces.

## Tech Stack
- **Frontend:**
  - React
  - Redux Toolkit
  - TailwindCSS
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB
- **Infrastructure:**
  - AWS
  - Docker
- **Authentication:**
  - JWT

## Features

### Multi Language Support
The Online Judge supports the following programming languages:
- C++
- JavaScript
- Java
- Python

### Test and Submit Option
Users can:
- Write code in the supported languages.
- Run tests on their code to check for errors and correctness.
- Submit their code for evaluation.

### Admin Dashboard
The Admin Dashboard allows administrators to:
- Add Questions
- Edit Questions
- Delete Questions

### User Screen
The User Screen provides users with:
- An integrated development environment (IDE) for coding.
- Options to run tests and view results.
- Submission history and status tracking.

## Installation and Setup
To set up the project locally, follow these steps:

### Prerequisites
- Node.js
- Docker
- MongoDB
- AWS account

### Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/hmehta051/online_judge_fullstack
    ```

2. **Install dependencies:**

    **Backend:**
    ```bash
    cd online_judge_fullstack/oj_backend
    npm install
    ```

    **Frontend:**
    ```bash
   cd online_judge_fullstack/oj_frontend
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the `oj_backend` and add the following:
    ```plaintext
    APPLICATION_PORT=8080
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.q3a58.mongodb.net/online_judge
    JWT_SECRET_KEY=ABC
    ```

4. **Run Docker containers:**

    **Build the Docker image for the backend:**
    ```bash
    cd ../oj_backend
    docker image build -t oj_backend .
    ```

    **Run the Docker container for the backend:**
    ```bash
    docker run -p 8080:8080 --env-file ./oj_backend/.env oj_backend
    ```

5. **Start the development servers:**

    **Backend:**
    ```bash
    cd oj_backend
    npm run server:prod
    ```

    **Frontend:**
    Open a new terminal window and run:
    ```bash
    cd oj_frontend
    npm run dev
    ```

## Usage

### Admin Dashboard
1. **Login:**
   Admins can log in using their credentials to access the dashboard.
2. **Manage Questions:**
   - Add Questions.
   - Delete/Edit Questions
   - Monitor user activity and submissions.

### User Screen
1. **Register/Login:**
   Users can register for a new account or log in to an existing one.
2. **Write Code:**
   Use the integrated IDE to write code in C++, JavaScript, Java, or Python.
3. **Test Code:**
   Run tests to check for syntax errors and logical correctness.
4. **Submit Code:**
   Submit the code for final evaluation and view submission status.

## Contributing
We welcome contributions to the Online Judge project. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

## Contact
For any queries or feedback, please contact [hmehta051@gmail.com](mailto:hmehta051@gmail.com).
