# Personal Finance Dashboard

**Web Application**  


## Table of Contents
- [Description](#description)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Containerization & Deployment](#containerization--deployment)  
- [CI/CD](#cicd) 

---

## Description
Managing personal finances can often be overwhelming with multiple income sources, expenses, and savings goals to track.  

This project is a **web application** that helps users visualize and manage their finances in one place. Users can input income and expenses, track budgets, set savings goals and get personalized financial tips.  

---

## Features
1. **Dashboard Creation**  
   - User-friendly interface to input and categorize income and expenses (e.g., rent, groceries, salary).  
   - Visual representation of financial data using charts and graphs.  

2. **Expense Tracking**  
   - Tracks recurring expenses automatically (e.g., rent, subscriptions).  
   - Set budget limits per category and receive notifications when limits are approached or exceeded.  

3. **Savings Goals**  
   - Users can set savings goals (e.g., for a new laptop) and monitor progress with progress bars or visual indicators.  

4. **Bonus Feature (Hard)**  
   - Personalized financial tips based on spending habits (e.g., suggesting cooking at home if dining expenses are high).  

5. **Containerization**  
   - Runs in Docker containers with all dependencies isolated.  
   - Sensitive information stored in `.env` files.  

6. **Multi-Service Setup**  
   - Separate containers for backend and database to simplify deployment.  

7. **Cloud Deployment**  
   - Application can be deployed to Azure (free credits available for NITK EDU ID).  

8. **CI/CD Pipeline**  
   - Automatically builds Docker images, pushes to Docker Hub or GitHub Container Registry, and deploys to the cloud.  

---

## Tech Stack
- **Frontend:** React, Chart.js  
- **Backend:** Express (or your chosen backend)  
- **Database:** Firebase / PostgreSQL 
- **Containerization:** Docker, Docker Compose  
- **Deployment:** Azure  
- **CI/CD:** GitHub Actions or GitLab CI  

---

## Installation
1. Clone the repository:  
```bash
git clone <your-repo-url>
cd personal-finance-dashboard
