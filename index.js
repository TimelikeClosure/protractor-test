
const exec = require('child_process').exec;

const webdriver = '"./node_modules/.bin/webdriver-manager.cmd"';

const wdUpdate = exec(`${webdriver} update`);

wdUpdate.stdout.on('data', data => {
    console.log(data.toString());
});
wdUpdate.stderr.on('data', data => {
    console.log(data.toString());
});
wdUpdate.on('exit', code => {
    if (code){
        console.log(`webdriver-manager update exited with code ${code}`);
        return;
    }
    const wdStart = exec(`${webdriver} start`);

    const timer = setTimeout(function(){
        const test = exec('"./node_modules/.bin/protractor.cmd" conf.js');

        test.stdout.on('data', function(data){
            console.log(`stdout: ${data}`);
        });
        test.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        test.on('close', (code) => {
            clearTimeout(timer);
            console.log(`testing process exited with code ${code}`);
            wdStart.kill('SIGKILL');
        });
    }, 3000);

    wdStart.stdout.on('data', data => {
        console.log(data.toString());
    });
    wdStart.stderr.on('data', data => {
        console.log(data.toString());
    });
    wdStart.on('exit', code => {
        if (code){
            console.log(`webdriver-manager start exited with code ${code}`);
        }
    });

});


