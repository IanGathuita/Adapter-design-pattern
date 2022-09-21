//Adapter will convert old type to new type and call the method that supports the new type the way we called old method.

//we got data as a comma delimited string and converted it to a string array
class ArrayFromCommaString{
    printArray(sentense: string):string[] {
        return sentense.split(',');
    }
    
}

//we now get a better maintained class but only works with  star delimited strings
class ArrayFromStarString{
    print(sentense: string):string[] {
        return sentense.split('*');
    }    
}

/*extend old class(target) so that we can override the target's function in Adapter. This way, the method in adapter will have same name as
that in target making the name we use to call consistent. Have an instance of Adaptee so that we can call adaptee's method with compatible
(converted) data*/
class ArrayFromStarStringAdapter extends ArrayFromCommaString{
    adaptee:ArrayFromStarString;

    constructor(){
        super();
        this.adaptee = new ArrayFromStarString();
    }

    printArray(sentense: string):string[] {
        //use global regex flag to replace all occurences
        const pattern = /,/g;
        let newSentence = sentense.replace(pattern,'*');
        return this.adaptee.print(newSentence);
    }
}

const commaDelimitedString = 'Ian,Joseph,Gitaka';
console.log(new ArrayFromCommaString().printArray(commaDelimitedString));

//we want to print using the new class but it expects star delimited string
console.log(new ArrayFromStarString().print(commaDelimitedString), ' new class did not work as expected because delimeter is not *');

//using Adapter
console.log(new ArrayFromStarStringAdapter().printArray(commaDelimitedString), 'Adapter did its thing...');

