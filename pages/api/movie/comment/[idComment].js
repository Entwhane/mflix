import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from 'mongodb';
import { MongoConfig } from "../../../config/mongoconfig";
import { OrmService } from "../../../../services/OrmService";


/**
 * @swagger
 * /api/movie/comment/{idComment}:
 *   get:
 *     description: Retourne un commentaire par son identifiant
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire retrouvé avec succès
 *       400:
 *         description: idComment n\'est pas renseigné
 *       404:
 *         description: Commentaire non trouvé
 *   post:
 *     description: Ajoute un commentaire associé à un film
 *     tags: [Commentaires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès
 *       404:
 *         description: Commentaire non trouvé
 *   put:
 *     description: Met à jour un commentaire par son identifiant
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: false
 *               email:
 *                 type: string
 *                 required: false
 *               text:
 *                 type: string
 *                 required: false
 *               date:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Commentaire modifié avec succès
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Aucune modification apportée
 *   delete:
 *     description: Supprime un commentaire par son identifiant
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Aucune suppression apportée
 */
export default async function handler(req, res) {
    const { method, query, body } = req
    const { idComment } = query

    try {
        switch (method) {
            case 'GET':
                if (idComment) {
                    // const comment = await collection.findOne({ _id: ObjectId(idComment), movie_id: ObjectId(idMovie) });
                    const comment = await OrmService.connectAndFindOne(MongoConfig.collections.comments, idComment);
                    if (comment) {
                        res.status(200).json({ status: 200, message: 'Commentaire retrouvé avec succès', data: comment });
                    } else {
                        res.status(404).json({ status: 404, message: 'Commentaire non trouvé' });
                    }
                } else {
                    res.status(400).json({ status: 400, message: 'Erreur' });
                }
                break;

            case 'POST':

                const { name, email, text, movie_id } = body;

                if (movie_id) {

                    const myComment = {
                        name: name,
                        email: email,
                        movie_id: new ObjectId(movie_id),
                        text: text,
                        date: new Date()
                    }

                    const result = await OrmService.connectAndPostOne(MongoConfig.collections.comments, myComment);
                    res.status(201).json({ status: 201, message: 'Commentaire ajouté avec succès', result: result });
                } else {
                    res.status(404).json({ status: 404, message: 'Film non trouvé' });
                }
                break;

            case 'PUT':

                if (idComment) {
                    // const result = await collection.updateOne({ _id: ObjectId(idComment), movie_id: ObjectId(idMovie) }, { $set: body });
                    const result = await OrmService.connectAndPutOne(MongoConfig.collections.comments, idComment, body);
                    if (result.modifiedCount > 0) {
                        res.status(200).json({ status: 200, message: 'Commentaire modifié avec succès', result: result });
                    } else {
                        res.status(404).json({ status: 404, message: 'Aucune modification apportée' });
                    }
                } else {
                    res.status(400).json({ status: 400, message: 'Identifiant invalide' });
                }
                break;

            case 'DELETE':

                if (idComment) {
                    // const result = await collection.deleteOne({ _id: ObjectId(idComment), movie_id: ObjectId(idMovie) });
                    const result = await OrmService.connectAndDeleteOne(MongoConfig.collections.comments, idComment);
                    if (result.deletedCount > 0) {
                        res.status(200).json({ status: 200, message: 'Commentaire supprimé avec succès', result: result });
                    } else {
                        res.status(404).json({ status: 404, message: 'Aucune suppression apportée' });
                    }
                } else {
                    res.status(400).json({ status: 400, message: 'Identifiant invalide' });
                }
                break;

            default:
                res.status(405).json({ message: 'Méthode non autorisé' });
                break;
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}