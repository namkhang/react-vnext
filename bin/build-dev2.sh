npm i && cp .env.dev2.example .env && npm run build && pm2 delete training-team-2 || : && pm2 start 'npm -- start' --name training-team-2
