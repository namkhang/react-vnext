npm i && cp .env.dev4.example .env && npm run build && pm2 delete training-team-4 || : && pm2 start 'npm -- start' --name training-team-4
