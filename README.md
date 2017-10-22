# Budget Tracker

To configure on prod:

- In `docker-compose.yml`:
    - Uncomment line #10 `- "/root/budget-tracker/ng2/dist:/usr/local/nginx/html"`
    - Comment line #11 `- "/Users/gdayton/Documents/budget-tracker/ng2/dist:/usr/local/nginx/html"`
    - Uncomment line #17 `- "/root/budget-tracker/node:/src"`
    - Comment line #18 `- "/Users/gdayton/Documents/budget-tracker/node:/src"`
- In `node/Dockerfile`:
    - Uncomment line #8 `VOLUME /root/budget-tracker/node:/src`
    - Comment #9 `VOLUME /Users/gdayton/Documents/budget-tracker/node:/src`
    - Uncomment line #16 `ENTRYPOINT ["npm", "start"]`
    - Comment #17 `ENTRYPOINT ["npm", "run", "dev"]`
- Add the `./Orgpoint-727a3f969956.json` file to `/node`