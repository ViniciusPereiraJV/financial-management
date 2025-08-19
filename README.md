# 📊 Financial Management

A complete personal financial management system designed to help users track their income, expenses, and overall financial health.  

The project is divided into two parts:  
- **Frontend** built with Next.js for the user interface.  
- **Backend** built with Node.js + Express for handling API requests and business logic.  

MongoDB is used as the database to persist all financial data in a flexible and scalable way.

---

## 🚀 Technologies

- **Frontend**: [Next.js](https://nextjs.org/)  
  A React-based framework that provides server-side rendering, static site generation, and optimized performance for building modern web applications.  

- **Backend**: [Node.js + Express](https://expressjs.com/)  
  Node.js provides the runtime environment, while Express is a lightweight framework for building APIs and handling HTTP requests/responses.  

- **Database**: [MongoDB](https://www.mongodb.com/)  
  A NoSQL database used to store user information, financial transactions, and reports.  

- **Dependency Management**: [npm](https://www.npmjs.com/)  
  Node Package Manager used to manage and install dependencies for both frontend and backend.

---

## 📁 Project Structure

financial-management/
├── front-end/ # Next.js application (UI)
├── back-end/ # Node.js + Express API
├── .gitignore # Ignored files and folders

---


## ✨ Features

- Add, edit, and delete income and expense transactions  
- Store financial data securely in MongoDB  
- RESTful API for financial operations (backend)  
- Responsive UI with modern frontend design  
- Environment variable support for secure configuration  

---

## 📌 Future Improvements

- Implement user authentication and authorization  
- Add financial reporting and visualization (charts, graphs)  
- Export data to CSV or PDF  
- Multi-language support (English, Portuguese, etc.)  
- Deployment with CI/CD pipelines (Vercel, Railway, Render)  

---

## 🛠️ Usage Instructions

```bash
# Clone the repository
git clone https://github.com/ViniciusPereiraJV/financial-management.git
cd financial-management

# Install frontend dependencies
cd front-end
npm install

# Install backend dependencies
cd ../back-end
npm install
Create a .env file in both frontend and backend directories:
# back-end/.env
MONGO_URI=mongodb://localhost:27017/financial_management
PORT=5000

# front-end/.env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run the backend:
cd ../back-end
npm run dev
Run the frontend:
cd ../front-end
npm run dev

🌍 Access

Frontend: http://localhost:3000

Backend: http://localhost:5000

