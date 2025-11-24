# DevFest Ajah AI Assistant

A secure, scalable full-stack web app built for the "Angular Meets AI" DevFest talk.

## Overview

- **Frontend**: Angular 21 + Ng Zorro
- **Backend**: Node.js + Express + TypeScript
- **AI**: Google Gemini 3 (via backend)

## Prerequisites

- Node.js (LTS)
- npm

## Setup

1.  **Clone the repository**
2.  **Install dependencies**

    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `server` directory with the following:
    ```env
    PORT=3000
    GEMINI_API_KEY=your_api_key_here
    GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com
    ```

## Running the App

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm start
```

## Features

- **Dashboard**: Overview of the assistant.
- **AI Chat**: Chat with Gemini 3 about development topics.
- **Code Helper**: Get AI suggestions for your code snippets.
