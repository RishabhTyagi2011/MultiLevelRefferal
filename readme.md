# Multi-Level Referral and Earning System

This project implements a backend system for managing multi-level referrals, real-time profit sharing, and notifications. It uses **Node.js**, **Express**, **PostgreSQL**, and **Socket.IO** to achieve scalable and efficient functionality.

---

## Features

- **Multi-Level Referral Management**:
  - Support for up to 8 direct referrals per user.
  - Profit sharing logic across two levels:
    - **Level 1**: 5% of direct referrals' purchases.
    - **Level 2**: 1% of indirect referrals' purchases.
- **Real-Time Updates**:
  - Live earnings notifications using **WebSockets** via **Socket.IO**.
- **Database Integration**:
  - PostgreSQL is used for storing users and earnings with robust relationship tracking.
- **API Endpoints**:
  - Register users, record purchases, and fetch earnings or referral trees.
- **Validation**:
  - Profits are applied only for purchases exceeding 1000Rs.
- **Scalability**:
  - Handles referral hierarchies, invalid scenarios, and inactive users efficiently.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Real-Time Notifications**: Socket.IO

---

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/) (v14 or above recommended).
2. Install [PostgreSQL](https://www.postgresql.org/download/).
3. Install `npm` packages as listed in the **Installation** section.

---

## Installation

1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database:
   - Create a PostgreSQL database and user:
     ```sql
     CREATE DATABASE referral_system;
     CREATE USER referral_user WITH PASSWORD 'your_password';
     GRANT ALL PRIVILEGES ON DATABASE referral_system TO referral_user;
     ```
   - Update the db file with your database details:

4. Run database migrations (if using Sequelize migrations):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the server:
   ```bash
   node index.js
   ```

---

## API Endpoints

### User Management

- **Register User**
  ```
  POST /api/users/register
  Body: { name, email, referral_code, referred_by }
  ```

### Earnings

- **Record a Purchase**
  ```
  POST /api/earnings/purchase
  Body: { user_id, purchase_amount }
  ```

- **Fetch User Earnings**
  ```
  GET /api/earnings/:user_id
  ```

- **Fetch Referral Tree**
  ```
  GET /api/users/:user_id/referral_tree
  ```

---

## Real-Time Notifications

Earnings updates are sent in real-time to users using **Socket.IO**. Clients connected to the WebSocket server will receive notifications whenever they earn from direct or indirect referrals.

---