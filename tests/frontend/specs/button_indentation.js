describe("indentation button", function(){
  //create a new pad before each test run
  beforeEach(function(cb){
    testHelper.newPad(cb);
  });

  it("makes text indented and outdented", function() {

    //get the inner iframe
    var $inner = testHelper.$getPadInner();
    
    //get the first text element out of the inner iframe
    var firstTextElement = $inner.find("div").first();

    //select this text element
    testHelper.selectText(firstTextElement[0], $inner);

    //get the indentation button and click it
    var $indentButton = testHelper.$getPadChrome().find(".buttonicon-indent");
    $indentButton.click();

    //ace creates a new dom element when you press a button, so just get the first text element again
    var newFirstTextElement = $inner.find("div").first();
    
    // is there a list-indent class element now?
    var firstChild = newFirstTextElement.children(":first");
    var isUL = firstChild.is('ul');

    //expect it to be the beginning of a list
    expect(isUL).to.be(true);

    var secondChild = firstChild.children(":first");
    var isLI = secondChild.is('li');
    //expect it to be part of a list
    expect(isLI).to.be(true);

    //indent again
    $indentButton.click();

    var newFirstTextElement = $inner.find("div").first();

    // is there a list-indent class element now?
    var firstChild = newFirstTextElement.children(":first");
    var hasListIndent2 = firstChild.hasClass('list-indent2');

    //expect it to be part of a list
    expect(hasListIndent2).to.be(true);

    //make sure the text hasn't changed
    expect(newFirstTextElement.text()).to.eql(firstTextElement.text());


    // test outdent

    //get the unindentation button and click it twice
    var $outdentButton = testHelper.$getPadChrome().find(".buttonicon-outdent");
    $outdentButton.click();
    $outdentButton.click();

    //ace creates a new dom element when you press a button, so just get the first text element again
    var newFirstTextElement = $inner.find("div").first();

    // is there a list-indent class element now?
    var firstChild = newFirstTextElement.children(":first");
    var isUL = firstChild.is('ul');

    //expect it not to be the beginning of a list
    expect(isUL).to.be(false);

    var secondChild = firstChild.children(":first");
    var isLI = secondChild.is('li');
    //expect it to not be part of a list
    expect(isLI).to.be(false);

    //make sure the text hasn't changed
    expect(newFirstTextElement.text()).to.eql(firstTextElement.text());


    // Next test tests multiple line indentation

    //select this text element
    testHelper.selectText(firstTextElement[0], $inner);

    //indent twice
    $indentButton.click();
    $indentButton.click();

    //get the first text element out of the inner iframe
    var firstTextElement = $inner.find("div").first();

    //select this text element
    testHelper.selectText(firstTextElement[0], $inner);

    /* this test creates the below content, both should have double indentation
		line1
		line2
    */

    firstTextElement.sendkeys('{rightarrow}'); // simulate a keypress of enter
    firstTextElement.sendkeys('{enter}'); // simulate a keypress of enter
    firstTextElement.sendkeys('line 1'); // simulate writing the first line
    firstTextElement.sendkeys('{enter}'); // simulate a keypress of enter   
    firstTextElement.sendkeys('line 2'); // simulate writing the second line

    //get the second text element out of the inner iframe
    var secondTextElement = $inner.find("div").first().children(":nth-child(0)"); // I need help wth this!
    console.log(secondTextElement); // not working

    // is there a list-indent class element now?
    var firstChild = secondTextElement.children(":first");
    var isUL = firstChild.is('ul');

    //expect it to be the beginning of a list
    expect(isUL).to.be(true);

    var secondChild = secondChild.children(":first");
    var isLI = secondChild.is('li');
    //expect it to be part of a list
    expect(isLI).to.be(true);

    //get the first text element out of the inner iframe
    var thirdTextElement = $inner.find("div").first(); // I also need help with this..

    // is there a list-indent class element now?
    var firstChild = thirdTextElement.children(":first");
    var isUL = firstChild.is('ul');

    //expect it to be the beginning of a list
    expect(isUL).to.be(true);

    var secondChild = firstChild.children(":first");
    var isLI = secondChild.is('li');
    //expect it to be part of a list
    expect(isLI).to.be(true);

  });
});
