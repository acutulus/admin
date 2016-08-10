angular.module('ngKeps', [])

.filter('keys', function() {
  return function(input) {
    if (!input) {
      return [];
    }
    return Object.keys(input);
  };
});


// add sync to restService and socketService


// finish sync
// test new sync code
// look at sync tree defaults
// make db admin flex and more like database
// make ajax content have contentToFind contentToReplace Animation(start with slide up, down, left, right)

angular.module("ngKeps").run(["$templateCache", function($templateCache) {$templateCache.put("../templates/authModal.html","<div class=\"model\" style=\"width:400px\" ng-class=\"{\'shake\': shakeForm}\"><div class=\"\" ng-show=\"!user\"><div class=\"\" ng-show=\"show==\'login\'\"><h4 class=\"modal-title\">Login</h4><hr><form name=\"loginForm\" data-ng-submit=\"signin(\'local\')\"><div class=\"form-group\"><label>Email</label><input type=\"email\" class=\"form-control\" ng-model=\"login.username\" required placeholder=\"Your Email\"></div><div class=\"form-group\"><label>Password</label><input type=\"password\" class=\"form-control\" ng-model=\"login.password\" required placeholder=\"Your Password\"></div><div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-6\"><p class=\"help-block\"><a ng-click=\"showForgottenPassword()\">Forgot password?</a></p></div></div></div><div class=\"alert alert-success alert-dismissible fade in\" ng-show=\"msgs.signedIn\">{{msgs.signedIn}}</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.error\">{{msgs.error}}</div><div class=\"form-group no-margin\" ng-if=\"config.oauth.google\"><button type=\"button\" ng-click=\"signin(\'google\')\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Log In With Google</button></div><div class=\"form-group no-margin\" ng-if=\"config.oauth.facebook\"><button type=\"button\" ng-click=\"signin(\'facebook\')\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Log In With Facebook</button></div><div class=\"form-group no-margin\" ng-if=\"config.register\"><button type=\"button\" ng-click=\"showRegister()\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Register</button></div><div class=\"form-group no-margin\"><button type=\"submit\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Log In</button></div></form><!-- form login --></div><div class=\"\" ng-show=\"show==\'register\'\"><h4 class=\"modal-title\">Register</h4><hr><form name=\"registerForm\" data-ng-submit=\"register()\"><div class=\"form-group\"><label>First name</label><input type=\"text\" class=\"form-control\" required ng-model=\"newUser.firstName\" required placeholder=\"first name\"></div><div class=\"form-group\"><label>Last name</label><input type=\"text\" class=\"form-control\" required ng-model=\"newUser.lastName\" required placeholder=\"last name\"></div><div class=\"form-group\"><label>Email</label><input type=\"email\" class=\"form-control\" ng-model=\"newUser.email\" required placeholder=\"Your Email\"></div><div class=\"form-group\"><label>Password</label><input type=\"password\" class=\"form-control\" ng-model=\"newUser.password\" required placeholder=\"Your Password\"></div><div class=\"form-group\"><label>Re-type Password</label><input type=\"password\" class=\"form-control\" ng-model=\"rePassword\" required placeholder=\"Re-type Your Password\"></div><!--Error/success messages --><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.passwordsDontMatch\">Passwords dont match.</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.passwordShort\">Password needs to be 7 or more characters.</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.formError\">Error in the form.</div><div class=\"alert alert-success alert-dismissible fade in\" ng-show=\"msgs.created\">You are registered!</div><div class=\"alert alert-warning alert-dismissible fade in\" ng-show=\"msgs.emailUsed\">Email has already been used to create an account</div><div class=\"alert alert-danger alert-dismissible fade in\" ng-show=\"msgs.error\">{{msgs.error}}</div><div class=\"white-space-10\"></div><div class=\"form-group no-margin\"><button type=\"button\" class=\"btn btn-default btn-theme\" ng-click=\"showLogin()\">Cancel</button> <button type=\"submit\" class=\"btn btn-theme btn-lg btn-t-primary btn-block\">Register</button></div></form><!-- form login --><hr><div class=\"text-center color-white\">By creating an account, you agree to {{config.name}}<br><a href=\"#\" class=\"link-white\"><strong>Terms of Service</strong></a> and consent to our <a href=\"#\" class=\"link-white\"><strong>Privacy Policy</strong></a>.</div></div><div class=\"\" ng-show=\"show==\'forgottenPassword\'\"><h4 class=\"modal-title\">Forgot Password</h4><hr><div class=\"form-group\"><label>Enter Your Email</label><input type=\"email\" class=\"form-control\" name=\"text\" placeholder=\"Email\"></div><hr><button type=\"button\" class=\"btn btn-default btn-theme\" ng-click=\"showLogin()\">Cancel</button> <button type=\"submit\" class=\"btn btn-success btn-theme\">Send</button></div><div class=\"\" ng-show=\"show==\'twofactor\'\"><h4 class=\"modal-title\">Two Factor Authentication</h4><hr><div class=\"form-group\"><label>Enter Your Email</label><input type=\"email\" class=\"form-control\" name=\"text\" placeholder=\"Email\"></div><hr><button type=\"button\" class=\"btn btn-default btn-theme\" ng-click=\"showLogin()\">Cancel</button> <button type=\"submit\" class=\"btn btn-success btn-theme\">Send</button></div><div class=\"\" ng-show=\"show==\'resetPassword\'\"><h4 class=\"modal-title\">Reset Password</h4><hr><div class=\"form-group\"><label>Password</label><input type=\"password\" class=\"form-control\" ng-model=\"newUser.password\" required placeholder=\"Your Password\"></div><div class=\"form-group\"><label>Re-type Password</label><input type=\"password\" class=\"form-control\" ng-model=\"rePassword\" required placeholder=\"Re-type Your Password\"></div><hr><button type=\"button\" class=\"btn btn-default btn-theme\" data-dismiss=\"modal\">Close</button> <button type=\"submit\" class=\"btn btn-success btn-theme\">Send</button></div></div><div class=\"col-md-12\" ng-show=\"user\"><p>Looks like your already signed in as {{user.username}}.</p><p><br><a ng-click=\"signout()\">sign out?</a></p></div><div style=\"display:none\"></div></div>");
$templateCache.put("../templates/form.html","<section><div ng-repeat=\"key in kepsData | keys\" ng-init=\"field = kepsData[key]\"><input-item keps-name=\"key\" keps-type=\"field\" keps-model=\"data.value[key]\" keps-label=\"{{ field.label }}\" keps-framework=\"{{kepsFramework}}\" keps-errors=\"kepsErrors[key]\"></div></section>");
$templateCache.put("../templates/bootstrapv3/address.html","<div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required && !data.subrequired\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label></div></div><div class=\"row\"><div class=\"col-xs-4\"><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.address1\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Address Line 1</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.address1\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.address1\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.address2\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Address Line 2</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.address2\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.address2\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.city\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">City</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.city\" ng-keydown=\"checkAddress()\" ng-required=\"data.subrequired && kepsType.required.city\"></div></div></div><div class=\"col-xs-4\"><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.region\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">State/Province/Region</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.region\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.region\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.postal\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Zip/Postal Code</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.postal\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.postal\"></div><div class=\"form-group\"><span ng-show=\"data.subrequired && kepsType.required.country\" style=\"color:red\">*</span><label class=\"{{kepsSubLabelClass}}\">Country</label><input class=\"form-control {{kepsInputClass}}\" type=\"text\" ng-model=\"data.value.country\" ng-readonly=\"kepsReadonly\" ng-required=\"data.subrequired && kepsType.required.country\"></div></div></div><div class=\"col-xs-4\"><p>Preview</p><br>{{data.value.address1 + \' \' + data.value.address2}}<br>{{data.value.city + \', \' + data.value.region + \' \' + data.value.postal}}<br>{{data.value.country}}</div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/array.html","<div class=\"row\"><div class=\"col-xs-12\"><div class=\"form-group {{kepsGroupClass}}\"><div class=\"{{kepsArrayClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label }}:</label><div class=\"list-group\"><div class=\"list-group-item\" ng-show=\"data.value.length > 0\"><div ng-repeat=\"item in data.value\"><div style=\"width:5%;margin-left:5%;display:inline-block\"><span>{{($index+1) + \'.\'}}</span></div><div style=\"width:79%;display:inline-block\"><input-item ng-repeat=\"(key,val) in kepsType.subSchema\" keps-name=\"key\" keps-label=\"\'\'\" keps-group-class=\"form-horizontal\" keps-type=\"val\" keps-model=\"item[key]\" keps-framework=\"kepsFramework\"></div><div style=\"width: 3%;display: inline-block;margin-right: 7%;line-height: 0px\"><a href=\"\" style=\"float:right\" ng-click=\"removeArrayItem($index)\"><span style=\"color:red;margin-left:15px\" class=\"glyphicon glyphicon-remove\"></span></a></div></div></div><div class=\"list-group-item\"><a href=\"\" style=\"\" title=\"add item\"><span style=\"color:green\" class=\"glyphicon glyphicon-plus-sign\" ng-click=\"addArrayItem()\"></span></a></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div></div>");
$templateCache.put("../templates/bootstrapv3/arraymulti.html","<div class=\"row\"><div class=\"col-xs-12\"><p></p><div class=\"form-group {{kepsGroupClass}}\"><div class=\"{{kepsArrayClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"\"><div class=\"list-group\"><div class=\"list-group-item\" ng-repeat=\"item in data.value track by $index\">{{$index + 1}} <a href=\"\" style=\"float:right\" ng-click=\"removeArrayItem($index)\"><span style=\"color:red;margin-left:15px\" class=\"glyphicon glyphicon-remove\"></span> </a><a href=\"\" style=\"float:right\" ng-click=\"showArrayItem[$index] = !showArrayItem[$index]\"><span ng-show=\"showArrayItem[$index]\" style=\"color:blue\" class=\"glyphicon glyphicon-eye-close\"></span> <span ng-show=\"!showArrayItem[$index]\" style=\"color:blue\" class=\"glyphicon glyphicon-eye-open\"></span></a><div ng-show=\"showArrayItem[$index]\"><input-item ng-repeat=\"(name,field) in kepsType.subSchema\" keps-name=\"name\" keps-label=\"{{name}}\" keps-label-class=\"kepsSubLabelClass\" keps-type=\"field\" keps-model=\"item[name]\" keps-framework=\"kepsFramework\" keps-errors=\"data.error[$index]\"></div></div><div class=\"list-group-item\"><a href=\"\" style=\"\" title=\"add item\"><span style=\"color:green\" class=\"glyphicon glyphicon-plus-sign\" ng-click=\"addArrayItem()\"></span></a></div></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div></div>");
$templateCache.put("../templates/bootstrapv3/arrayobject.html","<ul class=\"list-group\"><li class=\"list-group-item\" ng-repeat=\"obj in data.value track by $index\"><a href=\"\" style=\"color:inherit\" ng-click=\"data.showArray[$index] = !data.showArray[$index]\">{{$index}} {{data.showArray[$index] ? \'Hide Contents\' : \'Show Contents\'}} </a><a href=\"\" ng-click=\"removeArrayItem($index)\" class=\"badge\"><span class=\"glyphicon glyphicon-remove\"></span> </a><a href=\"\" ng-click=\"addArrayItem()\" class=\"badge\"><span class=\"glyphicon glyphicon-plus\"></span></a><div ng-show=\"data.showArray[$index]\"><form><keps-form keps-name=\"kepsName+\'.\'\" keps-data=\"kepsType[0]\" keps-model=\"data.value[$index]\"></keps-form></form></div></li></ul>");
$templateCache.put("../templates/bootstrapv3/boolean.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"radio\"><label><input type=\"radio\" ng-model=\"data.value\" ng-value=\"{{true}}\" ng-required=\"kepsType.required\" ng-readonly=\"kepsReadonly\"> {{kepsType.choices.split(\',\')[0] || \'true\'}}</label></div><div class=\"radio\"><label><input type=\"radio\" ng-model=\"data.value\" ng-value=\"{{false}}\"> {{kepsType.choices.split(\',\')[1] || \'false\'}}</label></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/date.html","<span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\" style=\"width:200px\"><input type=\"date\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.date\" ng-blur=\"makeTime()\" placeholder=\"yyyy-MM-dd\" ng-readonly=\"kepsReadonly\"></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/datetime.html","<span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\" style=\"width:200px\"><input type=\"date\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.date\" ng-blur=\"makeTime()\" placeholder=\"yyyy-MM-dd\" ng-readonly=\"kepsReadonly\"></div><div class=\"form-group\" style=\"width:200px\"><input type=\"time\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.time\" ng-blur=\"makeTime()\" ng-readonly=\"kepsReadonly\"></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/email.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"email\" ng-model=\"data.value\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/enum.html","<div class=\"form-group {{kepsGroupClass}}\"><div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><select ng-readonly=\"kepsReadonly\" class=\"form-control {{kepsInputClass}}\" ng-model=\"data.value\"><option ng-repeat=\"option in kepsType.options track by $index\" value=\"{{kepsType.options[$index]}}\">{{kepsType.labels[$index] || kepsType.options[$index] }}</option></select><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/file.html","<div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"input-group\"><span class=\"input-group-btn\"><span class=\"btn btn-default {{kepsButtonClass}}\" style=\"min-width: 0;padding-left:20px;padding-right:20px;display:inline-block\">Load File <input ng-if=\"kepsAcceptFileTypes\" type=\"file\" accept=\"{{kepsAcceptFileTypes}}\" style=\"position:absolute;opacity:0;top: 0;right: 0;\n		    		min-width: 100%;min-height: 100%\" onchange=\"angular.element(this).scope().fileChanged(event)\"> <input ng-if=\"!kepsAcceptFileTypes\" type=\"file\" style=\"position:absolute;opacity:0;top: 0;right: 0\" onchange=\"angular.element(this).scope().fileChanged(event)\"> </span></span><input type=\"text\" class=\"form-control\" ng-readonly=\"kepsReadonly\" value=\"{{uploadStatus}}\"></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/geopoint.html","<div class=\"row\"><div class=\"col-xs-5\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><div class=\"form-group\"><label class=\"control-label\">Lat:</label><input ng-readonly=\"kepsReadonly\" type=\"number\" class=\"form-control\" step=\"any\" ng-model=\"data.lat\" ng-keyup=\"testLatLng();errorChecking();\"></div><div class=\"form-group\"><label class=\"control-label\">Lng:</label><input ng-readonly=\"kepsReadonly\" type=\"number\" class=\"form-control\" step=\"any\" ng-model=\"data.lng\" ng-keyup=\"testLatLng();errorChecking();\"></div></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div><div class=\"col-xs-7\"><p>Preview:</p><div id=\"map\" style=\"width:100%;height:200px;margin-top:-5px\"></div></div></div>");
$templateCache.put("../templates/bootstrapv3/html.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><text-angular ng-model=\"data.value\" ng-required=\"kepsType.required\" ta-default-wrap=\"div\" ta-disabled=\"kepsReadonly\"></text-angular><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/image.html","<div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-6\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><div class=\"alert alert-info\" ng-show=\"kepsType.imageUploading\"><i class=\"fa fa-spinner fa-spin\" style=\"font-size:24px\"></i> Uploading</div><div class=\"alert alert-danger\" ng-show=\"kepsType.imageError\">{{kepsType.imageError}}</div><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\" ng-init=\"importImageComputer = true;\" ng-show=\"importImageComputer\"><div class=\"input-group\"><span class=\"input-group-btn\"><span class=\"btn btn-default {{kepsButtonClass}}\" style=\"min-width: 0;padding-left:20px;padding-right:20px;display:inline-block\">Load Image <input type=\"file\" ng-required=\"kepsType.required\" style=\"position:absolute;opacity:0;top: 0;right: 0;\n		    		min-width: 100%;min-height: 100%\" onchange=\"angular.element(this).scope().imageFileChanged(event)\" accept=\"image/*\"> </span></span><input type=\"text\" class=\"form-control\" readonly=\"\" value=\"{{imageStatus}}\"></div><a href=\"\" ng-click=\"removeImage()\" style=\"color:red\">Remove Image</a><!--<a href=\"\" ng-click=\"importImageComputer = false;importImageInternet = true;\">Or... Upload an image from a url.</a>--></div><div class=\"form-group {{kepsGroupClass}}\" ng-show=\"importImageInternet\"><div class=\"input-group\"><span class=\"input-group-btn\"><span class=\"btn btn-default {{kepsButtonClass}}\" style=\"min-width: 0;padding-left:20px;padding-right:20px;display:inline-block\">Import from url <a href=\"\" ng-click=\"getImageUrl()\" style=\"position:absolute;opacity:0;top: 0;right: 0;\n		    		min-width: 100%;min-height: 100%\" onchange=\"angular.element(this).scope().imageFileChanged(event)\"></a> </span></span><input type=\"text\" class=\"form-control\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.placeholder || \'Enter Image url\'}}\" ng-model=\"kepsType.imageUrl\"></div><a href=\"\" ng-click=\"importImageComputer = true;importImageInternet = false;\">Or... Upload a file from your computer</a></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div><div class=\"col-xs-6\"><canvas id=\"{{kepsType.randomCanvasId}}\"></canvas><span ng-show=\"imageData.height && imageData.width\">{{imageData.width + \' X \' + imageData.height}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/multienum.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"checkbox\" ng-repeat=\"opt in kepsType.options\"><label><input type=\"checkbox\" ng-click=\"checkMulti(opt);errorChecking();\" ng-checked=\"inArray(opt)\" ng-readonly=\"kepsReadonly\"> {{opt}}</label></div><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/number.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"number\" ng-model=\"data.value\" min=\"{{kepsType.min}}\" max=\"{{kepsType.max}}\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.placeholder}}\" numbers-only=\"{{kepsType.round == 0}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/object.html","<span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"row\"><div class=\"col-xs-10 col-xs-offset-1\"><input-item ng-repeat=\"(name,field) in kepsType.subSchema\" keps-name=\"name\" keps-label=\"{{name}}\" keps-type=\"field\" keps-model=\"data.value[name]\" keps-framework=\"kepsFramework\" keps-errors=\"data.error[name]\"></div></div>");
$templateCache.put("../templates/bootstrapv3/phone.html","<style>.iti-flag {background-image: url(\"/lib/intl-tel-input/build/img/flags.png\");}</style><div class=\"row\"><div class=\"col-xs-12\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><div class=\"form-group {{kepsGroupClass}}\"><input type=\"tel\" id=\"mobile-number\" class=\"form-control {{kepsInputClass}}\" ng-model=\"data.value\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div><script>$(\"#mobile-number\").intlTelInput();</script>");
$templateCache.put("../templates/bootstrapv3/referenceObject.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input ng-readonly=\"kepsReadonly\" type=\"text\" list=\"{{kepsType.label || kepsName}}\" class=\"form-control {{kepsInputClass}}\" ng-model=\"data.reference\" ng-blur=\"setReferenceData()\"><datalist id=\"{{kepsType.label || kepsName}}\">{{referenceOptions}}<option ng-repeat=\"option in referenceOptions\" value=\"{{option[data.displayReferenceAs]}}\">{{option[data.displayReferenceAs]}}</option></datalist><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/richtext.html","<div class=\"row\"><div class=\"col-xs-12\"><div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><text-angular ng-model=\"data.value\" ng-required=\"kepsType.required\" ta-toolbar=\"richToolbar\" ta-disabled=\"kepsReadonly\"></text-angular><span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div></div></div>");
$templateCache.put("../templates/bootstrapv3/string.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"text\" ng-model=\"data.value\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.display.placeholder}}\" ng-keyup=\"errorChecking()\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/bootstrapv3/url.html","<div class=\"form-group {{kepsGroupClass}}\"><span ng-show=\"kepsType.required\" style=\"color:red\">*</span><label class=\"{{kepsLabelClass}}\">{{kepsType.label}}</label><input type=\"url\" ng-model=\"data.value\" class=\"form-control {{kepsInputClass}}\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.display.placeholder}}\" ng-readonly=\"kepsReadonly\"> <span class=\"help-block\" ng-if=\"kepsType.instructions\">{{kepsType.instructions}} </span><span style=\"color:red;margin-left:20px\" ng-show=\"errorMsg\">{{errorMsg}}</span></div>");
$templateCache.put("../templates/materialize/input.html","<section><div class=\"modal-row\"><label ng-if=\"kepsType.display.label\">{{kepsType.display.label}}:</label><label ng-if=\"!kepsType.display.label\">{{kepsName}}:</label><span ng-show=\"typeError\" style=\"color:red\">Did not find a useable input type, defaulting to string</span><!-- Start listing input types --><div ng-if=\"kepsType.type\"><div ng-if=\"kepsType.type.indexOf(\':\') > -1\"><input type=\"text\" list=\"{{kepsType.type + \'options\'}}\" class=\"form-control\" ng-model=\"data.value\" ng-blur=\"setReferenceData()\"><datalist id=\"{{kepsType.type + \'options\'}}\"><option ng-repeat=\"option in data.options\" value=\"{{option.value}}\"></option></datalist></div><div ng-if=\"kepsType.type === \'string\'\"><input type=\"text\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><div ng-if=\"kepsType.type === \'number\'\"><input type=\"number\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\"></div><div ng-if=\"kepsType.type === \'boolean\'\"><div class=\"radio-inline\"><label><input type=\"radio\" ng-required=\"kepsType.required\" ng-model=\"data.value\" ng-value=\"true\">True</label></div><div class=\"radio-inline\"><label><input type=\"radio\" ng-required=\"kepsType.required\" ng-model=\"data.value\" ng-value=\"false\">False</label></div></div><div ng-if=\"kepsType.type === \'file\'\"><div class=\"row\"><div class=\"form-group col-xs-6\"><label>Import file from computer</label><input type=\"file\" ng-required=\"kepsType.required\" style=\"margin:15px\" onchange=\"angular.element(this).scope().fileChanged(event)\"></div><div class=\"col-xs-6\"><ul style=\"list-style:none\"><li><strong>File Info</strong></li><li>FileName: {{kepsModel.fileName}}</li><li>Size: {{kepsModel.fileSize}}</li></ul></div></div></div><div ng-if=\"kepsType.type === \'html\'\"><text-angular ng-model=\"data.value\" ng-required=\"kepsType.required\" placeholder=\"{{kepsType.display.placeholder}}\" ta-default-wrap=\"div\"></text-angular>{{data.value}}</div><div ng-if=\"kepsType.type === \'datetime\'\"><div class=\"row\"><div class=\"form-group col-xs-6\"><input type=\"date\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.date\" ng-blur=\"makeTime()\" placeholder=\"yyyy-MM-dd\"></div><div class=\"form-group col-xs-6\"><input type=\"time\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.time\" ng-blur=\"makeTime()\"></div></div></div><div ng-if=\"kepsType.type === \'image\'\"><div class=\"row\"><div class=\"form-group col-xs-5\"><div ng-show=\"!import\"><label>Import image from computer:</label><div class=\"btn\"><input type=\"file\" ng-required=\"kepsType.required\" style=\"margin:15px\" onchange=\"angular.element(this).scope().imageFileChanged(event)\" accept=\"image/*\"></div><a href=\"\" ng-click=\"import = true;image.file = \'\'\">Or... Upload an image from a url.</a></div><div ng-show=\"import\"><label>Import image from url:</label><input type=\"text\" ng-required=\"kepsType.required\" class=\"form-control\" ng-model=\"data.imageUrl\" placeholder=\"Enter image url\"><button style=\"margin-top:5px\" class=\"btn btn-success\" ng-click=\"getImageUrl()\">Grab Image</button><br><a href=\"\" ng-click=\"import = false;\">Or... Upload a file from your computer</a></div></div><div class=\"col-xs-7\"><canvas id=\"{{kepsType.randomCanvasId}}\"></canvas><span ng-show=\"imageData.height && imageData.width\">{{imageData.width + \' X \' + imageData.height}}</span></div></div></div><div ng-if=\"kepsType.type === \'url\'\"><input type=\"url\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><div ng-if=\"kepsType.type === \'geopoint\'\"><div class=\"col-sm-8\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Lat:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Lng:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\"></div></div></div><div class=\"col-sm-4\">Preview</div></div><div ng-if=\"kepsType.type === \'email\'\"><input type=\"email\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><div ng-if=\"kepsType.type === \'enum\'\"><select class=\"form-control\" ng-model=\"data.value\" ng-options=\"opt for opt in kepsType.options\"></select></div><div ng-if=\"kepsType.type === \'multi\'\"><select class=\"form-control\" multiple=\"multiple\" ng-multiple=\"true\" ng-model=\"data.value\" ng-options=\"opt for opt in kepsType.options\"></select></div><div ng-if=\"kepsType.type === \'address\'\"><!--http://ipinfo.io/--><div class=\"col-sm-8\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Address Line1:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div><span class=\"help-block\">Street address, P.O. box, company name, c/o</span></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Address Line2:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div><span class=\"help-block\">Apartment, suite, unit, building, floor, etc.</span></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">City:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">State / Province / Region / County:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">ZIP / Postal Code / Postcode:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\">Country:</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control\" placeholder=\"Email\"></div></div></div><div class=\"col-sm-4\">Preview Zoom 17 for address Zoom 9 for city Zoom 5 for state / small country Zoom 4 for country <img class=\"map\" src=\"https://maps.googleapis.com/maps/api/staticmap?center=37.7367,-122.4572&amp;zoom=17&amp;size=200x200&amp;sensor=false\" alt=\"San Francisco, California, United States Map\" title=\"San Francisco, California, United States Map\"></div></div><div ng-if=\"kepsType.type === \'phone\'\"><!---http://jackocnr.com/intl-tel-input.html --> <input type=\"tel\" ng-required=\"kepsType.required\" ng-model=\"data.value\" class=\"form-control\" placeholder=\"{{kepsType.display.placeholder}}\"></div><span class=\"help-block\" ng-if=\"kepsType.display.instructions\">{{kepsType.display.instructions}}</span></div></div></section>");}]);
angular.module('ngKeps')
  .directive('authorizationmodal',['$nkAuthService', '$window', '$rootScope',
    function($nkAuthService, $window, $rootScope){
      return {
        restrict: 'E',
        
        templateUrl:'../templates/authModal.html',        

        scope: {
        },

        controller:function($scope){
          $scope.config = $rootScope.config;
          $scope.user = $nkAuthService.getUser();
          $scope.show = 'login';          $scope.login = {};
          $scope.signin = function(provider) {
            $nkAuthService.loginWithProvider(provider, $scope.login)
            .then(function(data){
              $scope.msgs = {};
              $scope.msgs.signedIn = 'Signed In!';
              setTimeout(function() {
                $window._ngkeps_model_hide();                
              }, 1500);
            },function(err){  
              console.log(err);
              $scope.msgs = {};
              $scope.msgs.error = err.errors[0].friendly;
            });
          };
          $scope.signout = function(){
            $nkAuthService.logout();
            location.href = "/";
          };
          $scope.register = function(){
            $scope.msgs = {};
            if($scope.registerForm.$valid){
              if($scope.newUser.password === $scope.rePassword){
                if($scope.newUser.password.length > 7) {
                  $nkAuthService.signupWithProvider('local', $scope.newUser)
                  .then(function(user){
                    console.log(user);
                    $scope.msgs.created = true;
                    setTimeout(function() {
                      $window._ngkeps_model_hide();
                    }, 1500);
                  }, function(err){
                    if(err.data.errors[0].message == 'DuplicateKey'){
                      $scope.msgs.emailUsed = true;
                    }else{
                      $scope.msgs = {error: err.data.errors[0].friendly};
                    }
                    console.log('ERR', err);            
                  });
                }else{
                  $scope.msgs.passwordShort = true;
                }
              }else{
                $scope.msgs.passwordsDontMatch = true;
              }
            }else{
              $scope.msgs.formError = true;
            }
          };
          $scope.showLogin = function() {
            $scope.show = 'login';
          };
          $scope.showRegister = function() {
            $scope.show = 'register';
          };
          $scope.showForgottenPassword = function() {
            $scope.show = 'forgottenPassword';
          };
          $scope.showTwoFactor = function() {
            $scope.show = 'twofactor';
          };
        }
      };
    }
  ]);
