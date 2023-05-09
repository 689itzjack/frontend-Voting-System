//UNPRIVATE ROUTES
export const REGISTER = '/register';
export const LOGOUT = '/login';
export const LOGIN = '/login';

//PRIVATE ROUTES STUDENT
export const HOME = '/*';
export const COURSE = '/course/:nameCourse/:idCourse/:addrCourse';

//PRIVATE ROUTES ADMIN
export const NEWCOURSE = '/addNewCourse';
export const RES_COURSE = '/resultsOfCourse';
export const ADDED_COURSES = '/addedCourses'

//ERROR ROUTES
export const ERROR404COURSE = '/error404';
export const ERROR404_NOPAGE = '/errorNopageFound';
