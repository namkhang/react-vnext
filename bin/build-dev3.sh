npm i && cp .env.dev3.example .env && npm run build && pm2 delete training-team-3 || : && pm2 start 'npm -- start' --name training-team-3
