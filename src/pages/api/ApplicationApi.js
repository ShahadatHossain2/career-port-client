export const myApplicationPromise = email => {
    return fetch(`http://localhost:5000/application?email=${email}`, {
        credentials: 'include'
    }).then(res=>res.json());
}

export const myJobPostPromise = (email, 
accessToken) => {
    return fetch(`http://localhost:5000/job?email=${email}`, {
        credentials: 'include',
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res=>res.json());
}
export const myJobPostFullPromise = (email, accessToken) => {
    return fetch(`http://localhost:5000/job/application?email=${email}`, {
        credentials: "include",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(res=>res.json());
}