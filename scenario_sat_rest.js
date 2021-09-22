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
 * scenario_sat_rest.js
 *                
 */

const debug = require("debug")("sample_rest");
const SELLER = require("./config.json");

const createUser    = require("./samples_rest/CreatingUser_sample");
const sendMoney     = require("./samples_rest/SendingMoney_sample");
const listSats      = require("./samples_rest/ListOwnedSATs_sample");
const getSats       = require("./samples_rest/GetSatMetadata_sample");
const sellOwnership = require("./samples_rest/SellOwnership_sample");
const getTicket     = require("./samples_rest/GetViewingTicket_sample");
const downloadFile  = require("./samples_rest/DownloadFile_sample");

async function scenario() {
    //Scenario: Create buyer, give money to him, sell SAT to him, access the SAT

    try {

        //create buyer and send money to enable him to send transactions
        let buyer = await createUser();
        debug("buyer has been created: %o", buyer);
        let sellerBalanceAfter = await sendMoney(SELLER.userId, SELLER.prvKey, buyer.userId, 11000);//10000 buyer fee + 1000 zfee

        //list own sats
        let sats = await listSats(SELLER.userId, 0, 1);

        //just choose first sat and its original dab
        let satId = +sats[0].satId;
        let dabId = +sats[0].dabIds[0];

        //get metadata
        let sat = await getSats([sats[0].satId]);
        debug("sat to sell: %o", sat);

        //sell sat for 0 leos
        let isDeal = await sellOwnership(SELLER.userId, SELLER.prvKey, buyer.userId, buyer.prvKey, satId, 0);

        //buyer gets access to purchased SAT
        let ticket = await getTicket(buyer.userId, buyer.prvKey, buyer.pubKey, dabId, satId);

        //download file
        let isDownloaded = await downloadFile(ticket);

        debug("all is ok: %s", isDownloaded);

    } catch(err) { debug("failure: %o", err); }

}

scenario();