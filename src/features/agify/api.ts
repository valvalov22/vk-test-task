import axios from "axios";

const agifyEndpoint = (name: string) => `https://api.agify.io/?name=${name}`;

export async function getAgifyAge(name: string) {
    const response = await axios.get(agifyEndpoint(name));
    return response.data;
}
