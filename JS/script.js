var preTxt = document.getElementById("preTxt");

module = function(){
    
    var divOtpt = document.getElementById("divOutput"),
        clearBtn = document.getElementById("clrBtn"),
        preBtn = document.getElementById("preBtn"),
        divTable = document.getElementById("divTable"),
        size = 0,
        keyVal = {},
        flag = false;
    
    /**
    * init() - Creates javascript object.
    * @param {string} preTxtVal - Input from text area.
    */
    
    var init = function(preTxtVal){

        var mainArr = [];            
        
        if(textValidation(preTxtVal) === true)              // If text area input is valid then only proceed
        {
            flag = true;
            clearScreen();
            document.getElementById("error").style.display = "none";
            
            for(var k in keyVal){                           // Iterate over the object    
                size++;
                //console.log("objKEY: "+k+" objVAL: "+keyVal[k]);
                var result = isPalindrome(k),                   // Call to isPalindrome to check palindrome or not
                    resultFinal = "";
                
                if(result === true){
                    resultFinal = "Palindrome";
                }else{
                    resultFinal = "Not Palindrome";
                }
                    
                createTable(k,keyVal[k],resultFinal);           // Call to createTable for output
            
            }
        }
        
    };
    
    /**
    * textValidation() - Vlaidates the data in text area
    * @param {string} preTxtVal - Text from text area.
    * @return {boolean} - on successful validations
    */
    
    var textValidation = function(preTxtVal){
    
        var reKey = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?\s]*$/,
            reVal = /^[0-9]+$/;
        
        if(flag == true){
            keyVal = {};
        }
        
        mainArr = preTxtVal.split(/[\n]+/);                    // Splits on new line  
        mainArrLen = mainArr.length;

        for(var i=0; i<mainArrLen; i++)
        {
            if((mainArr[i].indexOf(':') === -1) || mainArr[i] === ""){      // Validates the text for white space and : if exists
                
                 var error1 = "Enter Valid String e.g: bob:3";
                 keyVal = {};
                 errorMsg(error1);   
                 return false;
                
            }else{
                
                token = mainArr[i].split(/[:]/);                            // Else split line on : 
                key = token[0].toLowerCase().trim();                        // and store as key value 
                value = token[1].trim();
                
                //console.log("KEY: "+key);
                
                if((reKey.test(key) === false) || (reVal.test(value) === false))       // Checks for valid text in the text area 
                {                                                                      // against regex using .test
                    var error2 = "Enter Valid String on new line e.g: john:6";
                    keyVal = {};
                    errorMsg(error2);   
                    return false;
                }else{
                    //console.log("KEY: "+key+" VAL: "+value);
                    if(keyVal.hasOwnProperty(key)){                             // Store in object as a key value pair
                        pastValue = parseInt(keyVal[key]);
                        newValue = pastValue + parseInt(value);
                        keyVal[key] = newValue;
                    }else{
                        keyVal[key] = parseInt(value);
                    }
                    
                }   
            }
        }
        
        return true;                // returns true if everything validates
    };
    
    /**
    * errorMsg() - Display error message.
    * @param {string} str - error string as input to display.
    */
    
    var errorMsg = function(str){
        var error = document.getElementById("error");
        error.style.display = "block";
        error.innerHTML = str;
        flag = false;
    };
    
    /**
    * clearScreen() - Clears the table from the screen.
    */
    
    var clearScreen = function(){
        
            var container = document.getElementById("container"),
                preTable = document.getElementById("preTable");
        
            while(preTable.firstChild){                         // Iterations on table to delete row elements
                preTable.removeChild(preTable.firstChild);          
            }
    };
    
    /**
    * isPalindrome() - Checks if String is palindrome or not.
    * @param {string} str - Key as input.
    * @return {boolean} - If palindrome return true
    */
    
    var isPalindrome = function(str){
        
        //console.log("String: "+str);
        var oriString,
            reverseString;
        
        str = str.toLowerCase()
                 .replace(/\s+/g,'')
                 .replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,''); // replace: use to ignore spaces and punctuation
        
        oriString = str;
        oriStringLen = str.length;
        
        //console.log(oriStringLen);
        
        for(var i=0;i<oriStringLen/2;i++){
            if(oriString[i] !== oriString[oriStringLen - 1 - i]) // Checks the string is Palindrome or not
            {                                                    // if yes returns true else false   
                return false;
            }
        }
        return true;
    };
    
    
    /**
    * createTable() - Creates a table.
    * @param {string} key - Key in the object.
    * @param {integer} val - Respective value of the Key.
    * @param {string} res - Result if it is Palindrome or not.
    */
    
    var createTable = function(key,val,res){
      
        //console.log(" KEY: "+key+" VAL: "+val+" RES: "+res);
        
        var tr = document.createElement("tr"),
            preTable = document.getElementById("preTable"),
            tdKey = document.createElement("td"),
            tdVal = document.createElement("td"),
            tdRes = document.createElement("td"),
            keyText = document.createTextNode(key),
            valText = document.createTextNode(val),
            resText = document.createTextNode(res);
        
        divTable.style.display = "block";
        
        for(var i=0;i<size;i++){                            // Iterates over the size of object to create table
            //preTable.appendChild(tr);
            for(var j=0;j<3;j++){
                tdKey.appendChild(keyText);
                tdVal.appendChild(valText);
                
                if(res === "Palindrome"){                       // Check if palidrome or not and assign color accordingly
                    tdRes.style.backgroundColor = "#33CC66";
                }else{
                    tdRes.style.backgroundColor = "#CC3333";
                }
                
                tdRes.appendChild(resText);
                tr.appendChild(tdKey);
                tr.appendChild(tdVal);                        // Append rows in table              
                tr.appendChild(tdRes);
                preTable.appendChild(tr);
            }
        }
    };
    
    return{init:init}
    
}();    // Self Invoking function

function doTask(){                          // On submit calls doTask()
    
    var preTxtVal = preTxt.value;
    module.init(preTxtVal);       
}