/* This function will return true if all required fields are present.
Req: a http request (or similar structure)
check: the fields to be checked, you can get these from X <- TODO
*/


module.exports.validBody = function(req, check){
  try{
      for(const [key,value] of check.entries()){
        if(typeof value == 'object'){
          var valid = this.validBody(req[key], value); // call on inner object
          if(!valid){
            console.log("NOT VALID: ", key, value);
            return false;
          }
        } else{ // no nested under this
          if(req[key] == undefined){
            console.log("GOT UNDEFINED on ", key);
            return false;
          }
        }
      }
      return true;
    } catch(error) {
      console.log("Body validation failed, please check your input.");
      return false;
    }
  }
