class JSarray{ 
    constructor(array){
        this.array = [];
        this.size = [];

        var complex = false; 

        for(var i=0; i<array.length; ++i){
            if(Array.isArray(array[i])){
                this.array.push(new JSarray(array[i]))
                complex=true; 
            }
            else{
                this.array.push(array[i])
            }
        }

        if(!complex){
            this.size.push(array.length) 
        }
        else{
            this.size.push(array.length)
            // console.log(this.array[0])
            //console.log(this.array[0].getsize())
            this.size = this.size.concat(this.array[0].getsize())
        }

        this.complex = complex;
    }
    
    print(){

        if(this.complex){
            for(var i=0; i<this.size[0]; ++i){
                this.array[i].print()
            }
        }
        else{
        console.log(this.array)
        }
    }

    getsize(){
       return this.size; 
    }

    dotproduct(jsarray){

        if(!(this.size).length==1 || !(jsarray.getsize()).length==1){
            console.log(this.size.length)
            console.log(jsarray.getsize())
            throw 'either of the two JSarrays are not arrays'; 
        }

        else if((this.array).length!==(jsarray.array).length){
            throw 'size of the array is not equal'
        }

        var output = 0 

        for(var i=0; i<(this.array).length; ++i){
            output += this.array[i]*jsarray.array[i]
        }

        return output; 
    }

    getelement(i){
        return this.array[i]        
    }

    transpose(){
        var output = []

        if(this.size.length==1){
            return [...this.array]
        }

        else if(this.size.length==2){

            for(var i=0; i<this.size[1]; ++i){
                var temp = []

                for(var j=0; j<this.size[0]; ++j){
                    temp.push(this.array[j].getelement(i))
                }
                output.push(temp); 
            }   
            return new JSarray(output); 
        }

        else{
            throw 'either of the two JSarrays are not arrays'; 
        }
    }

    append(jsarray){
        for(var i=0; i<jsarray.getsize().length; ++i){
            this.array.push(jsarray[i]); 
        }
    }

    length(){

        if(this.size.length!==1){
            throw 'error not a vector'; 
        }

        output = 0 

        for(var i=0; i<this.size[0]; ++i){
            output += this.array[i]**2; 
        }
    }

    allindex(i){
        output = []
        
        if(this.size.length!==2){
            throw 'array not of length 2'
        }

        for(var j=0; j<this.size[0]; ++i){
            output.push(this.array[j].getelement(i))
        }

        return JSarray(output)
    }

    add(jsarray){

        if(this.size.length !== jsarray.getsize().length){
            throw 'tensors cannot be added'            
        }

        var temp = []

        return new JSarray(AddHelper(this, jsarray))
    }

    mutiply(num){
        return new JSarray(MultHelper(this, num))
    }

    elementproduct(jsarray){
       return new JSarray(ElementProductHelper(this, jsarray))
    }

    matrixproduct(jsarray){
        // do the safety to check if the two matrices can actually be mulitplied. 

        var output = []

        if(!this.complex){
            return this.dotproduct(jsarray)
        }

        else{

            var i = this.array.length
            var j = jsarray.array.length
            var k = jsarray.array[0].array.length

            console.log(i)
            console.log(j)
            console.log(k)


            for(var m=0; m<i; ++m){ 
                var temp = []

                for(var q=0; q<k; ++q){
                    var element = 0 
                    for(var p=0; p<j; ++p){
                        element += this.array[m].getelement(p)*jsarray.array[p].getelement(q)                    
                    }

                    console.log(element)
                    temp.push(element)
                }
                output.push(temp)
            }

            return new JSarray(output)
        }
    }
}

// [2, 3]
// [0, 0, 0]

CreateZeroArray = (sizeArray)=>{

    var temp = []
    if(sizeArray.length === 1){

        var num1 = sizeArray[0]

        for(var i=0; i<num1; ++i){
            temp.push(0)
        }

        return temp
    }
    else{

        var subarray = CreateZeroArray(sizeArray.slice(1))
        var num1 = sizeArray[0]

        for(var i=0; i<num1; ++i){
            temp.push(subarray)
        }
        
        return temp
    }
}



CreateZeroJSArray = (sizeArray)=>{
    return new JSarray(CreateZeroArray(sizeArray))
}

// assumes that the two arrays are addable
AddHelper = (jsarray1, jsarray2)=>{

    var temp = []

    for(var i=0; i<jsarray1.array.length; ++i){

        if(jsarray1.array[i] instanceof JSarray){
            temp.push(AddHelper(jsarray1.array[i], jsarray2.array[i]))
        }
        else{
            temp.push(jsarray1.array[i]+jsarray2.array[i])
        }

    }

    return temp
}

MultHelper = (jsarray, num)=>{
    var temp = []

    for(var i=0; i<jsarray.array.length; ++i){

        if(jsarray.array[i] instanceof JSarray){
            temp.push(MultHelper(jsarray.array[i], num))
        }
        else{
            temp.push(jsarray.array[i]*num)
        }
    }

    return temp
}

ElementProductHelper = (jsarray1, jsarray2)=>{
    // this assumes that a total internal product is possible between the two 
    var temp = []
    var size = jsarray1.array.length

    for(var i=0; i<size; ++i){

        if(jsarray1.array[i] instanceof JSarray){
            temp.push(ElementProductHelper(jsarray1.getelement(i), jsarray2.getelement(i)))
        }
        
        else{
            temp.push(jsarray1.getelement(i)*jsarray2.getelement(i))
        }
    }

    return temp
}



export {JSarray, CreateZeroArray}