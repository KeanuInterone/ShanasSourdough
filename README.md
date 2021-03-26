# ShanasSourdough

## Start up

* Rename `dev.env.sample` to just `dev.env`
  * inside that file replace the `JWT` key with a secret if you'd like

* Then run `docker-compose up --build`

* Take a gander at `localhost:3000`

## Start up for development 

* For development we'll want to see the changes we make in the code hot-reloaded into the browser

* To do this uncomment the volumes in `docker-compose.yml` file for the `frontend` and `backend` services

* Then we also want to `cd` into the `frontend` and `backend` and run `npm install`

* Then we can run `docker-compose up --build` and check out `localhost:3000`
