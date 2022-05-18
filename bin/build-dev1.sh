npm i && cp .env.dev1.example .env && npm run build && pm2 delete training-team-1 || : && pm2 start 'npm -- start' --name training-team-1
