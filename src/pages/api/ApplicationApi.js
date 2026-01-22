export const myApplicationPromise = email => {
    return fetch(`https://career-port-server.onrender.com/application?email=${email}`, {
        credentials: 'include'
    }).then(res=>res.json());
}

export const myJobPostPromise = (email, 
accessToken) => {
    return fetch(`https://career-port-server.onrender.com/job?email=${email}`, {
        credentials: 'include',
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res=>res.json());
}
export const myJobPostFullPromise = (email, accessToken) => {
    return fetch(`https://career-port-server.onrender.com/job/application?email=${email}`, {
        credentials: "include",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res=>res.json());
}