angular.module('ngKeps')
	.directive('kepsForm',['$nkDataService',
		function($nkDataService){
			return {
				restrict: 'E',
				
				templateUrl:'../templates/form.html',

				scope: {
					kepsData:'=',
					kepsModel:'=',
					kepsName:'=',
					kepsErrors:'=',
					kepsFramework:'@'
				},
				link:function(scope, element, attrs){
					scope.data = {};
					console.log('KTYPE', scope.kepsData);
					console.log('KMOD',scope.kepsModel);
					scope.kepsErrors = {};

		    	if (scope.kepsModel) {
		      		scope.data.value = scope.kepsModel;
		    	}

		    	scope.$watch('data.value', function(newVal) {
	      		if (typeof newVal !== 'undefined') {
	        		scope.kepsModel = newVal; 
	      		}
		    	});
		    	scope.$watch('kepsModel', function(newVal){
	          if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
	            scope.data.value = newVal;
	          }
		      });
				}
			};
		}
	]);
angular.module('ngKeps')
.directive('inputItem',['$nkDataService', '$http', '$compile', '$parse', '$templateCache','$window','$timeout', 'imageInputService', 'validatorService',
  function($nkDataService, $http, $compile, $parse, $templateCache, $window, $timeout, imageInputService, validatorService){
    return {
      restrict: 'E',
      
      /*kepsType: OBJECT: 
      Property- displayAs: Optional, used for modifying reference types
      Property- displayType: Optional, will define field type, set to type if not provided
      Property- options: Optional, array of id/value that matches the reference type

      Property- name: Not Optional, will be used as label if no displayAs
      Property- type: Not Optional, will be field type if no displayType provided
      Property- model: Not Optional, value or false if not a reference field*/

      scope:{
        kepsType:'&',
        kepsModel:'=',
        kepsName:'&',
        kepsGroupClass:'@',
        kepsInputClass:'@',
        kepsLabelClass:'@',
        kepsSubLabelClass:'@',
        kepsButtonClass:'@',
        kepsLabel:'@',
        kepsInstructions:'@',
        kepsErrors:'=?',
        kepsHideErrors:'&',
        kepsFramework:'@',
        kepsReadonly:'@'
      },

      link: function(scope,element,attrs){
        //setup display object
        if(scope.hasOwnProperty('kepsErrors')){
          scope.kepsErrors = {};
        }
        if(typeof scope.kepsType === 'function'){
          scope.kepsType = scope.kepsType();
        }

        if(typeof scope.kepsType === 'string'){
          scope.kepsType = {type:scope.kepsType};
        }
        if(typeof scope.kepsName === 'function'){
          scope.kepsName = scope.kepsName();
        }
        //resolve label value
        if(scope.kepsLabel === "''"){
          scope.kepsType.label = '';
        }else if(typeof scope.kepsLabel !== 'undefined' && scope.kepsLabel.length > 0){
          scope.kepsType.label = scope.kepsLabel;
        }else if(scope.kepsType){
          if(!scope.kepsType.label || scope.kepsType.label === ''){
            scope.kepsType.label = scope.kepsName;
          }
        }else{
          if(scope.kepsType){
            scope.kepsType.label = scope.kepsName;
          }else{
            scope.kepsType = {};
            scope.kepsType.label = scope.kepsName;
          }
        }
        //resolve instructions value
        if(scope.kepsInstructions === ''){
          scope.kepsType.instructions = '';
        }else if(typeof scope.kepsInstructions !== 'undefined'){
          scope.kepsType.instructions = scope.kepsInstructions;
        }else if(!scope.kepsType.hasOwnProperty('instructions')){
          scope.kepsType.instructions = '';
        }

        //setup data watch object
        scope.data = {};
        scope.data.id = Math.random();
        if(typeof scope.kepsType.required === 'object') {
          scope.data.subrequired = true;
        }
        if (scope.kepsModel) {
          if (scope.kepsType.type && scope.kepsType.type === 'image') {
            scope.data.value = scope.kepsModel;
          } else if (scope.kepsType.type && scope.kepsType.type === 'file') {
            scope.data.value = scope.kepsModel;
          } else if (scope.kepsType.type && scope.kepsType.type === 'datetime') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
            scope.data.time = new Date(scope.kepsModel);
          } else if (scope.kepsType.type && scope.kepsType.type === 'date') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
          } else {
            scope.data.value = scope.kepsModel;            
          }
        }
        //deep watch
        if(scope.kepsType.type === 'array' || scope.kepsType.type === 'multienum'){
          scope.$watch('data.value', function(newVal) {
            if (typeof newVal !== 'undefined') {
              scope.kepsModel = newVal; 
            } else if (typeof scope.kepsType.default !== 'undefined') {
              scope.kepsModel = scope.kepsType.default;
            }
          }, true);   
        //regular watch     
        }else{
          scope.$watch('data.value', function(newVal) {
            if (typeof newVal !== 'undefined') {
              scope.kepsModel = newVal; 
            } else if (typeof scope.kepsType.default !== 'undefined') {
              scope.kepsModel = scope.kepsType.default;
            }
          });
        }
        scope.$watch('kepsModel', function(newVal){
          if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
            scope.data.value = newVal;
            if (scope.kepsType.type === 'image') {
              imageInputService(scope);
            }
          }
        });
        /*setup template stuff for different css frameworks
        var framework = $parse(attrs.data)(scope);
        if (framework !== 'bootstrapv3' &&
            framework !== 'materialize') {
          framework = 'bootstrapv3';
        }*/
        if(typeof scope.kepsFramework === 'function'){
          scope.kepsFramework = scope.kepsFramework();
        }
        var framework = scope.kepsFramework ? scope.kepsFramework : 'bootstrapv3';
        if(typeof framework !== 'string'){
          framework = 'bootstrapv3';
        }
        if(framework !== 'materialize' && framework !== 'bootstrapv3'){
          framework = 'bootstrapv3';
        }
        var loadTemplate = function(type) {
          if(type.slice(0,1) === ':'){
            $http.get("../templates/"+framework+'/referenceObject.html', {cache: $templateCache}).success(function(tplContent){
              element.replaceWith($compile(tplContent)(scope));
            });
          }else{
            $http.get("../templates/"+framework+'/'+type+'.html', {cache: $templateCache}).success(function(tplContent){
              element.replaceWith($compile(tplContent)(scope));                
            }); 
          }
        };

        //catch bad/incomplete models
        if (typeof scope.kepsType.type !== 'undefined') {
          scope.kepsType.type = scope.kepsType.type.toLowerCase();
          if (typeof scope.kepsType.default !== 'undefined' && typeof scope.data.value === 'undefined') {
            scope.data.value = scope.kepsType.default;
          }

          //add new types here
          var itemTypes=["html","url","geopoint","email","datetime","date","richtext","phone",
                         "image","file","string","number","boolean","enum","multienum","address",
                         "array", "arraymulti", "object"];
         
          //resolve weird types
          if(scope.kepsType.type.slice(0,1) === ':'){
            loadTemplate(scope.kepsType.type);
          }else if(scope.kepsType.type.slice(0,1) === '_'){
            getModelSchema(function(err, schema){
              scope.kepsType.type = "object";
              scope.kepsType.subSchema = removeUneditableFields(schema);
              loadTemplate(scope.kepsType.type);
            });
          }else if(itemTypes.indexOf(scope.kepsType.type) === -1){
            scope.typeError = true;
            scope.kepsType.type = "string";
          }else{
            if(scope.kepsType.type === 'array'){
              if(typeof scope.kepsType.subSchema === 'string'){
                scope.kepsType.type = 'array';
              }else{
                var size = 0;
                for(var x in scope.kepsType.subSchema){
                  size++;
                }
                size > 1 ? scope.kepsType.type = 'arraymulti' : scope.kepsType.type = 'array';
              }
            }
            
            loadTemplate(scope.kepsType.type);
            
          }
        }else{
          scope.kepsType.type = "string";
          loadTemplate(scope.kepsType.type) ;
        }
      
        function removeUneditableFields(schema){
          var blacklist = ['_id','_createdAt','_updatedAt', '_seed', '_v'];
          var newSchema = {};
          for(var x in schema){
            if(blacklist.indexOf(x) > -1){

            }else{
              newSchema[x] = schema[x];
            }
          }
          return newSchema;
        }
        /*#### END PREPROCESSING/ERROR CHECKING. REST OF CODE IS IN TYPE SPECIFIC BLOCKS #####*/
    


        //#### TYPE: REFERENCE STUFF #####
        if (typeof scope.kepsType.type !== 'undefined' && scope.kepsType.type.indexOf(':') === 0) {
          var referenceType = scope.kepsType.type.slice(1);
          $http.get($nkDataService.apiPrefix + 'models')
          .then(function(models){
            for(var x in models.data){
              if(x === referenceType){
                if(models.data[x].properties){
                  if(models.data[x].properties.displayAs){
                    scope.data.displayReferenceAs = models.data[x].properties.displayAs;
                    return getReferenceData(referenceType, scope.data.displayReferenceAs);
                  }
                }
                if(models.data[x].schema.name){
                  scope.data.displayReferenceAs = 'name';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                if(models.data[x].schema.title){
                  scope.data.displayReferenceAs = 'title';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                if(models.data[x].schema.displayName){
                  scope.data.displayReferenceAs = 'displayName';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                scope.data.displayReferenceAs = '_id';
                return getReferenceData(referenceType, scope.data.displayReferenceAs);
              }
            }
          });
          var getReferenceData = function(referenceType, displayAs){
            $http.get($nkDataService.apiPrefix + 'rest/' + referenceType + "s")
            .then(function(data){
              scope.referenceOptions = [];
              for(var i = 0; i < data.data.length; i++){
                scope.referenceOptions.push({_id:data.data[i]._id, name:data.data[i][displayAs]});
              }
              if(scope.kepsModel){
                scope.data.value = scope.kepsModel;
                for(var i=0;i<scope.referenceOptions.length;i++){
                  if(scope.kepsModel === scope.referenceOptions[i]._id){
                    scope.data.reference = scope.referenceOptions[displayAs];
                  }
                }
              }
            });
          };
          scope.setReferenceData = function(){
            for(var i=0;i<scope.referenceOptions.length;i++){
              if(scope.referenceOptions[i][scope.data.displayReferenceAs] === scope.data.reference){
                scope.data.value = scope.referenceOptions[i]._id;
              }
            }
          };
        }
    
        /*### Mongoose Validation Type (model leads with _ or _?) ###*/
        function getModelSchema(cb){
          var referenceType;
          if(scope.kepsType.type[1] === '?'){
            referenceType = scope.kepsType.type.slice(2);
          }else{
            referenceType = scope.kepsType.type.slice(1);
          }
          $http.get($nkDataService.apiPrefix + 'models')
          .then(function(models){
            for(var x in models.data){
              if(x === referenceType){
                return cb(null,models.data[x].schema);
              }
            }
          }, function(err){
            console.error(err);
            return cb(err);
          });
        }
        
        /*### TYPE: DATETIME STUFF ###*/
        //blur function to combine date/time strings to ms number
        if (scope.kepsModel) {
          if (scope.kepsType.type === 'datetime') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
            scope.data.time = new Date(scope.kepsModel);
          } else if (scope.kepsType.type === 'date') {
            //changing date ms number to display as date/time fields
            scope.data.value = scope.kepsModel;
            scope.data.date = new Date(scope.kepsModel);
          } else {
            scope.data.value = scope.kepsModel;            
          }
        }
        scope.makeTime = function(){
          if(scope.data.time && scope.data.date){
            scope.kepsModel = 
             new Date(scope.data.date.toString().slice(0,15) + scope.data.time.toString().slice(15)).getTime();

          }else{
            scope.kepsModel = new Date(scope.data.date).getTime();
          }
        };

        /*### TYPE: ARRAY stuff ###*/
        var i, len;
        if(scope.kepsType.type === 'array'){
          scope.data.value = scope.kepsModel || []; 
          scope.showArrayItem = [];
          len = scope.data.value.length;
          for (i = 0; i < len; i++) {
            scope.showArrayItem.push(false);
          }        
        }else if(scope.kepsType.type === 'arraymulti'){
          scope.data.value = scope.kepsModel || [];
          scope.showArrayItem = [];
          len = scope.data.value.length;
          for(i = 0; i < len; i++){
            scope.showArrayItem.push(false);
          }  
        }
        scope.addArrayItem = function(){
          var size = 0;
          for(var x in scope.kepsType.subSchema){
            size++;
          }
          if(size > 1){
            var obj = {};
            for (var i in scope.kepsType.subSchema) {
              if (scope.kepsType.subSchema[i].default) {
                obj[i] = scope.kepsType.subSchema[i].default;
              }
            }
            scope.showArrayItem[scope.data.value.length] = true;
            scope.data.value.push(JSON.parse(JSON.stringify(obj)));          
          }


        };
        scope.removeArrayItem = function(index){
          scope.data.value.splice(index,1);
        };


        /*### TYPE: IMAGE STUFF ###*/
        if (scope.kepsType.type === 'image') {
          imageInputService(scope);
        }

        /*### TYPE: FILE stuff ###*/
        if(scope.kepsType.type === "file"){
          fileInputService(scope);
        }


        /*###TYPE: GEOPOINT stuff ###*/
        if(scope.kepsType.type === "geopoint"){
          geopointInputService(scope);
        }

       
        /*####TYPE: multi stuff####*/
        if(scope.kepsType.type==='multienum'){

          if(Array.isArray(scope.kepsModel)){
            scope.data.value = scope.kepsModel;
          } else{
            scope.data.value = [];
          }
          scope.checkMulti=function(opt){
            var ind = scope.data.value.indexOf(opt);
            if (ind > -1){
              scope.data.value.splice(ind, 1);
            } else {
              scope.data.value.push(opt);
            }
          };
          scope.inArray = function(specialty){
            if(scope.data.value.indexOf(specialty) > -1){
              return true;
            }else{
              return false;
            }
          }
        }
    

        /*### TYPE address stuff ###*/
       /* var timeoutPromise;
        scope.checkAddress = function(evt){
          if(!scope.data.value) scope.data.value = {};
          
          if(scope.data.value.address1 && scope.data.value.city && scope.data.value.region){
            if(scope.data.value.address1.length > 3 && scope.data.value.city.length > 2 && scope.data.value.region.length > 0){
              if(timeoutPromise){
                $timeout.cancel(timeoutPromise);
              }

              timeoutPromise = $timeout(function(){
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + scope.data.value.address1 + ',+' + scope.data.value.city + ',+' + scope.data.value.region)
                  .then(function(mapInfo){

                    if(mapInfo.status === 200){
                      var addressInfo = mapInfo.data.results[0].address_components;
                      for(var x in addressInfo){
                        if(addressInfo[x].types[0] === 'postal_code'){
                          scope.data.value.postal = addressInfo[x].long_name;
                          if(scope.kepsFramework === 'materialize') document.getElementById('zipLabel').className = "active";
                        } else if(addressInfo[x].types[0] === 'country'){
                          scope.data.value.country = addressInfo[x].long_name;
                          if(scope.kepsFramework === 'materialize') document.getElementById('countryLabel').className = "active";
                        }
                      }
                      $window.initMapAddress = function(){
                        var latLng = new google.maps.LatLng( mapInfo.data.results[0].geometry.location.lat,
                                                             mapInfo.data.results[0].geometry.location.lng);

                        var addressMap = new google.maps.Map(document.getElementById('addressMap'),
                          {
                            center:latLng,
                            zoom:8
                          });
                        var marker = new google.maps.Marker(
                          {
                            position: latLng,
                            map: addressMap,
                          });
                      };
                      if(typeof(google) === 'undefined'){
                        var s = document.createElement('script');
                        s.src = "https://maps.googleapis.com/maps/api/js?callback=initMapAddress";
                        document.body.appendChild(s);
                      }else{
                        initMapAddress();
                      }
                    }
                    scope.data.value.lat = mapInfo.data.results[0].geometry.location.lat;
                    scope.data.value.lng = mapInfo.data.results[0].geometry.location.lng;

                  });
              }, 1000);

            }
          }
        };*/


        /*### TYPE richtext stuff ###*/
        if(scope.kepsType.type === 'richtext'){
          scope.richToolbar = [ ['keps-fontsize','bold', 'italics', 'underline', 'strikeThrough','keps-alignment','wordcount']
          ];
        }

        /*ERROR CHECKING*/
        scope.errorChecking = function(){
          scope.kepsErrors = {};
          switch(scope.kepsType.type){
            case('string'):return validatorService.stringValidation(scope);
            case('number'):return validatorService.numberValidation(scope);
            case('image'):return validatorService.fileValidation(scope);
            case('richText'):return validatorService.richTextValidation(scope);
            case('geopoint'):return validatorService.geopointValidation(scope);
            case('multienum'):return validatorService.multiValidation(scope);
            case('email'):return validatorService.emailValidation(scope);
          }
        };
      }
    };
  }]);
