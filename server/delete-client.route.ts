import {Request, Response} from 'express';
import {CLIENTS, COURSES} from "./db-data";

// export function deleteClient(req: Request, res: Response) {
//     console.log("Deleting client ...");

//     // Parse clientId as a number
//     const id = parseInt(req.params["clientId"], 10);

//     // Check if the parsed id is valid
//     if (isNaN(id) || id < 0 || id >= CLIENTS.length) {
//         return res.status(400).json({ error: "Invalid clientId" });
//     }

//     // Remove the client at the given id
//     const deletedClient = CLIENTS.splice(id, 1); // Removes the client and returns it

//     setTimeout(() => {
//         res.status(200).json({ deletedClient });
//     }, 2000);
// }



export function deleteClient(req: Request, res: Response) {

    console.log("Deleting client ...");

    const id = parseInt(req.params["clientId"], 10);

    const deletedClient = CLIENTS.data.splice(id, 1);

    setTimeout(() => {

      res.status(200).json({deletedClient});

    }, 2000);

}