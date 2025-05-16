# 📜 Random Quote Generator

A sleek and minimalist React application that displays random quotes using the [ZenQuotes API](https://zenquotes.io). Users can generate new quotes, save their favorites, and share them directly to Twitter.

![App Screenshot](screenshot.png)

## 🚀 Features

- 🎲 Fetches random inspirational quotes
- 💾 Save your favorite quotes to local storage
- 🐦 Share quotes on Twitter with one click
- 🌈 Beautiful UI with TailwindCSS
- 🔄 Loading state with disabled button
- 🗑️ Option to delete saved quotes

## 📦 Tech Stack

- **React** (with Hooks)
- **TailwindCSS**
- **LocalStorage**
- **ZenQuotes API** (via proxy to bypass CORS)

## 🛠️ Installation

```bash
git clone https://github.com/udaykallam/Random-Quote-Generator.git
cd Random-Quote-Generator
npm install
npm run dev

## 🧠 How It Works

- On initial render, the app fetches a random quote using a proxy server to bypass CORS restrictions.
- The fetched quote and author are stored in the component state.
- Users can generate a new quote by clicking the **"New Quote"** button.
- Favorite quotes can be saved locally, and they persist across sessions using **localStorage**.

## ⚙️ Environment Notes

If you encounter an error like:  
`"Too many requests. Obtain an auth key..."`, you can:

- 🔑 Register for an API key at [zenquotes.io](https://zenquotes.io)
- 🛡️ Replace the public proxy with your own backend proxy to avoid rate limits.
- 🧠 Implement caching to reduce the number of API calls and improve performance.
