class JSarray{ 
    constructor(array){
        this.array = [];
        this.size = []

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

        for(var i=0; i<this.size[0]; ++i){
            //console.log(jsarray.array[i])
            if(this.array[i] instanceof JSarray){
                this.array[i].add(jsarray.array[i])
            }
            else{
                this.array[i]=this.array[i]+jsarray.array[i]; 
            }
        }
    }

    mutiply(num){
       for(var i=0; i<this.size[0]; ++i){
        if(this.array[i] instanceof JSarray){
            this.array[i].mutiply(num); 
        }
        else{
            this.array[i] = this.array[i]*num; 
        }
       }
    }
}


export {JSarray}