angular.module('ngKeps')
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text && typeof text === 'string') {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }else if(typeof text === "number"){
                    ngModelCtrl.$setViewValue(text);
                    ngModelCtrl.$render();
                    return text;
                }else{
                    return undefined;
                }
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
angular.module('ngKeps')

.service('$nkAnalyticsService', ['$timeout', '$nkDataService',
  
  function($timeout, $nkDataService) {

    var publicMembers = {};
    var protectedMembers = {};

    protectedMembers.queue = [];
    protectedMembers.interval = 10000;


    // look in localstorage for user, if not found add the sessionID to tmpUserId;

    publicMembers.event = function(eventName, properties) {
      var trackObj = {
        action: 'track',
        event: name,
        properties: data,
        timestamp: (new Date()).toISOString()
      };
      if (userId) {
        trackObj.userId = userId;
      } else {
        trackObj.sessionId = sessionId;
      }
      queue.push(trackObj);
      // console.log('Tracking event', name, 'with data', data);
    };

    publicMembers.identify = function(key, traits) {
      var trackObj = {
        action: 'identify',
        traits: data,
        timestamp: (new Date()).toISOString()
      };
      if (key && key !== '') {
        userId = key;
        trackObj.userId = userId;
      } else {
        trackObj.userId = 'anonymousId';
      }
      queue.push(trackObj);
    };

    publicMembers.setInterval = function(interval) {
      protectedMembers.interval = interval;
    };

    protectedMembers.flush = function() {
      if (queue.length > 0) {
        var batchObj = {
          batch: queue,
        };
        var reqObj = JSON.parse(JSON.stringify(batchObj));
        queue = [];

        $http.post('/segment_io/import', reqObj)
        .then(function(){
          }, function(){
          });
      }

      protectedMembers.flushTimeout();
    };

    protectedMembers.flushTimeout = function() {
      $timeout(function() {
        protectedMembers.flush();
      }, protectedMembers.interval);
    };

    protectedMembers.flushTimeout();

    return publicMembers;
  }
]);

