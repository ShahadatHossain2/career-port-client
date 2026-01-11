export const myApplicationPromise = email => {
    return fetch(`http://localhost:5000/application?email=${email}`).then(res=>res.json());
}