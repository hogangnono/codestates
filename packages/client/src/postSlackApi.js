/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as constants from './constants';
export const slackApi = (name, text = '호재 알림입니다.') => {
    const a = [];
    text.forEach(el => {
        a.push(el.description);
    });
    const options = {
        mrkdwn: true,
        attachments: [
            {
                title: `${name}님의 호재 정보입니다.`,
                color: '#4d55b2'
                // fields: [
                //     {
                //         title: 'Volume',
                //         value: '1',
                //         short: true
                //     },
                //     {
                //         title: 'Issue',
                //         value: '3',
                //         short: true
                //     }
                // ],
                // author_name: `${name}`
                // author_icon:
                //     'http://a.slack-edge.com/7f18https://a.slack-edge.com/a8304/img/api/homepage_custom_integrations-2x.png',
                // image_url: 'http://i.imgur.com/OJkaVOI.jpg?1'
            },
            {
                title: 'Description',
                text: `${a[0]}`,
                color: '#4d55b2'
            },
            {
                fallback: '호재 정보를 database 에 저장하시겠습니까?',
                title: '호재 정보를 database 에 저장하시겠습니까??',
                // callback_id: 'comic_1234_xyz',
                // color: '#3AA3E3',
                color: '#4d55b2',
                attachment_type: 'default',
                actions: [
                    {
                        name: 'Accept',
                        text: 'Accept',
                        type: 'button',
                        value: 'Accept'
                    },
                    {
                        name: 'Hold',
                        text: 'Hold',
                        type: 'button',
                        value: 'Hold'
                    },
                    {
                        name: 'Refuse',
                        text: 'Refuse',
                        style: 'danger',
                        type: 'button',
                        value: 'Refuse',
                        confirm: {
                            title: 'Are you sure?',
                            text: '정말 거절하시겠습니까?',
                            ok_text: 'Yes',
                            dismiss_text: 'No'
                        }
                    }
                ]
            }
        ]
    };

    axios
        .post(constants.SLACK_GENERAL_PATH, JSON.stringify(options))
        .then(response => {
            console.log('SUCCEEDED: Sent slack webhook: \n', response.data);
        })
        .catch(error => {
            console.log('FAILED: Send slack webhook', error);
        });
};
