/*
 *
 * Personal Digital Spaces LLC ("COMPANY") CONFIDENTIAL
 * Unpublished Copyright (c) 2021 Personal Digital Spaces LLC, All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical concepts contained
 * herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY employees, managers, contractors or partners who have executed 
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes  
 * information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.   ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE, 
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE 
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS  
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 *
 * DownloadFile_sample.js
 *                
 * Created by tron on 20/09/2021.
 */


const debug = require("debug")("download_file");
const cst = require('dsd-common-lib').Constants;
const request = require('request');

function downloadFileFromVaultBySession(vaultUrl, sessionId) {
    let url = (vaultUrl +
    "/" + cst.VaultProtocol.cmd_download +
    "?" + cst.VaultProtocol.param_sessionId + "=" + encodeURIComponent(sessionId));

    debug("downloadUrl:%s", url);

    //just an example of the request.
    //production client must download data, not just return success
    return new Promise((resolve, reject) => {
        request.get({url}, function (err, response, body) {
            if (err) {
                debug(`download failed: ${JSON.stringify(err)}`);

                reject(err);
                return;
            }

            let filelen = (""+body).length;
            debug("downloaded filelen=%s from %s", filelen, vaultUrl);

            //just return success if we can read a file
            resolve(filelen > 1000);
        });
    });
}

function getSessionByTicket(ticket) {
    let ticket64 = Buffer.from(JSON.stringify(ticket)).toString("base64");
    let vaultReq = ticket.vaultUrl + '/' + cst.VaultProtocol.cmd_getsession + '?' + cst.VaultProtocol.param_ticket + '=' + ticket64;
    debug("vault request: %s", vaultReq);

    return new Promise((resolve, reject) => {
        request.get(vaultReq)
            .on('response', function(response) {
                debug("session_id=%s", response.headers[cst.VaultProtocol.hdr_sessionId]);
                resolve(response.headers[cst.VaultProtocol.hdr_sessionId]);
            })
            .on('error', function(err) {
                debug(new Error(err));
                resolve(false);
            })
        ;
    });
}

module.exports = async function(ticket) {
    let sessionId = await getSessionByTicket(ticket);
    if(!sessionId) return false;

    let downloaded = await downloadFileFromVaultBySession(ticket.vaultUrl, sessionId);
    if(!downloaded) return false;

    return true;
};