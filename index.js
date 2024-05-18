const mongoose =require('mongoose');

mongoose.connect('mongodb://127.0.0.1/testDatabase') // localhost of Database
.then(()=>console.log('Connection is successful'))
.catch(err=>console.error('Connection is failed',err))  

// Schema in Mongodb

const CourseSchema = new mongoose.Schema({
      name : String,
      creator : String,
      publishedDate : {type:Date, default:Date.now},
      isPublished : Boolean,
      rating : Number

})


// Model of schema
 const Course = mongoose.model('Course', CourseSchema)

 async function createCourse(){
    const course = new Course({
        name : 'Go',
       creator : 'Jhon',
        isPublished : false,
        rating : 2.8
     })
    
    
    const save =  await course.save()
   console.log(save)
 } // creating a data

  createCourse()

 async function getCourse(){
      const courses = await Course.find({rating : {$in : [2.8,4]}}).or([{creator : 'Sagar'},{rating : 1}])
      console.log(courses)
 } // reading a data
  getCourse()

async function updateCourse(id){
      const coursed = await Course.findById(id)
      if(!coursed) return ;

      coursed.name = "Swift"
      coursed.creator = "Adam"

      const updatedCourse =  await coursed.save()
      console.log(updatedCourse)

}
 updateCourse('6644635adf548af925be61dd') // update data


// delete a data

async function deleteCourse(id){
      let coursed = await Course.findByIdAndDelete(id)
      console.log(coursed)
}
deleteCourse('664464156988006c63b4ee5d')
