const Slack = require('slack-node'),
    ip = require("ip"),
    gitlog = require('gitlog'),
    fs = require('fs');

(() => {

    const dir = __dirname,
        file = dir + "/gitlog.txt",
        format = "utf8",
        serverIp = "10.6.21.51",
        SN = "Suren Navasardyan",
        SG = "Set Gevorgyan";

    const options = {
        repo: dir,
        number: 20,
        fields: [
            'hash',
            'subject',
            'authorName',
            'authorDate'
        ],
        execOptions: {
            maxBuffer: 1000 * 1024
        }
    };

    let lastCommit,
        commits = [],
        attachments = [
            {
                color: "good",
                mrkdwn_in: [
                    "text"
                ],
                fields: [
                    {
                        value: "",
                        short: !0
                    }
                ],
                author_name: "<@navasardyan.suren> - Resolved issues: ",
                author_icon: "https://ca.slack-edge.com/T5NHTLBEF-U6NNXS24U-g39cc8780fe4-48"
            },
            {
                color: "danger",
                mrkdwn_in: [
                    "text"
                ],
                fields: [
                    {
                        value: "",
                        short: !0
                    }
                ],
                author_name: "<@U7WRKFJ00> - Resolved issues: ",
                author_icon: "https://ca.slack-edge.com/T5NHTLBEF-U7WRKFJ00-gd90d9947746-48"
            }
        ];

    const init = () => {


        if  ( (ip.address()).toString() === serverIp )
        {
            fs.readFile(file, format, (err, data) => {

                if ( ! err )
                {
                    lastCommit = data.toString().trim();

                    fs.unlink(file, (err) => {

                        if ( ! err )
                        {
                            gitlog(options, (err, comms) => {

                                if ( ! err )
                                {
                                    let verify = !1;

                                    fs.writeFile(file, comms[0].hash);

                                    comms.forEach((commit) => {

                                        if ( ! verify )
                                            if ( commit.hash !== lastCommit )
                                                commits.push(commit);
                                            else
                                                verify = !0;
                                    });

                                    buildAttachments();
                                    sendNotification();
                                }
                            })
                        }
                    })
                }
            })
        }
    };

    const buildAttachments = () => {

        commits.forEach((commit) => {

            if ( commit.subject.replace(/ .*/,'') !== "Merge" )
            {
                let authorName = commit.authorName.toString().trim();

                if ( authorName === SN )
                    attachments[0].fields[0].value += "```"+commit.subject+"\n"
                        +"-------------------------"+"\n"
                        +commit.authorDate+ "``` ";
                else if ( authorName === SG )
                    attachments[1].fields[0].value += "```"+commit.subject+"\n"
                        +"-------------------------"+"\n"
                        +commit.authorDate+ "``` ";
            }
        });

        if ( ! attachments[0].fields[0].value )
            delete attachments[0];

        if ( ! attachments[1].fields[0].value )
            delete attachments[1];
    };

    const sendNotification = () => {

        let webhookUri,
            slack;

        webhookUri = "https://hooks.slack.com/services/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";

        slack = new Slack();
        slack.setWebhook(webhookUri);

        slack.webhook({
            channel: "#birdtest_support",
            attachments: attachments,
            username: "Birdtest.nl",
            text: "*_ Birdtest.nl has been updated. _*",
            mrkdwn: !0
        }, () => console.log('Slack notification'));
    };

    init();
})();