(function() {
var logoutHref = null;
var rootScope = {};
var apiPrefix = '/api/v1/';

angular.module('ngKeps').provider('$nkAuthService', [function () {

  this.setApiPrefix = function(value) {
    apiPrefix = value;
  };

  this.setLogoutHref = function(value) {
    logoutHref = value;
  };

  this.$get = [
  
  '$http',
  '$location',
  '$window',
  '$q',
  '$nkDataService',
  '$nkModalService',
  '$rootScope',
  '$compile',

  function($http, $location, $window, $q, $nkDataService, $nkModalService, $rootScope, $compile) {
    var publicMembers = {};
    var user = false;
    var webalias = $location.host();
    
    publicMembers.showModal = function(cb) {
      if (user) {
        cb(user);
      } else {
        newElement = $compile("<authorizationmodal></authorizationmodal>")($rootScope);
        $nkModalService.show({content:newElement, source:'angular-element', close:function() {
          cb(user);
        }});        
      }
    };

    publicMembers.start = function(scope){
      rootScope = scope;
      window.$http = $http;
      var userDeferred = $q.defer();
      try{
        user = JSON.parse($window.localStorage[webalias+'-user']);
      } catch (e){}
      if(user){
        $http.get(apiPrefix + 'users/me')
        .then(function(response){
          user = response.data;
          if (!user) {
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(user));
            userDeferred.resolve(user);
            scope.user = user;
          }
        }, function(err){
          if (!user) {
            userDeferred.reject(user);          
          } else {
            delete $window.localStorage[webalias + '-user'];
            if (logoutHref) {
              $location.href = logoutHref;
            }
          }
        });
        scope.user = user;
        userDeferred.resolve(user);
      }
      var parser = document.createElement('a');
      parser.href = apiPrefix;

      $http.get(parser.origin + '/api/config')
      .then(function(response){
        $rootScope.config = response.data;
      }, function(err){
        alert('server down');
      });
      return userDeferred.promise;
    };

    publicMembers.getUser = function(){
      return user;
    };

    publicMembers.loginWithProvider = function(provider, data) {
      var loginDeferred = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signin', data)
        .then(function(data) {
          if(data.data === false){
            loginDeferred.reject();
          }else{
            var usr = data.data;
            usr.expiration = Date.now();
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(usr));
            user = usr;
            rootScope.user = user;
            loginDeferred.resolve(usr);
          }
        }, function(err) {
          loginDeferred.reject(err.data);
        });
      } else {
        location.href = apiPrefix+'oauths/'+provider;
      }

      return loginDeferred.promise;
    };

    publicMembers.signupWithProvider = function(provider, data) {
      var loginDeferred = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signup', data)
        .then(function(success) {
          var usr = success.data;
          if (usr === false) {
            loginDeferred.reject();
          } else {
            usr.expiration = Date.now();
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(usr));
            user = usr;
            rootScope.user = user;
            loginDeferred.resolve(usr);
            }
          }, function(err) {
            loginDeferred.reject(err);        
          });
      } else {
        location.href = '/auth/'+provider;
      }
     
     return loginDeferred.promise;
    };

    publicMembers.logout =function(){
      delete $window.localStorage[webalias + '-user'];
      user = false;
    };

    publicMembers.getPaymentToken = function(){
      var token = $q.defer();
      $nkDataService.get("customers/token")
      .then(function(success){
        token.resolve(success.data);
      }, function(err){
        token.reject(err);
      });
      return token.promise;
    };

    publicMembers.checkout = function(){
      var transaction = $q.defer();
      $nkDataService.post("customers/checkoutWithPaymentMethod")
      .then(function(success){
        transaction.resolve(success.data);
      }, function(err){
        transaction.reject(err);
      });
      return transaction.promise;
    };

    publicMembers.checkPaymentMethod = function(){
      var method = $q.defer();
      $nkDataService.get('customers/checkPaymentMethod')
      .then(function(success){
        method.resolve(success.data);
      }, function(err){
        method.reject(err);
      });
      return method.promise;
    };

    publicMembers.firstTimeCheckout = function(nonce){
      var checkout = $q.defer();
      $nkDataService.post('customers/firstTimeCheckout', {'payment_method_nonce':nonce})
      .then(function(success){
        checkout.resolve(success.data);
      }, function(err){
        checkout.rejeoct(err);
      });
      return checkout.promise;
    };

    return publicMembers;
  }];
  
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
    var webalias = $location.host();

    return {
       request: function (config) {
          config.headers = config.headers || {};
          try{
            user = JSON.parse($window.localStorage[webalias+'-user']);
            if (user.token) {
               config.headers.Authorization = 'Bearer ' + user.token;
            }
          } catch (e){}

          return config;
       },
       response: function(res) {
        // should be urlPrefix
        var url = document.createElement('a');
        url.href = res.config.url;
        var prefixurl = document.createElement('a');
        prefixurl.href = apiPrefix;
        if (url.href.indexOf(prefixurl.href) === 0) {
          console.log(res.config.url);
          if (res.headers('x-user-token-refresh')) {
            try{
                $window.localStorage.setItem(webalias+'-user', res.headers('x-user-token-refresh'));
                rootScope.user = JSON.parse(res.headers('x-user-token-refresh'));
            } catch(err){
              alert(err);
            }
          }
        }
        return res;
       },
       responseError: function (response) {
         if (response.status === 401) {
            delete $window.localStorage[webalias + '-user'];
            if (logoutHref) {
              $location.href = logoutHref;
            }
         }
         return $q.reject(response);
       }
    };
  }]);
}])

