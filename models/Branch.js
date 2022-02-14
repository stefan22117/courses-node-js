import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    name: String,
    slug:String,
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
},{timestamps:true});

branchSchema.pre('save', function(next) {
  if(!this.slug){
    this.slug = this.name.toLowerCase().replace(" ", "-") 
  }
    next()
  });
export default mongoose.model("Branch", branchSchema);