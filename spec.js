

describe('Protractor Demo App', function(){
    function randomUsername(){
        let username = 'test';
        for (let i = 0; i < 12; i++){
            username += String.fromCharCode(Math.floor(Math.random()*26 + 97));
        }
        return username;
    }

    beforeEach(function(){
        browser.ignoreSynchronization = true;
        browser.get('https://fsaid.ed.gov/npas/index.htm');
    });

    it('should create a user', function(){
        // page 1
        const email = 'test@test.test';
        element(by.id('createAcct:inputEmailReg')).sendKeys(email);
        element(by.id('createAcct:inputEmailRegConf')).sendKeys(email);
        const username = randomUsername();
        element(by.id('createAcct:inputUsernameReg')).sendKeys(username);
        const password = 'testTEST5325';
        element(by.id('createAcct:inputPasswordReg')).sendKeys(password);
        element(by.id('createAcct:inputPasswordConfirmReg')).sendKeys(password);
        element(by.id('createAcct:user_age:0')).click();

        element(by.id('createAcct:regContinue')).click();

        // page 2
        browser.driver.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual('https://fsaid.ed.gov/npas/reg/pin_lookup.htm');
        const ssn = ['100', '00', '0000'];
        element(by.id('regPinLookup:ssnThree')).sendKeys(ssn[0]);
        element(by.id('regPinLookup:ssnTwo')).sendKeys(ssn[1]);
        element(by.id('regPinLookup:ssnFour')).sendKeys(ssn[2]);
        const dob = '001/01/1970';
        element(by.id('regPinLookup:dob')).sendKeys(dob);
        const fullname = ['Not', 'A', 'Real-Person'];
        element(by.id('regPinLookup:nameFirst')).sendKeys(fullname[0]);
        element(by.id('regPinLookup:nameMi')).sendKeys(fullname[1]);
        element(by.id('regPinLookup:nameLast')).sendKeys(fullname[2]);
        element(by.id('regPinLookup:regContinue')).click();

        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual('https://fsaid.ed.gov/npas/reg/pin_lookup.htm');
        element(by.id('regPinLookup:regContinue')).click();

        // page 3
        browser.driver.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual('https://fsaid.ed.gov/npas/reg/full_pin_ver_prof.htm');
        const address = ['123 Fake Street', 'Anytown', '98765'];
        element(by.id('acctRegFullProfile:address')).sendKeys(address[0]);
        element(by.id('acctRegFullProfile:city')).sendKeys(address[1]);
        element(by.css('.show-menu-arrow>button')).click();
        element(by.css('ul.dropdown-menu>li[rel="8"]>a')).click();
        element(by.id('acctRegFullProfile:zip')).sendKeys(address[2]);
        element(by.id('acctRegFullProfile:phone')).sendKeys('5555555555');
        element(by.id('acctRegFullProfile:zip')).sendKeys('5555555555');
        element(by.id('acctRegFullProfile:regProfileFullContinue')).click();

        // page 4
        browser.driver.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual('https://fsaid.ed.gov/npas/reg/full_pin_ver_cqa.htm');
        browser.driver.sleep(2000);
        element(by.css('#cq1Group .dropdown-toggle')).click();

    });
});