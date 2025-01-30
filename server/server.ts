

import * as express from 'express';
import {Application} from "express";
import {searchLessons} from "./search-lesson.route";
import {getAllCourses} from "./get-courses.route";
import { getAllClients } from './get-clients.route';
import { createClient } from './create-client.route';
import { deleteClient } from './delete-client.route';
import { createCourse } from './create-course.route';


const app: Application = express();

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/courses').get(getAllCourses);
app.route('/api/lessons').get(searchLessons);
app.route('/api/client').post(createClient);
app.route('/api/clients').get(getAllClients);
app.route('/api/course').post(createCourse);
app.route('/api/client/:id').delete(deleteClient);




const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});