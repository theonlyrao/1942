function CollisionDetector() {
};

CollisionDetector.prototype.check = function(object1, object2){
  let all = object1.border.concat(object2.border)
  if (object1.status === "alive" && object2.status === "alive" && Math.abs(object1.x - object2.x) < 9 && Math.abs(object1.y - object2.y) < 26) {
    return checkForDups(all);
  }
}

var checkForDups = function(array) {
    var i, j, n;
    n = array.length;

    for (i=0; i<n; i++) {
        for (j=i+1; j<n; j++) {
	    if (String(array[i]) === String(array[j])) return true;
	}}
    return false;
}



module.exports = CollisionDetector;
