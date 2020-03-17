/**
 * description:线性结构与树形结构测试
 * */
import lineAndTree from '../../../dataStructure/lineAndTree';

describe('线性结构与属性结构测试',()=>{
    it('线性结构转为树形结构',()=>{
        let list=[
            {id:0,parentId:null},{id:1,parentId:0},{id:2,parentId:0},{id:3,parentId:1},{id:4,parentId:1},
            {id:5,parentId:null},{id:6,parentId:5},{id:7,parentId:5},{id:8,parentId:5},{id:9,parentId:5}
        ];
        let rootArr=lineAndTree.lineConvertToTree(list);
        expect(rootArr).is.a('array').and.has.lengthOf(2);
        expect(rootArr[0].id).is.equal(0);
        expect(rootArr[0].children).is.a('array').and.has.lengthOf(2);
        expect(rootArr[0].children[0].id).is.equal(1);
        expect(rootArr[0].children[1].id).is.equal(2);
        expect(rootArr[0].children[0].children[0].id).is.equal(3);
        expect(rootArr[0].children[0].children[1].id).is.equal(4);
        expect(rootArr[0].children[1].children).is.a('array').and.is.empty;
        expect(rootArr[1].id).is.equal(5);
        expect(rootArr[1].children).is.a('array').and.has.lengthOf(4);
        expect(rootArr[1].children[0].id).is.equal(6);
        expect(rootArr[1].children[3].id).is.equal(9);
    });
    it('树形结构转为线性结构',()=>{
        let root={
            id:0,
            parentId:null,
            children:[
                {id:1,parentId:0,children:[{id:5,parentId:1}]},
                {id:2,parentId:0,children:[{id:3,parentId:2},{id:4,parentId:2}]},
            ]
        };
        let rootToLine=lineAndTree.treeCovertToLine(root);
        expect(rootToLine).is.a('array').and.has.lengthOf(6);
        expect(rootToLine[0].id).is.equal(0);
        expect(rootToLine[1].id).is.equal(1);
        expect(rootToLine[2].id).is.equal(2);
        expect(rootToLine[3].id).is.equal(5);
        expect(rootToLine[4].id).is.equal(3);
        expect(rootToLine[5].id).is.equal(4);
    });
});
