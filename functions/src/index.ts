// import * as v2 from 'firebase-functions/v2'
import * as v1 from 'firebase-functions/v1'


// type Indexable = { [key: string]: any }

// // example 1 https request
// export const helloworld = v2.https.onRequest((request, response) => {
//     const name = request.params[0].replace('/', '')
//     const items: Indexable = { lamp: 'this is a lamp', table: 'this is a table', chair: 'this is a chair' }
//     const message = items[name]

//     response.send(`<h1>${message}</h1>`)
// })


// // example 2 https request
// export const testing = v2.https.onRequest((request, response) => {
//     response.send(`<h1>testing new functions</h1>`)
// })

// // example 3 https request
// export const toTheDojo = v2.https.onRequest((request, response) => {
//     response.redirect('https://www.youtube.com')
// })

// // example 4 http callable functions
// export const sayHello = v2.https.onCall(
//     (data, context) => {
//         return `hello my friends`
//     })

// example 5 background triggers auth trigger

export const onUserCreate = v1.auth.user().onCreate((user) => {
    console.log('user created', user.uid, user.phoneNumber)
})


export const onUserDelete = v1.auth.user().onDelete((user) => {
    console.log('user delete', user.uid, user.phoneNumber)
})

