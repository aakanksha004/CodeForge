# Full Stack Coding Platform

## Overview

This project is a **full-stack coding platform** that processes programming submissions in multiple languages with high accuracy. The platform includes features for community contributions and a scalable, distributed system for efficient code execution.

---

## Features

### Code Submission and Processing
- Supports submissions in **Python**, **Java**, **C++**, **JavaScript**, and **Ruby**.
- Achieves **99.3% test case accuracy**, ensuring reliability in code evaluation.

### Distributed Judge System
- Built using the **Judge0 API**.
- Implements **load balancing** and **caching**, allowing the system to handle **200 submissions per minute** concurrently.

### Community Contribution Framework
- Enables vetted users to contribute **Data Structures and Algorithms (DSA)** problems.
- Includes mechanisms for problem review and validation to maintain quality.

---

## System Architecture

### Front-End
- Built using **ReactJS** for dynamic and responsive user interfaces.
- Communicates with the back-end through RESTful APIs.

### Back-End
- Developed using **Node.js** and **Express.js** for server-side logic.
- Integrated **Judge0 API** for code compilation and execution.

### Database
- Uses **MongoDB** for storing user data, problem sets, and submission history.
- Implements schema validation for structured and consistent data storage.

---

## API Design
- RESTful API design with endpoints for:
  - Submitting code.
  - Retrieving results and submission history.
  - Managing user profiles and problem contributions.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/coding-platform.git
   ```
2. Navigate to the project directory:
   ```bash
   cd coding-platform
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Configuration
1. Set up a **MongoDB** database and obtain the connection URL.
2. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=<your-mongodb-connection-url>
   JUDGE0_API_KEY=<your-judge0-api-key>
   ```

---

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Access the platform in your browser at:
   ```
   http://localhost:3000
   ```

---

## Future Enhancements
- Extend language support to include additional programming languages.
- Implement a ranking and reward system for problem contributors and solvers.
- Add real-time code collaboration features for team-based problem solving.

