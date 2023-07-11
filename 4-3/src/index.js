const http = require('http');
const { exec } = require('child_process');

const host = '0.0.0.0';
const port = 8000;

const requestListener = function (req, res) {
    // disk
    exec("df -Th | grep '/$' | awk '{print $6}'", (error, stdout, stderr) => {
        let disk = stdout;
        disk.replace("%", "");
        disk = parseInt(disk, 10) / 100;

        // uptime
        exec("uptime | sed 's/^.* up //g' | sed 's/,.*$//g'", (error, stdout, stderr) => {
            let uptime;
            uptime = stdout;
            uptime.replace(" min", "");
            uptime = parseInt(uptime, 10) * 60;

            // epoch
            let epoch = new Date();
            epoch = epoch / 1;
        
            // response with message
            message = `{"disk": ${disk}, "uptime": ${uptime}, "time": ${epoch}}`
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(message);
        });
    });

    // res.end(`{"message": "I'am healthy! @${epoch}"}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
