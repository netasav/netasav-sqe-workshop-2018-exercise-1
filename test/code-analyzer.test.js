import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '[]'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":1}]'
        );
    });
    it('is parsing a function declaration with variables and return correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X){return 1}')),
            '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":1},{"Line":1,"Type":"Function declaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""}]'
        );
    });
    it('is parsing return update expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('i++')),
            '[{"Line":1,"Type":"Update Expression","Name":"i","Condition":"","Value":"++"}]'
        );
    });
    it('is parsing a empty init variable declaration  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a;')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":null}]'
        );
    });
    it('is parsing a memberExpression essignment + literal correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('arr[o]=1')),
            '[{"Line":1,"Type":"Assignment Expression","Name":"arr[o]","Condition":"","Value":1}]'
        );
    });
    it('is parsing assignment to memberExpression   correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('x=arr[o]')),
            '[{"Line":1,"Type":"Assignment Expression","Name":"x","Condition":"","Value":"arr[o]"}]'
        );
    });
    it('is parsing a memberExpression assignment + identifyer  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('arr[o]=x')),
            '[{"Line":1,"Type":"Assignment Expression","Name":"arr[o]","Condition":"","Value":"x"}]'
        );
    });
    it('is parsing a assignmet complex binary expression left correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('x=(arr[i]+1)/2')),
            '[{"Line":1,"Type":"Assignment Expression","Name":"x","Condition":"","Value":"arr[i]+1/2"}]'
        );
    });
    it('is parsing a assignmet complex2 binary expression left correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('x=(y+z)/((f+1)/(f-1))')),
            '[{"Line":1,"Type":"Assignment Expression","Name":"x","Condition":"","Value":"y+z/f+1/f-1"}]'
        );
    });
    it('is parsing a  memberExpression in binary expression  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('x=arr[i]+1')),
            '[{"Line":1,"Type":"Assignment Expression","Name":"x","Condition":"","Value":"arr[i]+1"}]'
        );
    });
    it('is parsing a  essignment + binary expression  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let x=y+1;')),
            '[{"Line":1,"Type":"variable declaration","Name":"x","Condition":""}]'
        );
    });
    it('is parsing a  while statment  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('while(i>1){x++}')),
            '[{"Line":1,"Type":"Update Expression","Name":"x","Condition":"","Value":"++"},{"Line":1,"Type":"while statement","Name":"","Condition":"i>1","Value":""}]'
        );
    });
    it('is parsing a  if statment  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(i>1){x++}')),
            '[{"Line":1,"Type":"Update Expression","Name":"x","Condition":"","Value":"++"},{"Line":1,"Type":"if statement","Name":"","Condition":"i>1","Value":""}]'
        );
    });
    it('is parsing a  for statment  correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('for(let i=0;i<5;i++){let x=1}')),
            '[{"Line":1,"Type":"variable declaration","Name":"i","Condition":"","Value":0},{"Line":1,"Type":"Update Expression","Name":"i","Condition":"","Value":"++"},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":1},{"Line":1,"Type":"for statement","Name":"","Condition":"i<5","Value":""}]'
        );
    });
    it('is parsing a  return statment  correctly + unary expression', () => {
        assert.equal(
            JSON.stringify(parseCode('function testFunc(){return -1}')),
            '[{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"-1"},{"Line":1,"Type":"Function declaration","Name":"testFunc","Condition":"","Value":""}]'
        );
    });
});
    // it('is variable declaration return correctly', () => {
    //     assert.equal(
    //         JSON.stringify(parseCode('var x;')),
    //         '[{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":null}]'
    //     );
    // });
//});
