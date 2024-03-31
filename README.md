# Project Setup Guide

This guide outlines the steps needed to run the application locally, including both the frontend and server setup. Before you start, ensure you have Node.js and Python installed on your machine.

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
- **Python**: Python is required for running the server. Download it from [Python's official website](https://python.org/).

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

First, clone the repository to your local machine using the following Git command:


Replace `<REPO_URL>` with the actual URL of the GitHub repository.

### Frontend Setup

Navigate to the client folder and set up the frontend:

#### Install Dependencies

Run the following command to install the necessary dependencies:

#### Environment Configuration

Create a `.env` file in the root of the client directory. Add the following line to define the backend URI:


### Server Setup

Now, set up the server by navigating to the server folder:


#### Install Python Dependencies

Install the required Python packages using pip:


#### Environment Configuration

Create a `.env` file in the root of the server directory with the following contents, replacing placeholders with your actual Azure OpenAI endpoint and key:

#### Starting the Server

Run the following command to start the server:


## Running the Application

With the server running, you can now start the frontend by navigating to the client directory and running:

Copy code