.run(['$nkAuthService', '$rootScope', function($nkAuthService, $rootScope) {
  $nkAuthService.start($rootScope);
}]);

})();

angular.module('ngKeps')

.service('$nkCacheService', [
  
  function() {

    // add last updated time to cahce objects
    
    var publicMembers = {};
    var protectedMembers = {};
    var storage = {
      get: function(key) {
        return JSON.parse(localStorage.getItem(key));
      },
      set: function(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
      },
      check: function(key) {
        return (typeof localStorage.getItem(key) !== 'undefined' && localStorage.getItem(key) !== null);
      }
    };

    var objects;
    var indexLoaded = 0;
    var objectsLoaded = 0;

    publicMembers.storage = storage;

    protectedMembers.init = function() {
      if (storage.check('objects')) {
        var objs = storage.get('objects');
        if (variable.constructor === Array) {
          publicMembers.loadCache(objs);
        }
      }
    };

    /**
      * @method clearCache
      */
    publicMembers.clearCache = function() {
      localStorage.clear();
      loc = location.href;
      loc = loc.substr(0, loc.indexOf('#'));
      location.href = loc;
    };

    /**
      * @method loadCacheObj
      */
    publicMembers.loadCacheObj = function(type, id) {
      if (storage.check(type+'-'+id)) {
        try {
          var obj = storage.get(type+'-'+id);
          objects[type].objects[id] = obj;
          objectsLoaded++;
        } catch (e) {
          console.log('Error on parse', e);
          console.log(type+'-'+id, storage.get(type+'-'+id));
        }
      } else {
        console.log('Object', type+'-'+id, ' in index but not cache');
      }
    };

    /**
      * @method loadCacheType
      */
    publicMembers.loadCacheType = function(type) {
      objects[type] = {'objects':{}, 'schema':{}, 'objectCallbacks':[], 'index':[], 'collection':[]};
      if (!(storage.check(type+'-count'))) {
        storage.set(type+'-count', 0);
      }
      if (storage.check(type+'-index')) {
        try {
          objects[type].index = storage.get(type+'-index');
          indexLoaded++;
          for (var j = 0; j < objects[type].index.length; j++) {
            publicMembers.loadCacheObj(type, objects[type].index[j]);
          }
        } catch (e) {
          console.log('Error on index parse', e);
          console.log(type+'-index', storage.get(type+'-index'));
        }
      }
    };

    /**
      * @method loadCache
      */
    publicMembers.loadCache = function(objectsArr) {
      for (var i = 0; i < objectsArr.length; i++) {
        publicMembers.loadCacheType(objectsArr[i]);
      }
      console.log('finished loading cache', indexLoaded, 'indexes loaded', objectsLoaded, 'objects loaded', (JSON.stringify(localStorage).length/2500000)+'% of cache used');
    };

    /**
      * @method inCache
      */
    publicMembers.inCache = function(type, id) {
      if (id in objects[type].objects) {
        return true;
      } else {
        return false;
      }
    };

    /**
      * @method addObj
      */
    publicMembers.addObj = function(type, obj, dt, pending) {
      object._pending = pending;
      if (object._id in objects[objectType].objects) {
        objects[objectType].objects[object._id] = angular.extend(objects[objectType].objects[object._id], object);
      } else {
        objects[objectType].objects[object._id] = object;
      }
      protectedMembers.runObjectCallbacks(objectType, objects[objectType].objects[object._id]);
      if (!('objects-'+objectType+'-'+object._id in localStorage)) {
        localStorage.objectsCount = parseInt(localStorage.objectsCount)+1;
        localStorage[objectType+'Count'] = parseInt(localStorage[objectType+'Count'])+1;
      }
      localStorage['objects-'+objectType+'-'+object._id] = JSON.stringify(objects[objectType].objects[object._id]);
      if (objects[objectType].index.indexOf(object._id) === -1) {
        objects[objectType].index.push(object._id);
        localStorage['objects-'+objectType+'-index'] = JSON.stringify(objects[objectType].index);
      }
      if (serverdt !== false) {
        localStorage['objects-'+objectType+'-dt'] = serverdt;
      }
      return objects[objectType].objects[object._id]
    };

    /**
      * @method addArray
      */
    publicMembers.addArray = function(type, arr, dt, pending) {
      var output = [];
      for (var i = 0; i < array.length; i++) {
        publicMembers.addObject(type, arr[i], dt, pending);
        output.push(objects[objectType].objects[array[i]._id]);
      }
      return output;
    };

    /**
      * @method removeObj
      */
    publicMembers.removeObj = function(type, id, dt) {
      if (id in objects[type].objects) {
        delete objects[type].objects[id];
      }
      if ('objects-'+type+'-'+id in localStorage) {
        localStorage.objectsCount = parseInt(localStorage.objectsCount)-1;
        localStorage[type+'-count'] = parseInt(localStorage[type+'-count'])-1;
        delete localStorage[type+'-'+id]
      }
      var ind = objects[type].index.indexOf(id);
      if (ind != -1) {
        objects[type].index = objects[type].index.splice(ind, 1);
        localStorage[type+'-index'] = JSON.stringify(objects[type].index);
      }
      if (serverdt !== false) {
        localStorage[type+'-dt'] = dt;
      }
    };

    /**
      * @method getObj
      */
    publicMembers.getObj = function(type, id) {
      return objects[type].objects[id];
    };

    /**
      * @method getObjCount
      */
    publicMembers.getObjCount = function(type) {
      if (type in objects) {
        return objects[type].count;
      } else {
        return 0;
      }
    };

    /**
      * @method getObjectIndex
      */
    publicMembers.getObjectIndex = function(type) {
      if (type in objects) {
        return objects[type].index;
      } else {
        return [];
      }
    };

    /**
      * @method getCollection
      */
    publicMembers.getCollection = function(type) {
      if (type in objects) {
        return objects[type].collection;
      } else {
        return [];
      }
    };

    /**
      * @method getSyncObject
      */
    publicMembers.getSyncObject = function(type, id) {
      var output = {};
      if (typeof id !== 'undefined') {
        if (type in objects && id in objects[type].objects) {
          output[type] = {};
          output[type][id] = objects[type].objects[id];
        }
      } else if (typeof type !== 'undefined' && type in objects) {
        output[type] = {};
        for (var i = objects[type].collection.length - 1; i >= 0; i--) {
          output[type][objects[type].collection[i]._id] = objects[type].collection[i]._v;
        }
      } else {
        for (var x in objects) {
          output[x] = {};
          for (var i = objects[x].collection.length - 1; i >= 0; i--) {
            output[x][objects[x].collection[i]._id] = objects[x].collection[i]._v;
          }          
        }
      }
      return output;
    };

     /**
      * @method getTypes
      */
    publicMembers.getTypes = function() {
      var output = [];
      for (var x in objects) {
        output.push(x);
      }
      return output;
    };   

     /**
      * @method getTypes
      */
    publicMembers.addType = function(name, schema) {
      if (type in objects) {
        // update schema
      } else {
        // add type
      }
    };   


    /**
      * @method loadPostProcessObject
      */
    publicMembers.loadPostProcessObject = function(objectType, callback) {
      dataServiceReadyDeferred.promise.then(function() {
        objects[objectType].objectCallbacks.push(callback);
      });
    };

    protectedMembers.runObjectCallbacks = function(objectType, object) {
      var deferred = $q.defer();
      var promises = [];
      for (var i = 0; i < objects[objectType].objectCallbacks.length; i++) {
        promises.push(objects[objectType].objectCallbacks[i](object));
      }
      $q.all(promises).then(function() {
        deferred.resolve();
      });
      return deferred.promise;
    };

    protectedMembers.init();

    return publicMembers;
  }
]);

angular.module('ngKeps')

.service('$nkDataService',['$nkSocketService', '$nkRestService', function($socket, $rest){
  if (!$socket.error) {
    return $socket;
  } else {
    return $rest;
  }
}]);

"use strict";

angular.module('ngKeps')

.service('$nkModalService', [

  '$window',
  '$document',

  function($window, $document) {
    var closecb = null;

    var overlay;
    var content_fixed;
    var popbox;
    var overlay_wrapper;


    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function() {
                handler.call(el);
            });
        }
    }

