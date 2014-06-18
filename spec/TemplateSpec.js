/**
 * Created by vladimirb on 6/17/14.
 */


describe("load html DOM", function() {

    beforeEach(function(){
        var doxterdiv = document.createElement('div');
        doxterdiv.id = "doxter_content";
        doxterdiv.innerHTML = "some_text"
        document.getElementsByTagName('body')[0].appendChild(doxterdiv);
    });

    return it("Should be find doxter div", function() {
        return expect(document.getElementById('doxter_content').innerHTML).toBe("some_text");
    });
});
