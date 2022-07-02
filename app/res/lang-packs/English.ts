import Language from "../../src/LanguageIF";

export default class English implements Language{

    appName: string;
    title: string;
    author: string;
    licenseNotice: string;

    constructor(){
        this.appName = "wonderful boilerplate"
        this.title = "Title"
        this.author  = "Myself"
        this.licenseNotice  = "Not your business!"
    }
 
}
