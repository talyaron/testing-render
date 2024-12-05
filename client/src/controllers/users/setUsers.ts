import { Client } from "../../model/userModel";

export const registerToDB = async (clientData: Client) => {
    try {
        const response = await fetch('http://localhost:3000/api/clients/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error setting user:', error);
        throw error;
    }
};