How to run it locally
Requirements
Node js and python

1 Clone this github repo

FRONTEND
1 Enter to client folder
2 Run "npm install" command
3 Create a .env file and define a variable called VITE_BACKEND_URI and assign to it 127.0.0.1:5000 as a value

SERVER
1 Enter to server folder
2 Run the "pip instqll -r requirements.txt" command
3 Create a .env file that has these values: AZURE_OPENAI_ENDPOINT=<AZURE_OPENAI_ENDPOINT> AZURE_OPENAI_KEY=<AZURE_OPENAI_KEY>
4 run python main.py to start the server
