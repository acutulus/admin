/*
	Inserts non-essential dependencies into the dom after page is fully loaded
*/
//ADD DEPENDENCYS HERE IF MORE ARE NEEDED
var kepsAsyncDependencies = [
	             '/lib/intl-tel-input/lib/libphonenumber/build/utils.js',
	            '/lib/intl-tel-input/build/js/intlTelInput.min.js'];

//resolve location of ngkeps, so src attribute points to correct path
var findScripts = document.scripts;
var ngKepsLocation;
for(var i = 0; i < findScripts.length; i++){
	if(findScripts[i].src.indexOf("ngkeps") > -1){
		ngKepsLocation = findScripts[i].src.slice(0, findScripts[i].src.indexOf("ngkeps") + 6);
	}
}

var addKepsDependency = function(src){
	var s = document.createElement('script');
	s.setAttribute("src", src);
	document.body.appendChild(s);
}
document.addEventListener("DOMContentLoaded", function(event){
	for(var i = 0; i < kepsAsyncDependencies.length; i++){
		addKepsDependency(ngKepsLocation+kepsAsyncDependencies[i]);
	}
});

