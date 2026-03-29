# 📚 The Cozy Corner

> An aesthetic online bookstore built with React, Vite, and Firebase.

![The Cozy Corner preview](https://via.placeholder.com/800x400?text=The+Cozy+Corner)

The Cozy Corner is a beautifully designed, modern e-commerce platform for book lovers. Built with performance and user experience in mind, it offers a seamless shopping experience for manga, comics, and encyclopedias.

## ✨ Features

- **Modern & Cozy UI**: A premium user interface with a relaxing "Milky Way" canvas background.
- **AI Bookstore Assistant (CozyBot)**: An integrated chatbot powered by Hugging Face to answer your reading-related questions.
- **Shopping Cart & Checkout**: Add books to your cart and place orders.
- **User Authentication**: Mock login system (with a Quick Guest feature) storing order history.
- **Order Tracking**: Profile page displaying recent orders and estimated delivery dates.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Custom vanilla CSS with smooth animations
- **Backend & Database**: Firebase (for authenticated order storage)
- **AI Integration**: Hugging Face Inference API (`flan-t5-base`)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Firebase](https://firebase.google.com/) account (for storing orders)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mokshith01206/THE-COZY-CORNER.git
   cd THE-COZY-CORNER
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environmental variables:
   Create a `.env` file in the root directory and add your Hugging Face token (if you want the chatbot to respond using the live API):
   ```
   VITE_HF_TOKEN=your_hugging_face_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Curated for cozy nights, rainy days and long weekends.*
