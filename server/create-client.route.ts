import { Request, Response } from 'express';
import { CLIENTS } from './db-data'; // Assuming this is where the client data is stored

export function createClient(req: Request, res: Response): Response<any, Record<string, any>> | undefined {
    console.log("Request Body:", req.body); // Log to check the request data

    // Ensure CLIENTS.data exists
    if (!CLIENTS.data) {
        CLIENTS.data = [];
    }

    // Create new client data with a new unique clientId
    const newClient = {
        clientId: CLIENTS.data.length > 0
            ? Math.max(...CLIENTS.data.map((client: any) => client.clientId)) + 1
            : 1,
        ...req.body // Spread the request body to include all fields
    };

    console.log("New Client Data:", newClient); // Log the new client data for debugging

    // Check if the required fields are present
    // if (!newClient.contactPersonName || !newClient.companyName) {
    //     return res.status(400).json({
    //         message: "Client creation failed. Missing required fields.",
    //         result: false,
    //         data: {}
    //     });
    // }

    // Add the new client to the data array
    CLIENTS.data.push(newClient);

    // Respond with success and the updated list of clients
    return res.status(200).json({
        message: "Client added successfully",
        result: true,
        data: CLIENTS.data
    });
}
