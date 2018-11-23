import * as esprima from 'esprima';

let parsed_nodes = [];


const parseCode = (codeToParse) => {
    let parsedCode =esprima.parseScript(codeToParse,{loc: true}, function(node,metadata){
        func_dic[node.type](node,metadata);

            if(node.type=='FunctionDeclaration')
            {
                pushNode(metadata.start.line,"Function declaration",node.id.name,'','');

                for(let i=0; i<node.params.length;i++)
                {
                    pushNode(metadata.start.line,"variable declaration",node.params[i].name,'','');
                }

            }
            else if(node.type=='VariableDeclarator')
            {
                let init=null;
                if(node.init!=null)
                {
                    init=node.init.value
                }
                pushNode(metadata.start.line,"variable declaration",node.id.name,'',init);

            }
            else if(node.type=='UpdateExpression')
            {
                let name=expresrionPars(node.argument);
                pushNode(metadata.start.line,"Update Expression",name,'',node.operator);
            }
            else if(node.type=='AssignmentExpression')
            {
                let name, value;
                name= assignmentExpressionNameVal(node.left);
                value=assignmentExpressionValue(node.right);
                pushNode(metadata.start.line,"Assignment Expression",name,'',value);

            }
            else if(node.type=='WhileStatement')
            {
                let condition=expresrionPars(node.test);
                pushNode(metadata.start.line,"while statement",'',condition,'');

            }
            else if(node.type=='IfStatement')
            {
                let condition=expresrionPars(node.test);
                pushNode(metadata.start.line,"if statement",'',condition,'');
            }
            else if(node.type=='ForStatement')
            {
                let condition=expresrionPars(node.test);
                pushNode(metadata.start.line,"for statement",'',condition,'');
            }
            else if(node.type=='ReturnStatement')
            {
            let value=expresrionPars(node.argument);
            pushNode(metadata.start.line,"return statement",'','',value);
            }
        });

        //console.log(metadata.start.line, node.type, node.name, node.value, node.params, node.right); // eslint-disable-line no-console
    //console.log(parsed_nodes)
    parsedCode=parsed_nodes;
    parsed_nodes=[];
    return parsedCode
};
//return value for expression
function expresrionPars(node) {
    if(node.right==null && node.left==null)
    {
        if(node.type=='MemberExpression')
            return memberExpressionValue(node)
        else
            return expresionValue(node)
    }

    if(node.right!=null && node.left!=null)
    {
        return expresrionPars(node.left)+ node.operator + expresrionPars(node.right)
    }
    // if(node.right!=null) {
    //     if (node.left.type == 'Identifier')
    //         return node.left.name + node.operator + expresrionPars(node.right)
    //     else if (node.left.type == 'Literal')
    //         return node.left.value + node.operator + expresrionPars(node.right)
    //
    // }
    // if(node.left!=null) {
    //     if (node.right.type == 'Identifier')
    //         return expresrionPars(node.left) + node.operator + node.right.name
    //     else if (node.left.type == 'Literal')
    //         return expresrionPars(node.left) + node.operator + node.right.value
    // }

}
//return the value of expression
//literal or identifier or unary expression
function expresionValue(node,metadata)
{
    let value;
   if(node.type=='Literal')
    {
        value= node.value;
    }
    else if(node.type=='Identifier')
    {
        value= node.name;
    }
    else if(node.type=='UnaryExpression')
   {
       value=node.operator + node.argument.value;
   }
    return value;
}

function memberExpressionValue(node)
{
    let obj=node.object.name
    let propNode=node.property //expressionValue(node.property)
    let prop= expresrionPars(propNode);

    return obj+'['+prop+']';
}
//put node inside nodes array;
function pushNode(line,type,name,condition,value)
{
    let nodeToPush={
        Line: line,
        Type: type,
        Name: name,
        Condition: condition,
        Value: value
    }
    parsed_nodes.push(nodeToPush)

}
function assignmentExpressionNameVal(node,met){

    if(node.type=='MemberExpression')
    {
        return memberExpressionValue(node)
    }
    else
    {
        return expresionValue(node)
    }
}
function assignmentExpressionValue(node,){
    if(node.type=='BinaryExpression') {
        return  expresrionPars(node);
    }
    else if(node.type=='MemberExpression') {
        return memberExpressionValue(node)
    }
    else {
        return expresionValue(node)

    }

}

function FunctionDeclaration_func(node,metadata){

    pushNode(metadata.start.line,"Function declaration",node.id.name,'','');

    for(let i=0; i<node.params.length;i++)
    {
        pushNode(metadata.start.line,"variable declaration",node.params[i].name,'','');
    }
}
function VariableDeclarator_func(node,metadata){
    let init=null;
    if(node.init!=null)
    {
        init=node.init.value
    }
    pushNode(metadata.start.line,"variable declaration",node.id.name,'',init);

}
function UpdateExpression_func(node,metadata){
    let name=expresrionPars(node.argument);
    pushNode(metadata.start.line,"Update Expression",name,'',node.operator);
}
function AssignmentExpression_func(node,metadata) {
    let name, value;
    name= assignmentExpressionNameVal(node.left);
    value=assignmentExpressionValue(node.right);
    pushNode(metadata.start.line,"Assignment Expression",name,'',value);
}
function WhileStatement_func(node,metadata){
    let condition=expresrionPars(node.test);
    pushNode(metadata.start.line,"while statement",'',condition,'');
}
function IfStatement_func(node,metadata){
    let condition=expresrionPars(node.test);
    pushNode(metadata.start.line,"if statement",'',condition,'');
}
function ForStatement_func(node,metadata){
    let condition=expresrionPars(node.test);
    pushNode(metadata.start.line,"for statement",'',condition,'');
}
function ReturnStatement_func(node,metadata){
    let value=expresrionPars(node.argument);
    pushNode(metadata.start.line,"return statement",'','',value);
}



let func_dic={
        'FunctionDeclaration': FunctionDeclaration_func,
        'VariableDeclarator': VariableDeclarator_func,
        'variableDeclaration':VariableDeclarator_func,
        'UpdateExpression': UpdateExpression_func,
        'AssignmentExpression': AssignmentExpression_func,
        'WhileStatement':WhileStatement_func,
        'IfStatement':IfStatement_func,
        'ForStatement':ForStatement_func,
        'ReturnStatement':ReturnStatement_func,
        'Identifier':expresionValue,
        'Literal':expresionValue,
};

export {parseCode};

