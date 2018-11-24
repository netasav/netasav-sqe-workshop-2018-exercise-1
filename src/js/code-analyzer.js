import * as esprima from 'esprima';

let parsed_nodes = [];


const parseCode = (codeToParse) => {
    let parsedCode =esprima.parseScript(codeToParse,{loc: true}, function(node,metadata){
        if(node.type=='FunctionDeclaration') {
            pushNode(metadata.start.line,'Function declaration',node.id.name,'','');
            for(let i=0; i<node.params.length;i++) {pushNode(metadata.start.line,'variable declaration',node.params[i].name,'','');}
        }
        else if(node.type=='VariableDeclarator') {
            let init=null;
            if(node.init!=null) {init=node.init.value;}
            pushNode(metadata.start.line,'variable declaration',node.id.name,'',init);
        }
        else {
            countinueFunc1(node,metadata);
        }
    });
    parsedCode= parsed_nodes;
    parsed_nodes = [];
    return parsedCode;
};
function countinueFunc1(node,metadata){
    if(node.type=='UpdateExpression') {
        let name=expresrionPars(node.argument);
        pushNode(metadata.start.line,'Update Expression',name,'',node.operator);
    }
    else if(node.type=='AssignmentExpression') {
        let name, value;
        name= assignmentExpressionNameVal(node.left);
        value=assignmentExpressionValue(node.right);
        pushNode(metadata.start.line,'Assignment Expression',name,'',value);
    }
    else if(node.type=='IfStatement') {
        let condition=expresrionPars(node.test);
        pushNode(metadata.start.line,'if statement','',condition,'');
    }
    else{
        continueFunc2(node,metadata);
    }

}
function  continueFunc2(node,metadata){
    if(node.type=='WhileStatement') {
        let condition=expresrionPars(node.test);
        pushNode(metadata.start.line,'while statement','',condition,'');
    }
    else if(node.type=='ForStatement') {
        let condition=expresrionPars(node.test);
        pushNode(metadata.start.line,'for statement','',condition,'');
    }
    else if(node.type=='ReturnStatement') {
        let value=expresrionPars(node.argument);
        pushNode(metadata.start.line,'return statement','','',value);
    }

}
//return value for expression
function expresrionPars(node) {
    if(node.right==null && node.left==null) {
        // if(node.type=='MemberExpression')
        //     return memberExpressionValue(node);
        // else
        return expresionValue(node);
    }
    else if(node.right!=null && node.left!=null) {
        return expresrionPars(node.left)+ node.operator + expresrionPars(node.right);
    }

}
//return the value of expression
//literal or identifier or unary expression
function expresionValue(node)
{
    let value;
    if(node.type=='Literal') {
        value= node.value;
    }
    else if(node.type=='Identifier') {
        value= node.name;
    }
    else if(node.type=='UnaryExpression') {
        value=node.operator + node.argument.value;
    }
    else if(node.type=='MemberExpression')
    {
        value= node.object.name+'['+expresrionPars(node.property)+']';
    }
    return value;
}

// function memberExpressionValue(node)
// {
//     let obj=node.object.name;
//     let propNode=node.property; //expressionValue(node.property)
//     let prop= expresrionPars(propNode);
//
//     return obj+'['+prop+']';
// }
//put node inside nodes array;
function pushNode(line,type,name,condition,value)
{
    let nodeToPush={
        Line: line,
        Type: type,
        Name: name,
        Condition: condition,
        Value: value
    };
    parsed_nodes.push(nodeToPush);

}
function assignmentExpressionNameVal(node){
    return expresionValue(node);
}
function assignmentExpressionValue(node) {
    if (node.type == 'BinaryExpression') {
        return expresrionPars(node);
    }
    else if (node.type == 'MemberExpression') {
        return expresrionPars(node);
    }
    else {
        return expresionValue(node);

    }
}
export {parseCode};