/*
<overlay_wrapper>
    <overlay>
</
<content_fixed>
    <popbox>
</
*/

    function init() {
        overlay = $document[0].createElement('div');
        content_fixed = $document[0].createElement('div');
        popbox = $document[0].createElement('div');
        overlay_wrapper = $document[0].createElement('div');
        content_fixed.id = 'ngkeps_content_fixed';
        content_fixed.setAttribute('style', 'position:fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);opacity:1;z-index:2003;background-color:white; border-radius: 6px;padding: 20px 30px;');
        popbox.id = 'ngkeps_popbox';
        overlay_wrapper.id = "ngkeps_overlay_wrapper";
        overlay_wrapper.setAttribute('style', 'position:absolute;top:0;bottom:0;left:0;right:0;z-index:2002;');
        overlay.id = "ngkeps_overlay";
        overlay.setAttribute('style', 'position:fixed;top:0;bottom:0;left:0;right:0;opacity:0.3;width:100%;height:100%;background-color:black;z-index:2002;');
        overlay_wrapper.appendChild(overlay);
        content_fixed.appendChild(popbox);
        $document[0].body.appendChild(overlay_wrapper);
        $document[0].body.appendChild(content_fixed);
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        overlay_wrapper.addEventListener('click', hide);
        on($window, 'keypress', function(e) {
            //kill pop if button is ESC ;)
            if (e.keyCode == 27) {
                hide();
            }
        });
    }

    var show = function(config) {
        if (config) {
            var html = '<button type="button" class="close" onclick="window._ngkeps_model_hide(\'top_close\')" style="border: 1px solid #fff;border-radius: 15px;width: 32px;height: 32px;right: 0px;position: absolute;outline: none;color: #fff;transition: all 0.6s ease 0s;-webkit-transition: all 0.6s ease 0s;-moz-transition: all 0.6s ease 0s;-o-transition: all 0.6s ease 0s;-ms-transition: all 0.6s ease 0s;-webkit-backface-visibility: hidden;opacity: 0.6;filter: alpha(opacity=60);top: -40px;margin-top: -2px;"><span style="position: relative;top: -2px;">x</span></button>';

            if (typeof config.class == 'string' && config.class) {
                popbox.setAttribute('class', config.class);
            }
            if (config.keepLayout && (!config.class)) {
                popbox.setAttribute('style', 'position:relative;height:300px;width:300px;background-color:white;opacity:1;');
            }

            if (typeof config.content == 'string' && config.content && config.source == 'html') {
                html += config.content;
            }

            if (typeof config.content == 'string' && config.content && config.source == 'div') {
                html += $document[0].getElementById(config.content) ? $document[0].getElementById(config.content).innerHTML : config.content;
            }
            var buttons = '';
            if (config.buttons) {
                for (var i = 0; i < config.buttons.length; i++) {
                    if (typeof config.buttons[i] === 'object') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i].label+'\')" class="'+config.buttons[i].class+'" style="margin-left: 10px;">'+config.buttons[i].label+'</button>';
                    } else if (typeof config.buttons[i] === 'string') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i]+'\')" class="btn" style="margin-left: 10px;">'+config.buttons[i]+'</button>';
                    }
                }                
            }
            if (buttons !== '') {
                html += '<div style="text-align: right;padding-top: 10px;margin-top: 10px;">'+buttons+'</div>';
            }
            popbox.innerHTML = html;
            if (config.content && config.source === 'element') {
                popbox.appendChild(config.content);
            }
            if (config.content && config.source === 'angular-element') {
                angular.element(popbox).append(config.content);
            }

        }
        overlay_wrapper.style.display = '';
        overlay.style.display = '';
        content_fixed.style.display = '';
        closecb = config.close;
    };

    var hide = $window._ngkeps_model_hide = function(button) {
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        if (closecb) {
            closecb(button);
        }
    };

    //init on window loaded
    init();

    return {
        show:show,
        hide:hide
    };
}]);
angular.module('ngKeps').provider('$nkRestService', function () {
  var apiPrefix = '/api/v1/';

  this.setApiPrefix = function(value) {
    apiPrefix = value;
  };

  this.$get = ['$http', '$q', "$nkCacheService",  function($http, $q, $cacheService) {
    var publicMembers = {};
    var protectedMembers = {};
    //cache will store objects keyed by:
    //1. list of items keyed by name of db
    //2. single item keyed by objectId
    //3. list of items keyed by name of db concat with query
    var cache = {};

    publicMembers.apiPrefix = apiPrefix;
    
    var inCache = function(objectType, condition, type){
      //no query or id, return full list of objects or nothing
      if(!condition){
        if(cache[objectType]){
          return cache[objectType];
        }else{
          return false;
        }       
      }
      //data is keyed by objectID
      else if(type === 'id'){
        if(cache[condition]){
          return cache[condition];
        }else{
          return false;
        }
      //data is keyed by objectType + query
      }else if(type === 'query'){
        var key = objectType + JSON.stringify(condition);
        if(cache[key]){
          return cache[key];
        }else{
          return false;
        }
      }
    };

    /**
    * @method create - http Post to server
    */
    publicMembers.post = publicMembers.create = function(objectType, object) {
      var defer = $q.defer(); 
      $http.post(apiPrefix + objectType, object)
      .then(function(data) {
        defer.resolve(data.data);
      }, function(err) {
        defer.reject(err);
      });      
      return defer.promise;
    };

    /**
    * @method update
    */
    publicMembers.put = publicMembers.update = function(objectType, object) {
      var defer = $q.defer();
      $http.put(apiPrefix + objectType + '/' + object._id, object)
      .then(function(data){
        defer.resolve(data.data);    
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method delete
    */
    publicMembers.delete = function(objectType, object) {
      var defer = $q.defer();
      var query;
      if(object && typeof object === 'object'){
        query = apiPrefix + objectType + "/" + object._id;
      }else if(typeof object === 'string'){
        query = apiPrefix + objectType + "/" + object;
      }else{
        query = apiPrefix + objectType;
      }
      $http.delete(query)
      .then(function(data){
        defer.resolve(data.data);      
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method read - http get object by Id
    * 
    */
    //will get objectID item if provided or get all if no object ID
    publicMembers.get = publicMembers.read = function(objectType, objectId, useCache) {

      var defer = $q.defer();
      //get all items from model
      if (!objectId) {
        if(!useCache || !cacheData.hasOwnProperty(objectType)){
          $http.get(apiPrefix + objectType)
          .then(function(data){
            defer.resolve(data);
            cache[objectType] = data;
          }, function(err){
            defer.reject(err);
          });
        }else{
          defer.resolve(cacheData[objectType]);
        }
      //get specific id from model
      } else {
        var cacheData = false;
        //check if specific objectId exists in cache
        if(useCache === 'undefined' || useCache === true){
          cacheData = inCache(objectType, objectId, 'id');
        }
        if(cacheData){
          defer.resolve(cacheData);
        }else{
          $http.get(apiPrefix + objectType + '/' + objectId)
          .then(function(data){
            defer.resolve(data);
            cache[objectId] = data;       
          },function(err){
            defer.reject(err);
          });
        }        
      }
      return defer.promise;
    };

    /**
    * @method Query - http get single item from DB
    * @property query - hash where each item appended as key=value to url
    */
    publicMembers.query = function(objectType, query, useCache) {
      var defer = $q.defer();
      var cacheData = false;
      if(useCache === 'undefined' || useCache === true){
        cacheData = inCache(objectType, query, 'query');
      }
      if(cacheData){
        defer.resolve(cacheData);
      }else{
        var url = apiPrefix + objectType;
        if(query){
          url += '?query=' + JSON.stringify(query);
        }
        $http.get(url)
        .then(function(data){
          defer.resolve(data.data);
          if(query){
            var key = objectType + JSON.stringify(query);
            cache[key] = data;
          }else{
            cache[objectType] = data;
          }
        }, function(err){         
          defer.reject(err);
        });
      }
      return defer.promise; 
    };

    publicMembers.graphql = function(q) {
      var defer = $q.defer();
      //get all items from model
      $http.get(apiPrefix + 'graphqls?q=' + q)
      .then(function(data){
        defer.resolve(data);
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method runCommand
    */
    publicMembers.call = function(cmd, data) {
      var defer = $q.defer();

      var method = cmd.substr(0, cmd.indexOf('.')).toLowerCase();
      cmd = cmd.substr(cmd.indexOf('.')+1);
      var objectType = cmd.substr(0, cmd.indexOf('.'));
      cmd  = cmd.substr(cmd.indexOf('.')+1);
  
      if (typeof data === 'undefined') {
        data = {};
      }

      var url = apiPrefix + objectType + 's/' + cmd;
      if (objectType in data) {
        var restId;
        if (typeof data[objectType] === 'object' && '_id' in data[objectType]) {
          restId = data[objectType]._id;
        } else {
          restId = data[objectType]; 
          delete data[objectType];
        }
        url = apiPrefix + objectType + 's/' + restId + '/' + cmd;
      }

      if (method === 'get' || method === 'delete') {
        var serialize = function(obj, prefix) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
              str.push(typeof v == "object" ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
          }
          return str.join("&");
        };
        url += '?' + serialize(data);
        $http[method](url)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      } else if (method === 'post' || method === 'put') {
        $http[method](url, data)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      } else {
        $http.get(url)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      }
/*
      $http.post(apiPrefix + 'kepscall', {cmd:cmd, data:data})
        .then(function(data){
          defer.resolve(data.data);
        }, function(err){         
          defer.reject(err);
        });

*/
      return defer.promise; 
    };

    /**
     * @method sync
     */
    publicMembers.sync = function(type, id) {
      var defer = $q.defer();

      if (typeof type !== 'undefined') {
        var data = $cacheService.getSyncObject(type, id);
        $http.post('/' + type + '/sync', data).success(function(data){
          // add data to cache
          defer.resolve();
        }).error(function(){
          defer.reject();
          console.log('Get - Failed to retrieve data');
        });
      } else {
        var types = $cacheService.getTypes;
        var promises = [];
        for (var i = types.length - 1; i >= 0; i--) {
          promises.push(publicMembers.sync(types[i]));
        }
        $q.all(promises).then(function() {
          defer.resolve();
        });
      }

      return defer.promise;
    };

    publicMembers.loginWithProvider = function(provider, data) {
      var defer = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signin', data)
        .then(function(data) {
          defer.resolve(data.data);
        }, function(err) {
          defer.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return defer.promise;
    };

    publicMembers.signupWithProvider = function(provider, data) {
      var defer = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signup', data)
        .then(function(data) {
          defer.resolve(data.data);
        }, function(err) {
          defer.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return defer.promise;
    };

    /**
     * @method loadPostProcessObject
     */
    publicMembers.loadPostProcessObject = $cacheService.loadPostProcessObject;

    return publicMembers;
  }];
  
});
angular.module('ngKeps')

.service('$nkSchemaService',['$nkDataService', function($data){
}]);

angular.module('ngKeps')

.service('$nkSocketService', [

  '$window',
  '$timeout',
  '$q',
  '$nkCacheService',

  function($window, $timeout, $q, $cacheService) {
    if (!$window.io) {
      return {'error':'socket.io not available'};
    }

    var publicMembers = {};
    var protectedMembers = {};

    var socket;
    var backendVersion = 0;
    var supportedBackendVersions = 1;
    
    var socketCommands = [];
    var requests = {};
    var webalias = '';

    var requestId = 0;
    var reconnection_delay = 2000;
    var reconnectInterval;
    var reconnectingEnabled = true;
    var appScope;
    var initalConnectionTimeout;

    var loadUserDeferred = null;
    var socketConnectedDeferred = null;
    var loginDeferred = null;
    var pendingRequests = {};
    var offlineRequests = [];

    var lastRequestSent;
    var lastRequestReceived;
    var numberOfOutstandingRequests = 0;
    var numberOfRequests = 0;
    var cacheHit = 0;
    var storageCacheHit = 0;
    var duplicateRequest = 0;
    var requestsReceived = [];
    $window.socket = socket;

    var nestedLoadingRequests = [];
    var loadingObjects = false;

    var serviceStartedDeferred = $q.defer();
    var logoutCallback = function() {};
    var resync = false;


    // add object before run callbacks
    // Strip out none schema fields before caching objects
    // add mutable, pendable, offlineable to schemas
    // in schema's override _id, _created, _updated

    /**
     * @method getStatus
     */
    publicMembers.getStatus = function() {
      var output = {};
      output.lastRequestSent = lastRequestSent;
      output.lastRequestReceived = lastRequestReceived;
      output.numberOfOutstandingRequests = numberOfOutstandingRequests;
      output.numberOfRequests = numberOfRequests;
      output.cacheHit = cacheHit;
      output.requestsReceived = requestsReceived;
      output.duplicateRequest = duplicateRequest;
      return output;
    };

    /**
     * @method clearCache
     */
    publicMembers.clearCache = function(everything) {
      var loc;
      if (everything) {
        $cacheService.clearCache();
      } else {
        $cacheService.clearCache();
      }
    };

    /**
     * @method connect
     */
    publicMembers.start = function(scope, weba, version) {
      socketConnectedDeferred = $q.defer();

      appScope = scope;
      webalias = weba;
      appScope.connected = false;
      appScope.reconnect = false;
      appScope.cacheLoaded = false;
      supportedBackendVersions = version;
      
      serviceStartedDeferred.resolve();

      protectedMembers.setupSocket();

      return socketConnectedDeferred.promise;
    };

    /**
     * @method loginWithProvider
     */
    publicMembers.loginWithProvider = function(provider, data) {
      if (loginDeferred === null) {
        loginDeferred = $q.defer();
      }
      socketConnectedDeferred.promise.then(function() {
        socket.emit('login', {provider:provider, data:data, device:appScope.device});
      });
      return loginDeferred.promise;
    };

    /**
     * @method logout
     */
    publicMembers.logout = function() {
      socketConnectedDeferred.promise.then(function() {
        socket.emit('logout.me', {device:appScope.device});
      });
    };


    /**
     * @method add
     */
    publicMembers.add = function(objectType, object) {
      var cmd = 'post.'+objectType+'.create';
      var deferred = $q.defer();

      if (!('_id' in object)) {
        object._id = uuid.v4().replace(/-/g, '').substring(0, 24);
      }
      object._pending = true;
      protectedMembers.addObject(objectType, object, false, true);

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, {objectType:objectType, object:object, reqKey: reqKey});
          } else {
            deferred.reject('No create command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'post',
            payload: {
              objectType:objectType,
              object:object
            },
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method update
     */
    publicMembers.update = function(objectType, object) {
      var cmd = 'put.'+objectType+'.update';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            var obj = {
              objectType:objectType,
              object:object,
              reqKey: reqKey
            };
            obj[objectType] = object._id;
            socket.emit(cmd, obj);
          } else {
            deferred.reject('No update command on server');
          }
        } else {
          var payload = {
            objectType:objectType,
            object:object
          };
          payload[objectType] = object._id;
          offlineRequests.push({
            method:cmd,
            restMethod:'put',
            payload: payload,
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method delete
     */
    publicMembers.delete = function(objectType, object) {
      var cmd = 'delete.'+objectType+'.delete';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit('delete.object', {objectType:objectType, object:object, reqKey: reqKey});
          } else {
            deferred.reject('No delete command on server');
          }
        } else {
          console.log('TODO can not delete objects while offline');
          deferred.reject('TODO can not delete objects while offline');
        }
      });
      return deferred.promise;
    };

    /**
     * @method get
     */
    publicMembers.get = function(objectType, objectId) {
      var cmd = 'get.'+objectType+'.read';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (objectType in objects) {
          if (objectId in objects[objectType].objects) {
            cacheHit++;
            deferred.resolve(objects[objectType].objects[objectId]);
          } else if ('objects-'+objectType+'-'+objectId in localStorage && !appScope.connected) {
            storageCacheHit++;
            deferred.resolve(JSON.parse(localStorage['objects-'+objectType+'-'+objectId]));
            console.log('Warning: Object requested before cache loaded', objectType+'-'+objectId);
            /*
            // not necessary yet
            offlineRequests.push({
              method:'track',
              restMethod:'get',
              methodLong:'track.object',
              objectType:objectType,
              objectId:objectId,
              deferred: null
            });
            */
          } else if (pendingRequests[cmd+'-'+objectType+'-'+objectId]){
            duplicateRequest++;
            return pendingRequests[cmd+'-'+objectType+'-'+objectId];
          } else if (loadingObjects) {
            nestedLoadingRequests.push({
              objectType:objectType,
              objectId:objectId,
              deferred:deferred
            });
          } else {  
            pendingRequests[cmd+'-'+objectType+'-'+objectId] = deferred.promise;
            var payload = {
              objectType:objectType
            };
            payload[objectType] = objectId;

            if (appScope.connected) {
              if (socketCommands.indexOf(cmd)) {
                payload.reqKey = protectedMembers.getReqKey(cmd, deferred);
                socket.emit(cmd, payload);
              } else {
                deferred.reject('No read command on server');
              }
            } else {
              offlineRequests.push({
                method:cmd,
                restMethod:'get',
                payload: payload,
                deferred: deferred
              });
            }
          }
        } else {
          deferred.reject('Not registered for object type '+objectType);
        }
      });
      return deferred.promise;
    };

    /**
     * @method getIds
     */
    publicMembers.getArray = function(objectType, objectIds) {
      // TODO look up each in cache and then only request the ones needed
      var cmd = 'get.'+objectType+'.read';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        var payload = {
          objectType:objectType
        };
        payload[objectType] = objectIds;

        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            payload.reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, payload);
          } else {
            deferred.reject('No read command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'read',
            payload: payload,
            deferred: deferred
          });
        }
      });

      return requests[reqKey].promise;
    };

    /**
     * @method getQuery
     */
    publicMembers.getQuery = function(objectType, query) {
      var cmd = 'get.'+objectType+'.query';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, {objectType:objectType, query:query, reqKey: reqKey});
          } else {
            deferred.reject('No query command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'get',
            payload: {
              objectType:objectType,
              query:query
            },
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method localQuery
     */
    publicMembers.localQuery = function(objectType, query) {
      var deferred = $q.defer();
      serviceStartedDeferred.promise.then(function() {
        var output = [];
        for (var i in objects[objectType].objects) {
          /*
          var add = false;
          if (query) {
            var path;
            var count = 0;
            for (path in query) {
              count++;
              var values = findValues(obj, path);
              var i;
              var reject = false;
              for (i = 0; i < values.length; i++) {
                if (values[i] === query[path]) {
                  add++;
                  break;
                }
              }
            }
            if (add === count) {
              add = true;
            } else {
              add = false;
            }
          } else {
            add = true;
          }
          if (add) {
            */
            output.push(objects[objectType].objects[i]);
          //}
        }
        deferred.resolve(output);
      });
      return deferred.promise;
    };

    /**
     * @method runCommand
     */
    publicMembers.runCommand = function(cmd, data) {
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            data.reqKey = protectedMembers.getReqKey('callback', deferred);
            console.log('*** emit', cmd, data);
            socket.emit(cmd, data);
          } else {
            deferred.reject('No command "' + cmd + '"on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'callback',
            payload: data,
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };  

    /**
     * @method loadPostProcessObject
     */
    publicMembers.loadPostProcessObject = $cacheService.loadPostProcessObject;

    /**
     * @method sync
     */
    publicMembers.sync = function(user) {
      var payload = {};
      payload.objects = $cacheService.getSyncObject();
      if (user) {
        payload.user = user;
      }
      socket.emit('sync', payload);
    };

    protectedMembers.findValues = function(obj, key, path, memo) {
      _.isArray(memo) || (memo = []);
      _.isString(path) || (path = '');
      _.forOwn(obj, function(val, i) {
        if (path+i === key) {
          memo.push(val);
        } else {
          findValues(val, key, (_.isArray(obj) ? path : path+i+'.'), memo);
        }
      });
      return memo;
    };

    protectedMembers.initalConnect = function() {
      console.log('trying to connect');
      if (socket) {
        socket.io.connect();
      } else {      
        $window.socket = socket = io.connect('http://'+webalias+'/',{
          'sync disconnect on unload': false,
          'reconnect': false,
          'transports': ['websocket', 'polling']
        });
      }
      initalConnectionTimeout = $timeout(function() {
        if (!appScope.connected) {
          reconnectingEnabled = false;
          if(reconnectInterval) {
            clearInterval(reconnectInterval);
          }
          // if (offlinemode) {
            protectedMembers.initalConnect();
          //} else {
          //  socketConnectedDeferred.reject();            
          //}
        }
      }, 15000);
    };

    protectedMembers.addObjects = function(objects, serverdt) {
      var deferred = $q.defer();
      var promises = [];
      var i, j;
      nestedLoadingRequests = [];
      loadingObjects = true;

      for (i in objects) {
        for (j = 0; j < objects[i].length; j++) {
          promises.push(protectedMembers.addObject(i, objects[i][j], serverdt, false));
        }
      }

      if (nestedLoadingRequests.length > 0) {
        protectedMembers.runNestedLoadingRequests();
      }

      $q.all(promises).then(function() {
        loadingObjects = false;
        deferred.resolve();
      });
      return deferred.promise;
    };

    protectedMembers.runNestedLoadingRequests = function() {
      for (var i = 0; i < nestedLoadingRequests.length; i++) {
        var req = nestedLoadingRequests[i];
        if (req.objectId in objects[req.objectType].objects) {
          req.deferred.resolve(objects[req.objectType].objects[req.objectId]);
        } else {
          publicMembers.get(req.objectType, req.objectId).then(function(obj) {
            req.deferred.resolve(obj)
          });
        }
      }
    };

    protectedMembers.getReqKey = function(msg, deferred) {
      var key = msg+'-'+socket.io.engine.id+'-'+requestId;
      requests[key] = deferred;
      lastRequestSent = key;
      requestId++;
      numberOfRequests++;
      numberOfOutstandingRequests++;
      return key;
    };

    protectedMembers.processReqKey = function(reqKey, payload, objectType) {
      if (reqKey in requests) {
        lastRequestReceived = reqKey;
        requests[reqKey].resolve(payload);
        numberOfOutstandingRequests--;
        delete requests[reqKey];
        if (objectType === 'objects') {
          requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' objects');
        } else if (objectType === 'callback') {
          requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' callback');
        } else if (typeof payload === 'object') {
          if (Object.prototype.toString.call(payload) === '[object Array]') {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' array');
          } else if ('_id' in payload) {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' '+payload._id);
          } else {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' unknown');
          }
        } else {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' unknown');
        }
      }
    };

    protectedMembers.rejectReqKey = function(reqKey, reason) {
      if (reqKey in requests) {
        lastRequestReceived = reqKey;
        requests[reqKey].reject(payload);
        numberOfOutstandingRequests--;
        delete requests[reqKey];
      }
    };

    protectedMembers.flushOfflineRequests = function() {
      if (offlineRequests.length > 0) {
        var i;
        for (i = 0; i < offlineRequests.length; i++) {
          var o = offlineRequests[i];
          if (o.objectType in objects && o.objectId in objects[o.objectType].objects && o.restMethod === 'get') {
            if (o.deferred !== null) {
              o.deferred.resolve(objects[o.objectType].objects[o.objectId]);                
            }
          } else {
            if (socketCommands.indexOf(o.method)) {  
              var reqKey = protectedMembers.getReqKey(o.method, o.deferred);
              o.payload.reqKey = reqKey;
              socket.emit(o.method, o.payload);
            } else {
              o.deferred.reject('Command not on server');
            }
          }
        }
      }
      offlineRequests = [];
    };

    protectedMembers.setupSocket = function() {
      protectedMembers.initalConnect();
      socket.on('error', function (data) {
        console.error('Socket Error', JSON.stringify(data));
      });
      socket.on('disconnect', function (data) {
        appScope.connected = false;
        resync = true;
        if (reconnectingEnabled) {
          reconnectInterval = setInterval(function() {
            socket.io.connect();
          }, reconnection_delay);
        }
      });
      socket.on('reconnect', function (data) {
      });
      socket.on('reconnecting', function (data) {
        if (reconnectingEnabled) {
          appScope.reconnect = true;
        }
      });
      socket.on('connect', function (data) {
        console.log('connected');
        if(reconnectInterval) {
          clearInterval(reconnectInterval);
        }
        $timeout.cancel(initalConnectionTimeout);

        socket.emit('client.register', {'device':appScope.device});

        appScope.$safeApply(function() {
          appScope.connected = true;
          if (resync && appScope.user) {
            publicMembers.loadUser();
          }
          appScope.reconnect = false;
        });
      });
      socket.on('client.objects', function (data) {
        backendVersion = data.backendVersion;
        if (backendVersion > supportedBackendVersions) {
          socketConnectedDeferred.reject('backendVersion');
        } else {
          for (var i in data.objects) {
            $cacheService.addType(i, data.objects[i].schema);
          }
          $cacheService.storage.set('commands', data.commands);
          socketCommands = data.commands;
          socketConnectedDeferred.resolve();
          publicMembers.sync();
        }
      });
      socket.on('err', function (data) {
        if (data.func.indexOf('get.me') !== -1) {
          loadUserDeferred.reject();
          if (resync) {
            resync = false;
            logoutCallback();
          }
        }
        if (data.reqKey) {
          protectedMembers.rejectReqKey(data.reqKey, data.message);
        }
        console.error('Socket Server Error', JSON.stringify(data));
      });

      socket.on('get.me', function (data) {
        resync = false;
        appScope.user = data.user;
        objects.user.objects[data.user._id] = data.user;
        protectedMembers.addObject('user', data.user, data.dt, false);

        if (data.objects) {
          protectedMembers.addObjects(data.objects, data.dt).then(function() {
            protectedMembers.flushOfflineRequests();
            loadUserDeferred.resolve();
          });  
        } else {
          protectedMembers.flushOfflineRequests();
          loadUserDeferred.resolve();
        }
      });

      socket.on('login.successful', function (data) {
        loginDeferred.resolve(data);
        publicMembers.sync();
      });
      socket.on('login.unsuccessful', function (data) {
        loginDeferred.resolve(false);
      });

      socket.on('remove', function (data) {
        if (data.objectType in objects) {
          protectedMembers.removeObject(data.objectType, data.object, data.dt);
          if (data.reqKey) {
            protectedMembers.processReqKey(data.reqKey, objects[data.objectType].objects[data.object._id], data.objectType);
          }
        }
      });

      socket.on('update', function (data) {
        if (data.objectType in objects) {
          if ('object' in data) {
            if (Object.prototype.toString.call(data.object) === '[object Array]') {
              var output = protectedMembers.addArray(data.objectType, data.object);
              if (data.reqKey) {
                protectedMembers.processReqKey(data.reqKey, output, data.objectType);
              }
            } else {
              protectedMembers.addObject(data.objectType, data.object, data.dt, false);
              if (data.reqKey) {
                protectedMembers.processReqKey(data.reqKey, objects[data.objectType].objects[data.object._id], data.objectType);
                var cmd = data.reqKey.substring(0, data.reqKey.indexOf('-'));
                if (cmd+'-'+data.objectType+'-'+data.objectId in pendingRequests) {
                  delete pendingRequests[cmd+'-'+data.objectType+'-'+data.objectId];              
                }
              }
            }
          }
        }
        if ('objects' in data) {
          protectedMembers.addObjects(data.objects, data.dt).then(function() {
            if (data.reqKey) {
              protectedMembers.processReqKey(data.reqKey, output, 'objects');
            }
          });
        }
      });

      socket.on('callback', function (data) {
        if (data.reqKey) {
          protectedMembers.processReqKey(data.reqKey, data.payload, 'callback');
        }
      });

    };

    return publicMembers;

  }
 ]);



