# CSV Challenge - Fullstack Application

<img src='./screenshot.png'>

Live Demo: [CSV Challenge](https://csv-challenge.vercel.app/)

> _Disclaimer: The details of the original challenge have been modified for privacy._

The CSV Challenge is a fullstack application designed to handle CSV file uploads and provide search functionality. This project demonstrates the use of a monorepo setup to manage both frontend and backend codebases.

## Project Description

This project aims to build a robust fullstack application that allows users to upload a CSV file and search through its contents. The monorepo structure ensures a cohesive development experience, integrating the frontend and backend parts of the application.

## Tools used

- **React.js**: For building the user interface
- **React Query**: For data fetching and caching
- **Node.js**: Backend runtime environment
- **Express**: Server framework
- **Papaparse**: CSV parsing library
- **Vite**: Frontend build tool
- **Vitest**: Testing framework for the frontend
- **Testing-Library**: For frontend testing utilities
- **Playwright**: End-to-end testing library

## Technical Hurdles

### Parsing CSV Files

One of the initial challenges was parsing the CSV files efficiently. In a previous project, I used the Papaparse library to parse CSV files from Google Sheets, finding it very user-friendly. For this project, Papaparse once again proved invaluable in handling CSV file uploads and parsing.

### Backend Development

Building the backend was another significant challenge. It involved setting up a server with Node.js and Express, managing routing, and implementing proper error handling. This process taught me a lot about server-side development and how to create a robust backend infrastructure.

### Frontend Testing with Vitest

Learning to use Vitest for frontend testing was both challenging and rewarding. Understanding how Testing-Library works with Vitest, especially the `render` and `screen` functions, was a key part of this learning experience. This challenge helped me gain confidence in writing and running tests.

### End-to-End Testing with Playwright

Playwright, a modern end-to-end testing library by Microsoft, was another tool I learned to use during this project. The `codegen` feature of Playwright accelerated the initial setup of my end-to-end tests. Fine-tuning these tests to include appropriate assertions and locators enhanced my understanding and capability in writing good quality e2e tests.

### Data Fetching with React Query

To practice using React Query, I integrated it for data fetching and caching. This addition increased my proficiency and confidence in using React Query for future projects.

## Conclusion

This project has been a fun and insightful challenge, allowing me to tackle various technical hurdles and improve my skills in fullstack development, testing, and data handling. Using React, Node.js, and various testing libraries has made this project both educational and rewarding.

## Thanks for reading!

- [Facundo Perez Montalvo](https://facuperezm.com)

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://facuperezm.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/facuperezm/)
[![github](https://img.shields.io/badge/github-555?style=for-the-badge&logo=github&logoColor=white)](https://github.com/facuperezm)
