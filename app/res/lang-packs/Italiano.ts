import Language from "../../src/LanguageIF";

export default class Italiano

    implements Language {
    appName: string;
    title: string;
    author: string;
    licenseNotice: string;
    constructor() {
        this.appName = "fantastica boilerplate";
        this.title = "fantastica boilerplate";
        this.author = "me stesso";
        this.licenseNotice = "non sono affari tuoi";
    }


}