/*
Socket security code, too be implemented later, please remove winston and underscore if you can
+ remove timeout so users can get through login screen

var _ = require('underscore');
var winston = require('winston');

function forbidConnections(nsp) {
  //Set a listener so connections from unauthenticated sockets are not
  //considered when emitting to the namespace. The connections will be
  //restored after authentication succeeds.

  nsp.on('connection', function(socket){
    if (!socket.auth) {
      winston.debug("removing socket from", nsp.name);
      delete nsp.connected[socket.id];
    }
  });
}

function restoreConnection(nsp, socket) {
  // If the socket attempted a connection before authentication, restore it.
  if(_.findWhere(nsp.sockets, {id: socket.id})) {
    winston.debug("restoring socket to", nsp.name);
    nsp.connected[socket.id] = socket;
  }
}

module.exports = function(io, config){
  //Adds connection listeners to the given socket.io server, so clients
  //are forced to authenticate before they can receive events.

  var config = config || {};
  var timeout = config.timeout || 1000;
  var postAuthenticate = config.postAuthenticate || function(){};

  _.each(io.nsps, forbidConnections);
  io.on('connection', function(socket){
    
    socket.auth = false;
    socket.on('authentication', function(data){
      
      config.authenticate(data, function(err, success){
        if (success) {
          winston.debug("Authenticated socket ", socket.id);
          socket.auth = true;
          _.each(io.nsps, function(nsp) {
            restoreConnection(nsp, socket);
          });
          socket.emit('authenticated');
          return postAuthenticate(socket, data);
        }
        socket.disconnect('unauthorized', {err: err});
      });

    });

    setTimeout(function(){
      //If the socket didn't authenticate after connection, disconnect it
      if (!socket.auth) {
        winston.debug("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, timeout);

  });
}
*/
/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('fileInputService',['validatorService',
  function(validatorService){
    return function(scope) {
      scope.fileChanged = function(evt){
        scope.uploadStatus = 'Checking...';
        var valid = validatorService.fileValidation(scope, evt.target.files[0]);
        if(valid){
          scope.uploadStatus = 'Uploading...';
          var formdata = new FormData();
          formdata.append('file', evt.target.files[0]);
          var request = new XMLHttpRequest();
          request.onreadystatechange = function(){
            if(request.readyState === 4){
              scope.kepsModel= JSON.parse(request.responseText);
              scope.uploadStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
              scope.$apply();
            }
          };
          request.open('POST', '/admin/upload/file', true);
          request.send(formdata);
        }
      };
      if(scope.kepsType.fileTypes && Array.isArray(scope.kepsType.fileTypes)){
        scope.kepsAcceptFileTypes = scope.kepsType.fileTypes[0];
        for(var i = 1; i < scope.kepsType.fileTypes.length;i++){
          scope.kepsAcceptFileTypes += "," + scope.kepsType.fileTypes[i];
        }
      }
    };
  }]);

