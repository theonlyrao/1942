function CollisionDetector() {
};

CollisionDetector.prototype.check = function(object1, object2){
    let all = object2.border
    object1.border.forEach(function(element1){
	all.push(element1);
    })

    function arrHasDupes( A ) { 
	var i, j, n;
	n = A.length;

	for (i=0; i<n; i++) {                
            for (j=i+1; j<n; j++) {          
		if (A[i]==A[j]) return true;
	    }}
	return false;
    }
    
    return arrHasDupes(all);
}


module.exports = CollisionDetector;
