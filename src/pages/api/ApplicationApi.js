export const myApplicationPromise = email => {
    return fetch(`http://localhost:5000/application?email=${email}`).then(res=>res.json());
}

export const myJobPostPromise = email => {
    return fetch(`http://localhost:5000/job?email=${email}`).then(res=>res.json());
}