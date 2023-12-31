import React from 'react'

import {
    EmailIcon,
    EmailShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    RedditIcon,
    RedditShareButton,
  
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
  } from 'react-share';
  
export default function Share({ url = window.location.href, title }) {
    return (
        <div style={{ textAlign: 'center' }}>
            {
                title &&  <h2 style={{ color: 'rgb(37,38,38)' }}>{title}</h2>
            }
           
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                <EmailShareButton url={url}>
                    <EmailIcon size={32} round />
                </EmailShareButton>

                <TelegramShareButton url={url}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>

                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <RedditShareButton url={url}>
                    <RedditIcon size={32} round />
                </RedditShareButton>

                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>
        </div>
    )
}