import $ from 'jquery';
import {parseCode} from './code-analyzer';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        var temp=JSON.stringify(parsedCode);
        console.log(temp);
        tokensTable(parsedCode);

    });
});

function tokensTable(parsedCode){
    let table= document.getElementById('ans_table');
    emptyTable(table);
    for(let i=1;i<parsedCode.length;i++)
    {
        var row = table.insertRow(i);
        var line_cell = row.insertCell(0);
        var type_cell = row.insertCell(1);
        var name_cell = row.insertCell(2);
        var condition_cell = row.insertCell(3);
        var value_cell = row.insertCell(4);

        line_cell.innerHTML = parsedCode[i].Line;
        type_cell.innerHTML = parsedCode[i].Type;
        name_cell.innerHTML = parsedCode[i].Name;
        condition_cell.innerHTML = parsedCode[i].Condition;
        value_cell.innerHTML = parsedCode[i].Value;
    }
}
function emptyTable(table)
{
    let table_length=table.rows.length;
    for (let i=table_length-1;i>0;i--)
    {
        table.deleteRow(i);
    }
}