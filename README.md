### MFLIX

## Description du projet
Ce projet permet d'exploiter l'architecture CLOUD de MongoDB connue par ATLAS afin de la lier
à ce projet en NextJS et de créer des routes API ainsi qu'une documentation Swagger pour pouvoir les exploiter.

## Base de données
La base de données est déployée sur un cluster ATLAS de MongoDB, on se base sur les collections existantes de films ("movies") et commentaires ("comments") pour manipuler les données


## Documentation API (Swagger)
Toutes les routes API sont situés dans le dossier pages/api
Le swagger permet d'avoir une interface graphique permettant d'effectuer des traitements sur les deux collections dans MongoDB.
Les méthodes GET permettent de lire un document ou plusieurs.
Les méthodes POST permettent d'ajouter un commentaire ou un film.
Les méthodes PUT permettent de mettre à jour un ou plusieurs champs d'un document d'une collection.
Les méthodes DELETE permettent de supprimer des documents de l'une des deux collections.


## Services
Pour toutes les routes api, les méthodes permettant les manipulations de la base de données sont factorisés. Pour la recherche de commentaires, au lieu de se baser sur l'id_movie et id_comment, j'ai choisi de me concentrer uniquement sur l'id du commentaire afin de pouvoir utiliser les même méthodes "utils" que pour les maniipulations sur les films
