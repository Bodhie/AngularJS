describe('E2E: angularjs homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });
  
  it('should the home page of the website', function() {

    var p = element(by.tagName("a"));
    var pText = p.getText();

    expect(pText).toBe('Your MovieList');
  });

  it('should login as admin', function() {
      element(by.model("credentials.username")).sendKeys("admin");
      element(by.model("credentials.password")).sendKeys("admin");
      element(by.css('button#form-submit')).click();

      expect(element(by.className('current_user')).getText()).toBe("Welcome, admin")
  });

  // it('should display a different status text after button click', function() {
  //
  //   element(by.tagName('button')).click();
  //
  //
  //   expect(element(by.tagName('p')).getText()).toEqual('Done!');
  // });
  //
  // it('should display a hellow message when the form is submitted', function() {
  //
  //   element(by.model('name'))).sendKeys("Dominic";
  //
  //   element(by.css('button#form-submit')).click();
  //
  //   expect(element(by.tagName('span')).getText()).toBe("Hellow Dominic");
  // });
  //
  // it('should display a list of todo items', function() {
  //   var rows = element.all(by.repeater('item in items')).count();
  //   expect(rows).toBe(3);
  // });

});