/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('geopointInputService',[
  function(){
    return function(scope) {
      if(scope.kepsModel){
        scope.data.value = scope.kepsModel;
        scope.data.lat = scope.kepsModel[0];
        scope.data.lng = scope.kepsModel[1];
      }
      var firstMapRun = true;
      var map;
      var marker;

      scope.testLatLng = function(){
        if(scope.data.lat <= 85 && scope.data.lat >= -85  &&
           scope.data.lng <= 180 && scope.data.lng >= -180){

          if(scope.data.lat && scope.data.lng && firstMapRun){
            var initMap = function(){
              var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
              map = new google.maps.Map(document.getElementById('map'),
                {
                  center:latLng,
                  zoom:6
                }
              );
              marker = new google.maps.Marker(
                {
                  position: latLng,
                  map: map,
                }
              );
              firstMapRun = false;
            };
            if(typeof(google) === 'undefined'){
              var s = document.createElement('script');
              s.src = window.location.protocol + "//maps.googleapis.com/maps/api/js?callback=initMap";
              document.body.appendChild(s);
            }else{
              initMap();
            }

          }else{
            if(scope.data.lat && scope.data.lng){
              var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
              marker.setMap(null);
              marker = new google.maps.Marker({
                position:latLng,
                map:map
              });
              map.setCenter(marker.getPosition());
              scope.data.value = [scope.data.lat, scope.data.lng];
            }
          }
        }
      };
    };
  }]);

/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('imageInputService',['validatorService',
  function(validatorService){
    return function(scope) {
      scope.kepsType.randomCanvasId = Math.ceil(Math.random() * 9999);
      if(typeof scope.kepsModel === 'object'){
        if(scope.kepsModel.absoluteFilePath !== 'undefined'){
          // TODO add filename to file input
          var img = new Image();
          img.src = scope.kepsModel.filePath;
          img.onload = function(){
            scope.drawToCanvas(img);
          };
        }
      }

      scope.imageFileChanged = function(evt){
        if(validatorService.fileValidation(scope, evt.target.files[0])){
          var formdata = new FormData();
          scope.kepsType.imageError = false;
          var filetype;
          var ctx;  

          if(evt.target.files[0].name.includes('.jpg')){
            filetype ="image/jpg";
          }else if(evt.target.files[0].name.includes('.png')){
            filetype = "image/png";
          }else{
            window.alert('image filetype not recognized');
          }

          if(scope.kepsType.size && scope.kepsType.size < evt.target.files[0].size){
            scope.$apply(function(){
              scope.kepsType.imageUploading = false;
              scope.kepsType.imageError = "File size exceeds maximum allowed: " + scope.kepsType.size +"B";
            });
            return;
          }
            
          //draw image preview
          var img = new Image();
          img.src = URL.createObjectURL(evt.target.files[0]);

          img.onload = function() {
            scope.drawToCanvas(img);
            scope.imageStatus = 'Uploading...';
            formdata.append('file', evt.target.files[0]);
            formdata.append('data', evt.target.files[0]);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
              if(request.readyState === 4){
                if(request.status !== 200 && request.status !== 304){
                  if(request.status === 413){
                    scope.$apply(function(){
                     scope.kepsType.imageError = "Error uploading image: Image rejected due too image size:   " + request.responseText; 
                    });
                  }else{
                    scope.$apply(function(){
                      scope.kepsType.imageError = "Error uploading image: " + request.status + ": " + request.responseText;
                    });
                  }
                }else{
                  scope.$apply(function() {
                    scope.kepsType.imageUploading = false;
                    scope.kepsModel = JSON.parse(request.responseText);
                    scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
                  });
                }
              }
            };
            request.open('POST', '/admin/upload/image', true);
            request.send(formdata);
          };
        }
      };
      scope.getImageUrl = function(){
        if(scope.kepsType.imageUrl && scope.kepsType.imageUrl.match(/(\S+\.[^/\s]+(\/\S+|\/|))/g)){
          
          var canvas = document.getElementById(scope.kepsType.randomCanvasId);
          var filetype;
          var ctx;  
          var img = new Image();
          img.src = scope.kepsType.imageUrl;
          img.onload = function(){
            scope.imageStatus = 'Uploading...';
            //send url to backend, get image data
            var formdata = new FormData();
            formdata.append('url', scope.kepsType.imageUrl);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
              if(request.readyState === 4){
                scope.$apply(function() {
                  scope.kepsModel = JSON.parse(request.responseText);
                  scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
                });
              }
            };
            request.open('POST', '/admin/upload/image', true);
            request.send(formdata);
        
            scope.drawToCanvas(img);
          };
        }
      };
      scope.drawToCanvas = function(img, canvasId){
        var width = document.createAttribute('width');
        var height = document.createAttribute('height'); 
        var canvas = document.getElementById(scope.kepsType.randomCanvasId);
        var ctx;
        //scale images reasonably
          if(img.width > img.height){ 
            width.value =  (img.width > 300)  ? 300 : img.width;
            height.value = (img.width > 300)  ? img.height/img.width * 300 : img.height;
          }else if(img.height > img.width){
            height.value = (img.height > 300) ? 300 : img.height;
            width.value =  (img.height > 300) ? img.width/img.height * 300 : img.width;
        }

        canvas.setAttributeNode(width);
        canvas.setAttributeNode(height);
        ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,width.value,height.value);
        ctx.fillStyle = "black";
        ctx.font = "bold 16px serif";
        ctx.fillText(img.height + ' X ' + img.width, width.value*0.05, height.value - 5);
      };

      scope.removeImage = function(){
        var canvas = document.getElementById(scope.kepsType.randomCanvasId);
        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;

        var img = ctx.createImageData(width, height);
        for (var i = img.data.length; --i >= 0; ){          
          img.data[i] = 0;
        }
        ctx.putImageData(img,0,0);
        delete scope.kepsModel;
      }

    };
  }]);
'use strict';


angular.module('ngKeps')
.service('validatorService',[
  function(){
    var stringValidation = function(scope){
      scope.errorMsg = false;
      
      if(scope.kepsType.match){
        var regex;
        if(typeof scope.kepsType.match === 'string'){
          regex = new RegExp(scope.kepsType.match);
        }else{
          return;
        }
        console.log(regex.test(scope.data.value));
        if(!regex.test(scope.data.value)){
          if(scope.kepsErrors){scope.kepsErrors.pattern = 'Input does not match pattern';}
          return scope.errorMsg = 'Input does not match pattern';
        }
      }

      if(scope.kepsType.maxlength){
        if(scope.data.value.length > scope.kepsType.maxlength){
          if(scope.kepsErrors){scope.kepsErrors.maxlength = 'Input must be shorter than ' + scope.kepsType.maxlength;}; 
          return scope.errorMsg = 'Input must be shorter than ' + scope.kepsType.maxlength; 
        }
      }

      if(scope.kepsType.minlength){
        if(scope.data.value.length < scope.kepsType.minlength){
           if(scope.kepsErrors){scope.kepsErrors.minlength = 'Input must be longer than ' + scope.kepsType.minlength;}
          return scope.errorMsg = 'Input must be longer than ' + scope.kepsType.minlength;
        }
      }
    };

    var numberValidation = function(scope){
      scope.errorMsg = false;
      if(scope.data.value === undefined){
        scope.errorMsg = "Invalid value";
        if(typeof scope.kepsType.max === 'number') scope.errorMsg += ", value must be less than or equal to " + scope.kepsType.max;
        if(typeof scope.kepsType.min === 'number') scope.errorMsg += ", value must be greater than or equal to " + scope.kepsType.min;
        return scope.errorMsg;
      }else{
        if(typeof scope.kepsType.max === 'number'){
          if(scope.data.value > scope.kepsType.max){
            if(scope.kepsErrors){scope.kepsErrors.max = 'Number must be smaller than '  + scope.kepsType.max;}
            return scope.errorMsg = 'Number must be smaller than '  + scope.kepsType.max;
          }
        }
        if(typeof scope.kepsType.min === 'number'){
          if(scope.data.value < scope.kepsType.min){
            if(scope.kepsErrors){scope.kepsErrors.min = 'Number must be bigger than ' + scope.kepsType.min};
            return scope.errorMsg = 'Number must be bigger than ' + scope.kepsType.min;
          }
        }
      }


    };

    var fileValidation = function(scope, file){
      if(scope.kepsType.hasOwnProperty('filetype')){
        if(file.type !== scope.kepsType.filetype){
          if(scope.kepsErrors){scope.kepsErrors.filetype = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;}
          scope.errorMsg = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;
          scope.$apply();
          return false;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxsize')){
        if(file.size > scope.kepsType.maxsize){
          if(scope.kepsErrors){scope.kepsErrors.maxsize = 'File size too large, max size ' + scope.kepsType.maxsize;}
          scope.errorMsg = 'File size too large, max size ' + scope.kepsType.maxsize;
          scope.$apply();
          return false;
        }
      }
      return true;
    };

    var geopointValidation = function(scope){
      scope.errorMsg = false
      if(scope.kepsType.hasOwnProperty('minlat')){
        if(scope.data.value.lat < scope.kepsType.minlat){
          if(scope.kepsErrors){scope.kepsErrors.minlat = 'Latitude must be greater than ', scope.kepsType.minlat;}
          return scope.errorMsg = 'Latitude must be greater than ' + scope.kepsType.minlat;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxlat')){
        if(scope.data.value.lat > scope.kepsType.maxlat){
          if(scope.kepsErrors){scope.kepsErrors.maxlat = 'Latitude must be less than ', scope.kepsType.maxlat;}
          return scope.errorMsg = 'Latitude must be less than ' + scope.kepsType.maxlat;
        }
      }
      if(scope.kepsType.hasOwnProperty('minlng')){
        if(scope.data.value.lng < scope.kepsType.minlng){
          if(scope.kepsErrors){scope.kepsErrors.minlng = 'Longitude must be greater than ', scope.kepsType.minlng;}
          return scope.errorMsg = 'Longitude must be greater than ' + scope.kepsType.minlng;
        }
      }
      if(scope.kepsType.hasOwnProperty('maxlng')){
        if(scope.data.value.lng > scope.kepsType.maxlng){
          if(scope.kepsErrors){scope.kepsErrors.maxlng = 'Latitude must be less than ', scope.kepsType.maxlng;}
          return scope.errorMsg = 'Longitude must be less than ' + scope.kepsType.maxlng;
        }
      }
    };

    var emailValidation = function(scope){
      scope.errorMsg = '';
      var reg = /@/
      if(reg.test(scope.data.value)){

      }else{
        if(scope.kepsErrors){scope.kepsErrors.emailInvalid = 'Invalid email format';}
        return scope.errorMsg = 'Invalid email format';
      }
    };

    var multiValidation = function(scope){
      scope.errorMsg = '';

      if(scope.kepsType.maxpicked || scope.kepsType.minpicked){
        var test = scope.data.value.length > 0 ? scope.data.value.split(',').length : 0;
        if(test > scope.kepsType.maxpicked){
          if(scope.kepsErrors){
            scope.kepsErrors.maxpicked= 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
          }
          return scope.errorMsg = 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
        }
        if(test < scope.kepsType.minpicked){
          if(scope.kepsErrors){
            scope.kepsErrors.maxpicked= 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;
          }
          return scope.errorMsg = 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;

        }
      }
    };

    return {
      stringValidation:stringValidation,
      numberValidation:numberValidation,
      fileValidation:fileValidation,
      geopointValidation:geopointValidation,
      emailValidation:emailValidation,
      multiValidation:multiValidation
    };
  }]);
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

