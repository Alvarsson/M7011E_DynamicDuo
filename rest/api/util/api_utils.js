/* This function will return true if all required fields are present.
Req: a http request (or similar structure)
check: the fields to be checked, you can get these from X <- TODO
*/


module.exports.validBody = function(req, check){
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
  }

  module.exports.isManager = function(req) {
    if (req.body.id != "Manager") {
      return false;
    } else {
      return true;
    }
  }
