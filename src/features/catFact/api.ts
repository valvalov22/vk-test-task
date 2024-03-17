import axios from "axios";

const catFactEndpoint = "https://catfact.ninja/fact";

export async function getCatFact() {
    const response = await axios.get(catFactEndpoint);
    return response.data;
}
