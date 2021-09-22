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
 * GetViewingTicket_sample.js
 *                
 * Created by tron on 20/09/2021.
 */

const debug = require("debug")("get_ticket");
const crypto = require('dsd-common-lib').DsdCrypto;

const { pds } = require("./_pds");

module.exports = async function(userId, prvKey, publicKey, dabId, satId) {
    const argsBuyerSignature = crypto.signData({ dabId, buyerId: userId, satId}, prvKey);
    debug("signature:%s", argsBuyerSignature);
    let ticket = await pds._get("tokens", {accessType: "SAT", dabId, userId, satId, argsBuyerSignature, publicKey});
    debug("ticket: %o", ticket);
    return ticket;


    // const argsBuyerSignature = crypto.signData({dabId, satId, buyerId}, prvKey);
    // debug("signature:%s", argsBuyerSignature);
    // let ticket = await pds.getSatAccessTicket({dabId, satId, buyerId, publicKey, argsBuyerSignature});

};