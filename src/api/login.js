
const baseURL = apps.Route;

export async function checkLoggedInUser(payload){
    return request(`${baseURL}/login/login`, {
        method: "Post",
        body: {
            ...payload,
        },
    });
}