// building an express API from scratch 
// 1. install express 
        // npm i express

// 2. import express library 
        // to to do it the es6 way we need to go to package.json to let javascript know that we are in es6
import express from 'express'

// 3. create the express server 
        // initialize express server
const app = express ()
        // jump to step 5
app.use(express.json()) // this is necessary for when running the app.post in postman 

// 4. define your routes and REQUEST that are allowed and for express to RESPOND to 
            //skeleton for defining routes/requests 
            // app.get (something, (request, response) => {
                //do something.. 
                //response.send()  
            // })

app.get('/hello', (request,response) => { // every function that handles a request for an API request they are going to have at least two parameters IN THAT ORDER or also known as req, res for convention
    //do something... 
    response.send('Hello World!') //attach a status that is by default // response will automatically attach the 200 status unless otherwide stated // response.status(200).send('Hello World') // the .status(200) doesn't need to be there.
        // 200 something = OK 
        // 400 something= user did something that is not right 
        // 401 = not found 
        // 300 something = redirected  
        // 500 somthing = something is not right ex.server error, etc.
})

const students = [//creating an array called students 
    {firstName: 'Jonathan', lastName: 'Vegas'},
    {firstName: 'Bridgette', lastName: 'Lemus'},
    {firstName: 'Mason', lastName: 'Madaras'},
    {firstName: 'Logan', lastName: 'McCalley'},
]

app.get('/students', (request, response) => {
    response.send(students) // when responding express will send this array back as a json file. // if we wanted to be 100% sure it responds as json file we could also response.json(students)
})

app.get ('/students/:firstName', (request, response) => {
   const student = students.find(stud => stud.firstName === request.params.firstName) // advanced array method // .find is going to take a callback //
   if (!student) {
    response.status(404).send({ message: 'Student not found', success:false }) // if we don't want the response to be okay then we have to identify the status 
    return
    }
response.send(student)
})

// post, put, and delete can all get done the same but we cannot test them from chrome 
// add a new student (in theory)
app.post('/students', (request, response) => {
    const newStudent = request.body
    students.push(newStudent)
    response.status(201).send(students)
})


// 5. listen on a port 
app.listen(3001, () => { // app.listen is what we use to tell express to start listening on a port
    console.log ('Now listening on port 3001') // this is without setting it as a variable and hard coding it in which you must change it in two places which isn't DRY 
}) 
