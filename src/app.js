const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
   
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  
  const { title, url, techs } = request.body;

  const repository ={
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found."});
  }

  const current_likes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    url,
    title,
    techs,
    likes: current_likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).send();;
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
   const { id } = request.params;
  
    const repositoryLike = repositories.find(repository => repository.id == id);

    if(!repositoryLike){
      return response.status(400).send();
    }

    repositoryLike.likes += 1;

    return response.json(repositoryLike);
});

module.exports = app;
