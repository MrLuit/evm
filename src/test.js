const fs = require("fs");

fs.readdirSync("./opcodes").forEach(file => {
    let content = fs.readFileSync("./opcodes/" + file,"utf8");
    /*content = content.replace(new RegExp("readonly type: string;","g"),"readonly name: string;");
    content = content.replace(new RegExp("this.type = ","g"),"this.name = ");
    content = content.replace(new RegExp("readonly static: boolean;","g"),"readonly wrapped: boolean;");
    content = content.replace(new RegExp("this.static = ","g"),"this.wrapped = ");
    content = content.replace(new RegExp("readonly name: string;\n","g"),"readonly name: string;\n    readonly type?: string;\n");
    content = content.replace(new RegExp("    readonly returntype: string;\n","g"),"");
    content = content.replace(new RegExp("this.returntype = ","g"),"this.type = ");*/
    content = content.replace(new RegExp("\\.type","g"),".name");
    content = content.replace(new RegExp("\\.returntype","g"),".type");
    //console.log(content);
    fs.writeFileSync("./opcodes/" + file,content);
});